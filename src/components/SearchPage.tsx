import Input from "./ui/Input";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { Search, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import UtilityPanel from "./RightPanel";
import { useSearchQuery } from "../contexts/SearchQueryContext";
import { useQuery } from "@tanstack/react-query";
import { fetchNftCollection } from "../utils/fetchNFT";
import {
  collectionsByChain,
  collectionInfoMap,
} from "../contexts/FilterContext";
import type { Chain } from "../contexts/FilterContext";

const SearchPage = () => {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Flatten the collectionsByChain object to a list of collections with info
  const allCollections = Object.entries(
    collectionsByChain as Record<Chain, string[]>
  ).flatMap(([chain, names]) =>
    names.map((name) => ({
      name,
      address: collectionInfoMap[name]?.address,
      chain: collectionInfoMap[name]?.chain,
      displayChain: chain as Chain,
    }))
  );

  // Find the collection that matches the query
  const matchedCollection =
    searchQuery.trim().length > 0
      ? allCollections.find((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : undefined;

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "nfts-collection-search",
      matchedCollection?.address,
      matchedCollection?.chain,
    ],
    queryFn: () =>
      matchedCollection?.address && matchedCollection?.chain
        ? fetchNftCollection(matchedCollection.address, matchedCollection.chain)
        : Promise.resolve(null),
    enabled: !!matchedCollection?.address && !!matchedCollection?.chain,
  });

  useEffect(() => {
    if (isLoading) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    if (error) {
      console.error("Error fetching NFT collection:", error);
    }
  }, [isLoading, error, data]);

  return (
    <div className="flex flex-row gap-6">
      <div className="space-y-6 flex-1">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Collection Search
          </h1>
          <p className="text-gray-500">Search and analyze NFT collections</p>
        </div>
        <div className="w-full h-fit rounded-lg border border-gray-300 bg-white p-4 shadow-xs">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold leading-none tracking-tight">
              AI Trading Companion
            </span>
            <span className="text-sm text-gray-500">
              Search NFT collections and instantly get AI-driven
              recommendations, rarity scores, market sentiment, risk alerts, and
              live activity from active agent swarms.
            </span>
          </div>
          <div className="space-y-4 w-full mt-6">
            <span className="flex items-center gap-4">
              <Input
                type="search"
                placeholder="Search collections... (try 'Bored Ape', 'Punk', 'Azuki')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button disabled={isSearching} className="btn-neutral">
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </span>
          </div>

          {/* search results */}
          {searchQuery && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Search Results{" "}
                  {data !== undefined && data !== null ? data.length : null}
                </h3>
                {searchQuery && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {isSearching ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-1/3"></div>
                        <div className="h-3 bg-gray-300 rounded animate-pulse w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : data !== undefined && data !== null && data.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {data.map((collection) => (
                    <div
                      key={collection.identifier}
                      className="flex flex-col lg:flex-row items-center space-x-4 p-4 border border-gray-300 rounded-lg cursor-pointer"
                    >
                      <div className="w-1/2 h-40 lg:w-15 lg:h-15 overflow-hidden rounded-lg">
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between w-full lg:justify-start mt-4 lg:mt-0 items-center gap-2 lg:mb-1 mb-2">
                          <h4 className="font-semibold truncate">
                            {collection.name}
                          </h4>
                          <Badge className="text-xs">✓ Verified</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {collection.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Floor:</span>
                            <div className="font-medium">3.8 ETH</div>
                          </div>
                          <div>
                            <span className="text-gray-500">24h Vol:</span>
                            <div className="font-medium">654 ETH</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Change:</span>
                            <div className={`font-medium text-green-600`}>
                              +1.5%
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Holders:</span>
                            <div className="font-medium">4,234</div>
                          </div>
                        </div>
                      </div>
                      <Button className="hidden lg:block">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No collections found for "{searchQuery}"</p>
                  <p className="text-sm">
                    Try searching for "Bored Ape", "Punk", or "Azuki"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <UtilityPanel />
    </div>
  );
};

export default SearchPage;
