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
  const [pageKey, setPageKey] = useState<string | null>(null);
  const [prevKeys, setPrevKeys] = useState<string[]>([]);
  const { selectedAddress, selectedChain, selectedCollection, setSelectedNFT, filterByRarity } =
    useFilter();


const { data, error, isLoading, refetch } = useQuery({
  queryKey: ["nft-collection", selectedAddress, selectedChain, selectedCollection, pageKey],
  queryFn: () =>
    fetchNftCollection(selectedAddress, selectedChain, selectedCollection, pageKey || undefined),
  enabled: !!selectedAddress && !!selectedChain,
  refetchOnWindowFocus: false,
  staleTime: 0,
  gcTime: 0,
});


const handleNext = () => {
  if (data?.nextPageKey) {
    setPrevKeys((prev) => [...prev, pageKey || ""]);
    setPageKey(data.nextPageKey);
  }
};

const handlePrev = () => {
  const prev = [...prevKeys];
  const lastKey = prev.pop();
  setPrevKeys(prev);
  setPageKey(lastKey || null);
};


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
      refetch();
    }
  }, [selectedAddress, selectedChain, selectedCollection, refetch]);

  return (
    <div className="flex-1">
      <div className="flex justify-between w-full items-center">
        <div className="xl:flex items-center space-x-4 flex-1">
          <h1 className="text-2xl font-bold">Explore NFTs</h1>
          <div className="badge badge-soft text-sm">
            {data?.nfts.length || 0} items
          </div>
        </div>
      </div>

      <div
        className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3`}
      >
        {isSearching
          ? [...Array(6)].map((_, index) => (
              <SkeletonLoader key={index} isSearching={true} />
            ))
          : filterByRarity(data?.nfts || []).map((nft: Nft) => (
              <div key={nft.identifier} onClick={() => setSelectedNFT(nft)}>
                <Card
                  image={nft?.image}
                  title={nft?.name}
                  description={nft?.description}
                  price="Price"
                  priceValue={nft?.price ? `${nft.price.toFixed(2)} ETH` : "--"}
                  RarityScore={nft?.rarityvalue}
                />
              </div>
            ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={handlePrev} disabled={prevKeys.length === 0}>
          <ChevronLeft />
        </Button>
        <Button onClick={handleNext} disabled={!data?.nextPageKey}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CardGrid;
