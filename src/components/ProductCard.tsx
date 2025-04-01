import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  ratings: number[];
}

const ProductCard = ({
  _id,
  name,
  description,
  price,
  image,
  stock,
  ratings,
}: ProductCardProps) => {
  const { addToCart } = useCart();

  // Calculate average rating
  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        ).toFixed(1)
      : "";

  const handleAddToCart = () => {
    addToCart({
      productId: _id,
      name,
      price,
      image,
      quantity: 1,
    });
  };

  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      <Link
        to={`/products/${_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={image || "https://via.placeholder.com/150"}
          className="card-img-top"
          alt={name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="fw-bold">${price.toFixed(2)}</p>
        <p className="text-warning">
          {ratings.length > 0 && `⭐ ${averageRating}`}
          {ratings.length > 0 && ` (${ratings.length} reviews)`}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
