import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartItem from "@/components/CartItem";

const stripePromise = loadStripe(
  "pk_test_51R6eNF2SQ7Oew3XReSeJAlWsMlTAHWAbkOSyq9mzWj0Nqy1I1vh2xWbJhoi7fLlqrqB4jlBFRMOACPvn4qd4TPB200l3oCrTiZ"
);

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!authState.user) {
      alert("Please log in to proceed with payment.");
      return;
    }

    setLoading(true);
    const response = await fetch(
      "http://localhost:4000/api/payments/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: authState.user.userId, cartItems }), // Use actual userId
      }
    );

    const data = await response.json();
    if (data.sessionId) {
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      clearCart();
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="alert alert-warning">
          Your cart is empty. Add items to proceed.
        </p>
      ) : (
        <>
          <div className="row g-3">
            {cartItems.map((item) => (
              <div className="col-12" key={item.productId}>
                <CartItem product={item} />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center p-3 mt-4 bg-light border rounded">
            <h5>Total:</h5>
            <h5 className="fw-bold">₹{totalAmount.toFixed(2)}</h5>
          </div>

          <button
            onClick={handleCheckout}
            className="btn btn-success w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
