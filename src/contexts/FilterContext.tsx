import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { Nft } from "../utils/fetchNFT";
// Define the allowed blockchain types
export type Chain = "Ethereum" | "Polygon" | "Avalanche" | "Arbitrum";

// Maps each chain to a list of collection names
export type CollectionsByChain = {
  [key in Chain]: string[];
};

// Maps collection display names to their API slugs
export type CollectionSlugMap = {
  [key: string]: string;
};

// Default chain used when initializing state
const DefaultChain: Chain = "Ethereum";

// Maps human-readable collection names to their unique slugs
export const collectionSlugs: CollectionSlugMap = {
  "Bored Ape Yacht Club": "boredapeyachtclub",
  "Pudgy Penguins": "pudgypenguins",
  CryptoPunks: "cryptopunks",
  Azuki: "azuki",
  Doodles: "doodles-official",
  Caymanpunk: "caymanpunk-559603470",
  "Layer3 Cube": "layer3-cube-polygon",
  Voxies: "voxies",
  "Infinity Cats": "infinity-cats-1",
  "Alien Buddy Buds": "alienbuddybuds",
  Funkies: "funkies-5",
  Dokyo: "dokyo",
  AVAXdoodles: "avaxdoodles-626148607",
  Steady: "steadynftavax",
  Goose: "goose-269",
  "Booga Beras": "booga-beras-5",
  "Blue Beras": "blue-beras-8",
  "Smol Brains": "smol-brains",
  PawPal: "berapaw-pawpal",
  "UBISOFT- Niji Warrior": "ubisoft-niji-warrior",
};

// Static list of collections grouped by blockchain
export const collectionsByChain: CollectionsByChain = {
  Ethereum: [
    "Bored Ape Yacht Club",
    "Pudgy Penguins",
    "CryptoPunks",
    "Azuki",
    "Doodles",
  ],
  Polygon: [
    "Caymanpunk",
    "Layer3 Cube",
    "Voxies",
    "Infinity Cats",
    "Alien Buddy Buds",
  ],
  Avalanche: ["Funkies", "Dokyo", "AVAXdoodles", "Steady", "Goose"],
  Arbitrum: [
    "Booga Beras",
    "Blue Beras",
    "Smol Brains",
    "PawPal",
    "UBISOFT- Niji Warrior",
  ],
};


// Context type definition shared across components
export interface FilterContextType {
  selectedSlug: string;
  selectedChain: Chain;
  selectedNFT: Nft | null;
  setSelectedNFT: Dispatch<SetStateAction<Nft | null>>;
  availableCollections: string[];
  selectedCollection: string;
  updateSelectedChain: (chain: Chain) => void;
  updateSelectedCollection: (collection: string) => void;
  resetFilter: () => void;
}

// Create the actual context (initially undefined)
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider that wraps the app and supplies the filtering state
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  // Initial state derived from default chain and its first collection
  const [selectedSlug, setSelectedSlug] = useState<string>(
    collectionSlugs[collectionsByChain[DefaultChain][0]]
  );
  const [selectedChain, setSelectedChain] = useState<Chain>(DefaultChain);
  const [availableCollections, setAvailableCollections] = useState<string[]>(
    collectionsByChain[DefaultChain]
  );
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collectionsByChain[DefaultChain][0]
  );
  const [selectedNFT, setSelectedNFT] = useState<Nft | null>(null);

  // When the chain is changed, update dependent states
  const updateSelectedChain = (chain: Chain) => {
    setSelectedChain(chain);
    const collections = collectionsByChain[chain] || [];
    setAvailableCollections(collections);
    setSelectedCollection(collections[0] || "");
    setSelectedSlug(collectionSlugs[collections[0]]);
  };

  // When a specific collection is selected
  const updateSelectedCollection = (collection: string) => {
    setSelectedCollection(collection);
    setSelectedSlug(collectionSlugs[collection]);
  };

  // Reset all filters back to their default state
  const resetFilter = () => {
    setSelectedChain(DefaultChain);
    setAvailableCollections(collectionsByChain[DefaultChain]);
    setSelectedCollection(collectionsByChain[DefaultChain][0]);
    setSelectedSlug(collectionSlugs[collectionsByChain[DefaultChain][0]]);
  };

  // Expose state and actions to context consumers
  return (
    <FilterContext.Provider
      value={{
        selectedChain,
        selectedSlug,
        availableCollections,
        selectedCollection,
        setSelectedNFT,
        selectedNFT,
        updateSelectedChain,
        updateSelectedCollection,
        resetFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context safely
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
