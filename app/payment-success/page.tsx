import { useRouter } from "next/router";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <div className="container text-center mt-5">
      <h2>Payment Successful! 🎉</h2>
      <p>Thank you for your purchase. Your order has been placed.</p>
      <button className="btn btn-primary" onClick={() => router.push("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
