import { useCart } from '../context/CartContext';

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
  const { removeFromCart, updateCartItem } = useCart();

  const handleIncrease = () => {
    updateCartItem(product.productId, product.quantity + 1);
  };

  const handleDecrease = () => {
    updateCartItem(product.productId, product.quantity - 1);
  };

  return (
    <div className="card shadow-sm p-3">
      <div className="d-flex align-items-center">
        <img
          src={product.image || 'https://via.placeholder.com/80'}
          alt={product.name}
          className="rounded"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
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

        <div className="text-end d-flex flex-column align-items-end">
          <h5 className="mb-1 text-dark fw-bold">
            ${product.price * product.quantity}
          </h5>
          <p className="text-muted small text-decoration-line-through">
            ${product.price * product.quantity + 1500}
          </p>
          <p className="text-success fw-bold">You saved ₹1500</p>

          <div className="d-flex align-items-center gap-4">
            <div className="input-group input-group-sm w-auto">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleDecrease}
                disabled={product.quantity <= 1}
              >
                −
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={product.quantity}
                readOnly
                style={{ maxWidth: '50px' }}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(product.productId)}
              className="btn btn-outline-danger btn-sm"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
