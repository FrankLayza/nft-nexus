import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Nft, SupportedChain } from "../utils/fetchNFT";

export type Chain = "Ethereum" | "Polygon" | "Avalanche" | "Arbitrum";

export interface CollectionInfo {
  address: string;
  chain: SupportedChain;
}

export const collectionInfoMap: Record<string, CollectionInfo> = {
  "Bored Ape Yacht Club": {
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    chain: "ethereum",
  },
  "Pudgy Penguins": {
    address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    chain: "ethereum",
  },
  CryptoPunks: {
    address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    chain: "ethereum",
  },
  Azuki: {
    address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
    chain: "ethereum",
  },
  Doodles: {
    address: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    chain: "ethereum",
  },
  MetaVixens: {
    address: "0xe1c7be9a91bb376acbb7c205f1f733a3468153b4",
    chain: "polygon",
  },
  "Layer3 Cube": {
    address: "0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7",
    chain: "polygon",
  },
  Voxies: {
    address: "0xfbe3ab0cbfbd17d06bdd73aa3f55aaf038720f59",
    chain: "polygon",
  },
  BROZZO: {
    address: "0x220fa5ccc9404802ed6db0935eb4feefc27c937e",
    chain: "polygon",
  },
  // The following are placeholders, update with real contract addresses and chains as needed
  "Courtyard.io": {
    address: "0x251be3a17af4892035c37ebf5890f4a4d889dcad",
    chain: "polygon",
  },
  "Marty MILF": {
    address: "0x06b06b0ded0f2f352487d06e4dc9d9b03cfa5282",
    chain: "avalanche",
  },
  Dokyo: {
    address: "0x54c800d2331e10467143911aabca092d68bf4166",
    chain: "avalanche",
  },
  "CHAD DOGE": {
    address: "0x357928b721890ed007142e45502a323827caf812",
    chain: "avalanche",
  },
  Steady: {
    address: "0xcdab7d987f0198edb440d014ed1e71256a0e3e7a",
    chain: "avalanche",
  },
  Mambonauts: {
    address: "0x2ee475a5cdc31c040ba1af3b0c4d66ca5c31c49a",
    chain: "avalanche",
  },
  "Yeetards NFT": {
    address: "0x2e660787bceccd39f67b8190a5bc4fc3ad3b64f7",
    chain: "arbitrum",
  },
  "Pearl Club ONFT": {
    address: "0xa805e1b42590be85d2c74e09c0e1c1b6063ea1a7",
    chain: "arbitrum",
  },
  "Primapes": {
    address: "0x72c3205acf3eb2b37b0082240bf0b909a46c0993",
    chain: "arbitrum",
  },
  "Booga Beras": {
    address: "0x6ba79f573edfe305e7dbd79902bc69436e197834",
    chain: "arbitrum",
  },
  "UBISOFT- Niji Warrior": {
    address: "0x66efaf92df6456c3cb810012b2de3fb223c25d0d",
    chain: "arbitrum",
  },
};

export const collectionsByChain: Record<Chain, string[]> = {
  Ethereum: [
    "Bored Ape Yacht Club",
    "Pudgy Penguins",
    "CryptoPunks",
    "Azuki",
    "Doodles",
  ],
  Polygon: [
    "MetaVixens",
    "Layer3 Cube",
    "Voxies",
    "BROZZO",
    "Courtyard.io",
  ],
  Avalanche: ["Marty MILF", "Dokyo", "CHAD DOGE", "Steady", "Mambonauts"],
  Arbitrum: [
    "Yeetards NFT",
    "Pearl Club ONFT",
    "Primapes",
    "Booga Beras",
    "UBISOFT- Niji Warrior",
  ],
};

export const rarityFilter: string[] = [
  'Legendary',
  'Epic',
  'Rare',
  'Common',
]

const DefaultChain: Chain = "Ethereum";

export interface FilterContextType {
  count: number
  setCount: Dispatch<SetStateAction<number | null>>;
  selectedCollection: string;
  selectedNFT: Nft | null;
  setSelectedNFT: Dispatch<SetStateAction<Nft | null>>;
  selectedRarity: string | null;
  setSelectedRarity: Dispatch<SetStateAction<string | null>>;
  availableCollections: string[];
  selectedAddress: string;
  selectedChain: SupportedChain;
  updateSelectedChain: (chain: Chain) => void;
  updateSelectedCollection: (collection: string) => void;
  resetFilter: () => void;
  filterByRarity: (nfts: Nft[]) => Nft[]
  increment: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collectionsByChain[DefaultChain][0]
  );
  const [selectedNFT, setSelectedNFT] = useState<Nft | null>(null);
  const [availableCollections, setAvailableCollections] = useState<string[]>(
    collectionsByChain[DefaultChain]
  );
  const [selectedAddress, setSelectedAddress] = useState<string>(
    collectionInfoMap[collectionsByChain[DefaultChain][0]].address
  );
  const [selectedChain, setSelectedChain] = useState<SupportedChain>(
    collectionInfoMap[collectionsByChain[DefaultChain][0]].chain
  );
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null)
  const [count, setCount] = useState<number>(0)
 const filterByRarity = (nfts: Nft[]): Nft[] => {
  if (!selectedRarity) return nfts; 
  return nfts.filter(nft =>
    nft.rarityvalue?.tier.toLowerCase() === selectedRarity.toLowerCase()
  );
};

 const increment = (): void => {
  setCount((prev) => (prev ?? 0) + 1);
};


  const updateSelectedChain = (chain: Chain) => {
    setAvailableCollections(collectionsByChain[chain]);
    const firstCollection = collectionsByChain[chain][0];
    setSelectedCollection(firstCollection);
    setSelectedAddress(collectionInfoMap[firstCollection].address);
    setSelectedChain(collectionInfoMap[firstCollection].chain);
  };

  const updateSelectedCollection = (collection: string) => {
    setSelectedCollection(collection);
    setSelectedAddress(collectionInfoMap[collection].address);
    setSelectedChain(collectionInfoMap[collection].chain);
  };

  const resetFilter = () => {
    setAvailableCollections(collectionsByChain[DefaultChain]);
    setSelectedCollection(collectionsByChain[DefaultChain][0]);
    setSelectedAddress(
      collectionInfoMap[collectionsByChain[DefaultChain][0]].address
    );
    setSelectedChain(
      collectionInfoMap[collectionsByChain[DefaultChain][0]].chain
    );
    setSelectedRarity(null)
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCollection,
        selectedNFT,
        setSelectedNFT,
        availableCollections,
        selectedAddress,
        selectedChain,
        updateSelectedChain,
        updateSelectedCollection,
        resetFilter,
        setSelectedRarity,
        selectedRarity,
        filterByRarity,
        count,
        increment,
        setCount
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
