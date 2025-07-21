// import Card from "./Card";
// import { useState } from "react";

type CardGridProps = {
  className?: string;
};

const mockData = [
  {
    title: "NFT 1",
    description: "NFT 1 Description",
    image: "https://placehold.co/600x400",
    price: "PRICE",
    AIEstimate: "AI EST.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 2",
    description: "NFT 2 Description",
    image: "https://placehold.co/600x400",
    price: "PRICE",
    AIEstimate: "AI EST.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 3",
    description: "NFT 3 Description",
    image: "https://placehold.co/600x400",
    price: "PRICE",
    AIEstimate: "AI EST.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 4",
    description: "NFT 4 Description",
    image: "https://placehold.co/600x400",
    price: "PRICE",
    AIEstimate: "AI EST.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 5",
    description: "NFT 5 Description",
    image: "https://placehold.co/600x400",
    price: "PRICE",
    AIEstimate: "AI EST.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
  {
    title: "NFT 6",
    description: "NFT 6 Description",
    image: "https://placehold.co/600x400",
    price: "PRICE",
    AIEstimate: "AI EST.",
    priceValue: "0.7",
    AIEstimateValue: "2.3",
  },
];
const CardGrid = ({ className }: CardGridProps) => {
  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  return (
    <div className="flex-1">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-4 flex-1">
          <h1 className="text-2xl font-bold">Explore NFTs</h1>
          <div className="badge badge-soft text-sm">{mockData.length} items</div>
        </div>
        <div className="">
          <select>
            <option value="hello">hello</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
      </div>

      <div
        className={`${className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 px-3`}
      ></div>
    </div>
  );
};

export default CardGrid;
