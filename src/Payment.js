import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./Axios";
import { dblClick } from "@testing-library/user-event/dist/click";
import { db } from "./Firebase.js";
import { addDoc, collection } from "firebase/firestore";

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  const [proccessing, setProccessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    // generate the special stripe secret which allows us to change a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("the secret is >>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProccessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      .then(async ({ paymentIntent }) => {
        // PaymentIntent = paymentConfirmation
        await addDoc(collection(db, "users"), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setSucceeded(true);
        setError(null);
        setProccessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.errror ? e.errror.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout {<Link to="/checkout">{basket?.length} items</Link>}</h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Tajganj</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <h3>Order Total: $ {getBasketTotal(basket)}</h3>
                <button disabled={proccessing || disabled || succeeded}>
                  <span>{proccessing ? <p>Proccessing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
