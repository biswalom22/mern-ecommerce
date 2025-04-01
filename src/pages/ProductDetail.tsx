import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Product } from "../types/Product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
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

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
    });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "auto" }}>
      <h2>{product.name}</h2>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          style={{ width: "300px", height: "300px", objectFit: "cover" }}
        />
        <div>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Select Size</strong>
          </p>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
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
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid #000",
                    borderRadius: "4px",
                    background: selectedSize === size ? "#007bff" : "#fff",
                    color: selectedSize === size ? "#fff" : "#000",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || !selectedSize}
            style={{
              background: product.stock > 0 ? "rgb(255, 210, 50)" : "#ccc",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: product.stock > 0 ? "pointer" : "not-allowed",
            }}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
