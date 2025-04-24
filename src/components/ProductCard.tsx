import Link from 'next/link';
import '../styles/ProductCard.css';

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
  ratings,
}: ProductCardProps) => {
  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        ).toFixed(1)
      : '';

  return (
    <div
      className="card shadow-sm cursor-pointer product-card m-4"
      style={{ width: '18rem' }}
    >
      <Link href="/products/${_id}" className="text-decoration-none text-dark">
        <img
          src={image || 'https://via.placeholder.com/150'}
          className="card-img-top"
          alt={name}
          style={{
            height: '200px',
            objectFit: 'cover',
            border: '2px solid transparent',
          }}
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
