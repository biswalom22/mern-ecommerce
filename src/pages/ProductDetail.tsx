import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Product } from "../types/Product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;
  if (!product) return <p>Product not found.</p>;

  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const isInCart = cartItems.some(
    (item) => item.productId === product._id && item.size === selectedSize
  );

  const handleCartAction = () => {
    if (isInCart) {
      navigate("/cart"); // Redirect to cart
    } else {
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: selectedSize,
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow">
            <img
              src={product.image || "https://via.placeholder.com/300"}
              className="card-img-top"
              alt={product.name}
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="mb-3">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <h4 className="text-primary">${product.price.toFixed(2)}</h4>
            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p className="fw-bold mt-3">Select Size</p>
            <div className="d-flex flex-wrap gap-2">
              {sizes.map((size) => {
                const sizeObj = product.sizes?.find(
                  (s: { size: string }) => s.size === size
                );
                const isDisabled = !sizeObj || sizeObj.quantity === 0;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={isDisabled}
                    className={`btn ${
                      selectedSize === size ? "btn-primary" : "btn-outline-dark"
                    } ${isDisabled ? "disabled opacity-50" : ""}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleCartAction}
              disabled={!selectedSize}
              className={`btn mt-3 w-100 ${
                isInCart ? "btn-success" : "btn-warning"
              }`}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
