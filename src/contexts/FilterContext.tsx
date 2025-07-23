import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Chain = "Ethereum" | "Polygon" | "Avalanche" | "Arbitrum";
export type CollectionsByChain = {
  [key in Chain]: string[];
};
export type CollectionSlugMap = {
  [key: string]: string;
};


const DefaultChain: Chain = "Ethereum";

const collectionSlugs: CollectionSlugMap = {
  "Bored Ape Yacht Club": "boredapeyachtclub",
  "Pudgy Penguins": "pudgypenguins",
  "CryptoPunks": "cryptopunks",
  "Azuki": "azuki",
  "Doodles": "doodles-official",
  "Caymanpunk": "caymanpunk-559603470",
  "Layer3 Cube": "layer3-cube-polygon",
  "Voxies": "voxies",
  "Infinity Cats": "infinity-cats-1",
  "Alien Buddy Buds": "alienbuddybuds",
  "Funkies": "funkies-5",
  "Dokyo": "dokyo",
  "AVAXdoodles": "avaxdoodles-626148607",
  "Steady": "steadynftavax",
  "Goose": "goose-269",
  "Booga Beras": "booga-beras-5",
  "Blue Beras": "blue-beras-8",
  "Smol Brains": "smol-brains",
  "PawPal": "berapaw-pawpal",
  "UBISOFT- Niji Warrior": "ubisoft-niji-warrior",
};


const collectionsByChain: CollectionsByChain = {
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

export interface FilterContextType {
  selectedSlug: string
  selectedChain: Chain;
  availableCollections: string[];
  selectedCollection: string;
  updateSelectedChain: (chain: Chain) => void;
  updateSelectedCollection: (collection: string) => void;
  resetFilter: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(collectionSlugs[collectionsByChain[DefaultChain][0]])
  const [selectedChain, setSelectedChain] = useState<Chain>(DefaultChain);
  const [availableCollections, setAvailableCollections] = useState<string[]>(
    collectionsByChain[DefaultChain]
  );
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collectionsByChain[DefaultChain][0]
  );

  const updateSelectedChain = (chain: Chain) => {
    setSelectedChain(chain);
    const collections = collectionsByChain[chain] || [];
    setAvailableCollections(collections);
    setSelectedCollection(collections[0] || "");
    setSelectedSlug(collectionSlugs[collections[0]])
  };

  const updateSelectedCollection = (collection: string) => {
    setSelectedCollection(collection);
    setSelectedSlug(collectionSlugs[collection])
  };

  const resetFilter = () => {
    setSelectedChain(DefaultChain);
    setAvailableCollections(collectionsByChain[DefaultChain]);
    setSelectedCollection(collectionsByChain[DefaultChain][0]);
  setSelectedSlug(collectionSlugs[collectionsByChain[DefaultChain][0]]);
  };

  return (
    <FilterContext.Provider
      value={{
        selectedChain,
        selectedSlug,
        availableCollections,
        selectedCollection,
        updateSelectedChain,
        updateSelectedCollection,
        resetFilter,
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
