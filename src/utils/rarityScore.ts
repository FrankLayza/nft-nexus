import type { AlchemyNftResponse } from "./fetchNFT";

type TraitFrequencyMap = Record<string, Record<string, number>>;

// calculate the the traits frequencies across each collection
export function getTraitFrequencies(
  nfts: AlchemyNftResponse[]
): TraitFrequencyMap {
  const frequencies: TraitFrequencyMap = {}; // create an empty object

  //map through the nfts gotten from the fetch to get each nft
  for (const nft of nfts) {
    const attributes = nft.raw?.metadata?.attributes || []; //assign attributes to the attributes of the nft or an empty array

    for (const { trait_type, value } of attributes) {
      //maps the trait type and value of the attributes
      if (!frequencies[trait_type]) frequencies[trait_type] = {}; //this checks if there exists a trait type, if false, create an empty object
      if (!frequencies[trait_type][value]) frequencies[trait_type][value] = 0; //this checks if there exist a trait type and value, if false, assign the frequency object a value of 0
      frequencies[trait_type][value]++; //increment
    }
  }

  const totalNFTs = nfts.length;
  for (const traitType in frequencies) {
    for (const value in frequencies[traitType]) {
      frequencies[traitType][value] /= totalNFTs;
    }
  }

  return frequencies;
}

export function calculateRarityScore(
  nft: AlchemyNftResponse,
  frequencies: TraitFrequencyMap
): number {
  let score = 0;
  const attributes = nft.raw?.metadata?.attributes || [];
  for (const { trait_type, value } of attributes) {
    const freq = frequencies[trait_type]?.[value] || 1;
    score += 1 / freq;
  }
  return parseFloat(score.toFixed(2));
}

export function attachRarityScores(nfts: AlchemyNftResponse[]) {
  const frequencies = getTraitFrequencies(nfts);
  return nfts.map((nft) => ({
    ...nft,
    rarityScore: calculateRarityScore(nft, frequencies),
  }));
}

export function rarityDisplay(score: number) {
  if (score >= 100) return { tier: "Legendary", icon: "🦄" };
  if (score >= 60) return { tier: "Epic", icon: "⚔️" };
  if (score >= 30) return { tier: "Rare", icon: "💎" };
  return { tier: "Common", icon: "😂" };
}
