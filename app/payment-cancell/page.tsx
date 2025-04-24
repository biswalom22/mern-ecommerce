import { useRouter } from "next/router";

const PaymentCancel = () => {
  const router = useRouter();

  return (
    <div className="container text-center mt-5">
      <h2>Payment Canceled ❌</h2>
      <p>Your payment was not completed. You can try again.</p>
      <button className="btn btn-danger" onClick={() => router.push("/cart")}>
        Return to Cart
      </button>
    </div>
  );
};

export default PaymentCancel;
