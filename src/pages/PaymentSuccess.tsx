import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2>Payment Successful! 🎉</h2>
      <p>Thank you for your purchase. Your order has been placed.</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
