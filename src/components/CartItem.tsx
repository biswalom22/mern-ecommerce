import { useCart } from "../context/CartContext";

interface CartItemProps {
  product: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string | null;
  };
}

const CartItem = ({ product }: CartItemProps) => {
  const { removeFromCart } = useCart();

  return (
    <div className="card shadow-sm p-3">
      <div className="d-flex align-items-center">
        <img
          src={product.image || "https://via.placeholder.com/80"}
          alt={product.name}
          className="rounded"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{product.name}</h5>
          <p className="text-muted small mb-1">
            Ships in <strong>1-2 days</strong>
          </p>

          <div className="d-flex gap-2">
            <span className="badge bg-primary">Size: {product.size}</span>
            <span className="badge bg-secondary">Qty: {product.quantity}</span>
          </div>
        </div>

        <div className="text-end">
          <h5 className="mb-1 text-dark fw-bold">
            ${product.price * product.quantity}
          </h5>
          <p className="text-muted small text-decoration-line-through">
            ${product.price * product.quantity + 1500}
          </p>
          <p className="text-success fw-bold">You saved ₹1500</p>

          <button
            onClick={() => removeFromCart(product.productId)}
            className="btn btn-outline-danger btn-sm"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
