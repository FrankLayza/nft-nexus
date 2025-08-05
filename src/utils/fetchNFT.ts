// const OPENSEA_NFT = import.meta.env.VITE_GET_NFT_OPENSEA
import { attachRarityScores } from "./rarityScore";
const ALCHEMY_API_KEY = import.meta.env.VITE_GET_ALCHEMY;

const ALCHEMY_BASE_URLS: Record<string, string> = {
  ethereum: "https://eth-mainnet.g.alchemy.com/nft/v3",
  polygon: "https://polygon-mainnet.g.alchemy.com/nft/v3",
  avalanche: "https://avax-mainnet.g.alchemy.com/nft/v3",
  arbitrum: "https://arb-mainnet.g.alchemy.com/nft/v3",
};

const options = {
  method: "GET",
};

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface Nft {
  identifier: string | number;
  name: string;
  description: string;
  image: string;
  price?: number;
  // Additional fields for JuliaOS agent analysis
  tokenId: string;
  collection: string;
  attributes: NFTAttribute[];
  floorPrice: number;
  totalSupply: number;
  contractAddress: string;
  chain: string;
  rarityvalue: number;
}

export interface AlchemyNftResponse {
  tokenId: string;
  name: string | null;
  description: string | null;
  image: {
    cachedUrl: string;
    originalUrl: string;
  };
  contract: {
    name: string;
    address: string;
    openSeaMetadata?: {
      floorPrice?: number;
      totalSupply?: number;
    };
  };
  raw?: {
    metadata?: {
      attributes?: Array<{
        trait_type: string;
        value: string;
      }>;
    };
  };
}

export type SupportedChain = "ethereum" | "polygon" | "avalanche" | "arbitrum";

export const fetchNftCollection = async (
  contractAddress: string,
  chain: SupportedChain,
  collectionName?: string
): Promise<(Nft & { rarityvalue: number })[]> => {
  if (!ALCHEMY_API_KEY) {
    throw new Error("Alchemy API key is not set!");
  }
  const baseUrl = ALCHEMY_BASE_URLS[chain];
  if (!baseUrl) {
    throw new Error(`Alchemy base URL is not set for chain: ${chain}`);
  }
  const url = `${baseUrl}/${ALCHEMY_API_KEY}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true&pageSize=18`;
  console.log("fetchNftCollection - URL:", url);

  const res = await fetch(url, options);

  if (!res.ok) {
    console.error(
      "fetchNftCollection - Response not ok:",
      res.status,
      res.statusText
    );
    throw new Error("error fetching nfts");
  }
  const data = await res.json();
  const nftsWithRarity = attachRarityScores(data.nfts as AlchemyNftResponse[]);
  console.log(nftsWithRarity);
  // Map Alchemy API response to our enhanced Nft interface
  const mappedNfts = nftsWithRarity.map((nft) => ({
    identifier: nft.tokenId,
    name: nft.name || `#${nft.tokenId}`,
    description:
      nft.description || nft.contract.name || "No description available",
    image:
      nft.image?.cachedUrl ||
      nft.image?.originalUrl ||
      "https://via.placeholder.com/300x300?text=No+Image",
    price: nft.contract?.openSeaMetadata?.floorPrice,
    // Enhanced fields for JuliaOS agent
    tokenId: nft.tokenId,
    collection: collectionName || nft.contract.name || "Unknown Collection",
    attributes: nft.raw?.metadata?.attributes || [],
    floorPrice: nft.contract?.openSeaMetadata?.floorPrice || 0,
    totalSupply: Number(nft.contract?.openSeaMetadata?.totalSupply) || 10000,
    contractAddress: nft.contract.address,
    chain: chain,
    rarityvalue: nft.rarityScore,
  }));
  return mappedNfts;
};
