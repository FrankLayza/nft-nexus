type CardProps = {
  title: string;
  description: string;
  image: string;
  price: string;
  AIEstimate: string;
  priceValue: string | number;
  AIEstimateValue: string | number;
  RarityScore: string | number;
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
          <h2 className="font-bold">{title}</h2>
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
            <p className="font-bold">{priceValue}</p>
            <p className="font-bold text-green-600">{AIEstimateValue}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p>Rarity:</p>
            <p>{RarityScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
