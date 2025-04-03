import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchFilteredProducts } from '../api';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const color = queryParams.get('color');
  const brand = queryParams.get('brand');

  const fetchProducts = async (newPage: number) => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const filters = {
        category: category || undefined,
        color: color || undefined,
        brand: brand || undefined,
      };

      const response = await fetchFilteredProducts(filters, newPage, 10);
      const { products: newProducts, totalPages } = response;

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasMore(newPage < totalPages);
      setPage(newPage + 1);
    } catch (error: any) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 5 &&
        !loading &&
        hasMore
      ) {
        fetchProducts(page);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loading, hasMore]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Our Products</h2>
      <div className="row g-4 justify-content-center">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={product._id}>
              <ProductCard {...product} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-muted fs-5">No products found.</p>
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        {loading && <p className="text-primary">Loading more products...</p>}
        {!hasMore && products.length > 0 && (
          <p className="text-secondary">No more products to load.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
