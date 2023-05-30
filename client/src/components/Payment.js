import StripeCheckout from "react-stripe-checkout";
import { useAppContext } from "../context/appContext";
import { FaCreditCard } from "react-icons/fa";

const Payment = () => {
  const { handleStripeToken } = useAppContext();
  return (
    <StripeCheckout
      name="Jobify"
      description="$5 for 5 email credits"
      amount={500}
      token={(token) => handleStripeToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn btn-danger" type="button">
        <FaCreditCard />
        add credits
      </button>
    </StripeCheckout>
  );
};

export default Payment;
