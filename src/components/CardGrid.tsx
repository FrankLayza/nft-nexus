// import Card from "./Card";
import { useState } from "react";
import { Grid, List } from "lucide-react";
import Button from "./Button";
import Card from "./Card";
type CardGridProps = {
  className?: string;
};

const mockData = [
  {
    title: "NFT 1",
    description: "NFT 1 Description",
    image: "https://placehold.co/600x400",
    price: "price",
    AIEstimate: "AI est.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 2",
    description: "NFT 2 Description",
    image: "https://placehold.co/600x400",
    price: "price",
    AIEstimate: "AI est.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 3",
    description: "NFT 3 Description",
    image: "https://placehold.co/600x400",
    price: "price",
    AIEstimate: "AI est.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 4",
    description: "NFT 4 Description",
    image: "https://placehold.co/600x400",
    price: "price",
    AIEstimate: "AI est.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 5",
    description: "NFT 5 Description",
    image: "https://placehold.co/600x400",
    price: "price",
    AIEstimate: "AI est.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 6",
    description: "NFT 6 Description",
    image: "https://placehold.co/600x400",
    price: "price",
    AIEstimate: "AI est.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
];
const CardGrid = ({ className }: CardGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  return (
    <div className="flex-1">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-4 flex-1">
          <h1 className="text-2xl font-bold">Explore NFTs</h1>
          <div className="badge badge-soft text-sm">
            {mockData.length} items
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

          <div className="flex items-center rounded border">
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
        {mockData.map((card, id) => (
          <div key={id}>
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
              AIEstimate={card.AIEstimate}
              AIEstimateValue={card.AIEstimateValue}
              price={card.price}
              priceValue={card.priceValue}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
