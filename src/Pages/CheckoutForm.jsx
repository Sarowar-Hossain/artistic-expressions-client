import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../Context/AuthContext";
import AXIOS from "../Axios/UseAxios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutForm = ({ myClass }) => {
  const [cardError, setCardError] = useState("");
  const [CLIENT_SECRET, setCLIENT_SECRET] = useState("");
  const { user } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (myClass?.price) {
      AXIOS.post("/create-payment-intent", { price: myClass?.price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setCLIENT_SECRET(res.data.clientSecret);
        })
        .catch((error) => console.log(error.message));
    }
  }, [myClass, AXIOS]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(CLIENT_SECRET, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status == "succeeded") {
        console.log("successful");
        toast.success("Payment Success!", {
          position: toast.POSITION.TOP_CENTER,
        });
        const paymentInfo = {
          user_email: user?.email,
          class_name: myClass?.class_name,
          amount: myClass?.price,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        // console.log(paymentInfo);
        AXIOS.post("/user/payments-details", paymentInfo)
          .then((res) => {
            console.log("Payment Successful and data save: ", res.data);
            if (res.data.insertedId) {
              AXIOS.patch("/class-update", { name: myClass?.class_name })
                .then((res) => {
                  console.log("data update: ", res.data);
                })
                .catch((error) => console.log(error.message));

              AXIOS.delete(
                `/user/delete-cart?email=${user?.email}&name=${myClass?.class_name}`
              )
                .then((res) => {
                  console.log("delete data update: ", res.data);
                  navigate("/dashboard/enrolled-classes");
                })
                .catch((error) => console.log(error.message));
            }
          })
          .catch((error) => console.log(error.message));
        // );
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {/* <div className="flex justify-center w-full"> */}
        <button
          className="btn text-center hover:bg-[#1EC0FF] "
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        {/* </div> */}
      </form>
      {cardError && <p className="text-error">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
