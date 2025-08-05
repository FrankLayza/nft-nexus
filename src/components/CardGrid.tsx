import { useState } from "react";
import { fetchNftCollection } from "../utils/fetchNFT";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "../contexts/FilterContext";
import Card from "./ui/Card";
import SkeletonLoader from "./ui/SkeletonLoader";
import { useEffect } from "react";
import type { Nft } from "../utils/fetchNFT";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Button from "./ui/Button";

type CardGridProps = {
  className?: string;
};

const CardGrid = ({ className }: CardGridProps) => {
  const [isSearching, setIsSearching] = useState(false);

  const { selectedAddress, selectedChain, selectedCollection, setSelectedNFT } =
    useFilter();

  // console.log(
  //   "CardGrid - selectedAddress:",
  //   selectedAddress,
  //   "selectedChain:",
  //   selectedChain,
  //   "selectedCollection:",
  //   selectedCollection
  // );

  const { data, error, isLoading, refetch } = useQuery<Nft[]>({
    queryKey: [
      "nft-collection",
      selectedAddress,
      selectedChain,
      selectedCollection,
    ],
    queryFn: () =>
      fetchNftCollection(selectedAddress, selectedChain, selectedCollection),
    enabled: !!selectedAddress && !!selectedChain,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });

  // console.log(
  //   "CardGrid - data:",
  //   data,
  //   "error:",
  //   error,
  //   "isLoading:",
  //   isLoading
  // );

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

  // Force refetch when address or chain changes
  useEffect(() => {
    if (selectedAddress && selectedChain) {
      // console.log(
      //   "CardGrid - Triggering refetch for:",
      //   selectedAddress,
      //   selectedChain,
      //   selectedCollection
      // );
      refetch();
    }
  }, [selectedAddress, selectedChain, selectedCollection, refetch]);

  return (
    <div className="flex-1">
      <div className="flex justify-between w-full items-center">
        <div className="xl:flex items-center space-x-4 flex-1">
          <h1 className="text-2xl font-bold">Explore NFTs</h1>
          <div className="badge badge-soft text-sm">
            {data?.length || 0} items
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select defaultValue={"Recently Listed"} className="select">
            <option disabled={true}>Recently Listed</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="ai-estimated">AI Estimated</option>
            <option value="most-viewed">Most Viewed</option>
            <option value="rarity-score">Rarity Score</option>
          </select>
        </div>
      </div>

      <div
        className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3`}
      >
        {isSearching
          ? [...Array(6)].map((_, index) => (
              <SkeletonLoader key={index} isSearching={true} />
            ))
          : data?.map((nft: Nft) => (
              <div key={nft.identifier} onClick={() => setSelectedNFT(nft)}>
                <Card
                  image={nft?.image}
                  title={nft?.name}
                  description={nft?.description}
                  price="Price"
                  AIEstimate="AI Estimate"
                  priceValue={nft?.price ? `${nft.price.toFixed(2)} ETH` : "--"}
                  AIEstimateValue="--"
                  RarityScore={nft?.rarityvalue}
                />
              </div>
            ))}
      </div>
      <div className="flex justify-between">
        <Button>
          <ChevronLeft />
        </Button>
        <Button>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CardGrid;
