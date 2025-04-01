import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/product';

const ProductList = () => {
  const { data: products = [], isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
