type CardProps = {
  title: string;
  description: string;
  image: string;
  price: string;
  AIEstimate: string;
  priceValue: string | number;
  AIEstimateValue: string | number;
};

const Card = ({
  title,
  description,
  image,
  price,
  AIEstimate,
  priceValue,
  AIEstimateValue,
}: CardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="NFT" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="py-2">
          <div className="flex justify-between items-center px-6">
            <p>{price}</p>
            <p>{AIEstimate}</p>
          </div>
          <div className="flex justify-between items-center px-6">
            <p>{priceValue}</p>
            <p>{AIEstimateValue}</p>
          </div>
      </div>
    </div>
  );
};

export default Card;
