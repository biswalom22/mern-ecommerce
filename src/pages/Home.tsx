import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";
import { Product } from "../types/product";


const Home = () => {
  const {
    data: products,
    isLoading,
    error,
  } =  useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  console.log('Query State:', { products, isLoading, error });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {products?.map((product: any) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
};

export default Home;
