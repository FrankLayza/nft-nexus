export type RarityScoreType = {
  tier: string;
  icon: string; // Add other properties if needed
};

type CardProps = {
  title: string;
  description: string;
  image: string;
  price: string;
  AIEstimate: string;
  priceValue: string | number;
  AIEstimateValue: string | number;
  RarityScore: RarityScoreType;
};

const Card = ({
  title,
  description,
  image,
  price,
  AIEstimate,
  priceValue,
  AIEstimateValue,
  RarityScore,
}: CardProps) => {
  return (
    <div className="card bg-base-100 border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <figure>
        <img src={image} alt="NFT" />
      </figure>
      <div className="px-4 py-2">
        <div>
          <h2 className="font-bold">
            {title.length < 10
              ? title
              : `${title.slice(0, 6)}...${title.slice(-3)}`}
          </h2>
          <p className="text-sm">
            {description.length < 100 ? description : "..."}
          </p>
        </div>
        <div className="py-2">
          <div className="flex justify-between items-center text-xs text-gray-500 capitalize">
            <p>{price}</p>
            <p>{AIEstimate}</p>
          </div>
          <div className="flex justify-between items-center text-sm tracking-wide">
            <p className="font-bold">{priceValue ? priceValue : 0.00}</p>
            <p className="font-bold text-green-600">{AIEstimateValue}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm items-center">
          <div>
            <p>{RarityScore.icon}</p>
            <p className="font-bold">{RarityScore.tier}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
