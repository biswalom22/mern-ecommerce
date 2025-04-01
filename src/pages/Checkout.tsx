import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:5000/api/payments/verify-payment?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPaymentStatus("success");
          } else {
            setPaymentStatus("failed");
          }
        })
        .catch(() => setPaymentStatus("failed"));
    }
  }, [sessionId]);

  return (
    <div className="container mt-4">
      <h2>Payment Status</h2>
      {paymentStatus === "loading" && <p>Verifying payment...</p>}
      {paymentStatus === "success" && (
        <div className="alert alert-success">
          Payment successful! <a href="/orders">View Orders</a>
        </div>
      )}
      {paymentStatus === "failed" && (
        <div className="alert alert-danger">
          Payment failed. <a href="/cart">Try Again</a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
