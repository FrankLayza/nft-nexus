// import Card from "./Card";
import { useState } from "react";
import { Grid, List } from "lucide-react";
import { fetchNftCollection } from "../utils/fetchNFT";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "../contexts/FilterContext";
import Button from "./ui/Button";
import Card from "./ui/Card";
import SkeletonLoader from "./ui/SkeletonLoader";
import { useEffect } from "react";

type CardGridProps = {
  className?: string;
};

const CardGrid = ({ className }: CardGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSearching, setIsSearching] = useState(false);

  
  const {selectedCollection, selectedSlug} = useFilter();
  const { data, error, isLoading } = useQuery({
      queryKey: ["nft-collection", selectedCollection],
      queryFn: () => fetchNftCollection(selectedSlug),
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
    <div className="flex-1">
      <div className="flex justify-between w-full items-center">
        <div className="xl:flex items-center space-x-4 flex-1">
          <h1 className="text-2xl font-bold">Explore NFTs</h1>
          <div className="badge badge-soft text-sm">
            {data?.length} items
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

          <div className="hidden xl:flex items-center rounded border">
            <Button
              className={`${
                viewMode === "grid" ? "btn btn-neutral" : "btn btn-ghost"
              } rounded-none`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              className={`${
                viewMode === "list" ? "btn btn-neutral" : "btn btn-ghost"
              } rounded-none`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3`}
      >
        {
          isSearching ? (
              [...Array(6)].map((_, index) => (
                <SkeletonLoader key={index} isSearching={true} />
              ))
          ) : (
            data?.map((nft) => (
              <div key={nft.identifier}>
                <Card 
                  image={nft.image_url}
                  title={nft.name}
                  description={nft.description}
                />
              </div>
            ))
          )
        }  
      </div>
    </div>
  );
};

export default CardGrid;
