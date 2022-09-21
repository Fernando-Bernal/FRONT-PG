import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { limpiarCarrito } from "../redux/actions/actions";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Address from "./Address";

function checkout({ products, subTotal }) {
  const stripePromise = loadStripe(
    "pk_test_51Lgvm7FNV3brqOrQwACULzmK8Gh8gtEI1Tu1atrISNC3OfZ78CaUs8SIUTnl9wRvxacqpxPeeiwtYQT8ifSSaS2d00gs1hTmxj",
    {
      locale: "en",
    }
  );

  const CheckoutForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProcessing, setProcessingTo] = useState(false);
    const [isDisable, setIsDisableTo] = useState(false);

    const user = {
      email: UserAuth()?.user?.email,
      uid: UserAuth()?.user?.uid,
    };

    console.log(user);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
      subTotal === 0 || subTotal < 0
        ? setIsDisableTo(true)
        : setIsDisableTo(false);
      products.length === 0 ? setIsDisableTo(true) : setIsDisableTo(false);
    }, [products, subTotal]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
          //email:e.target.email.value,
          address: {
            city: e.target.city.value,
            //country: e.target.country.value,
            line1: e.target.line1.value,
            //line2: e.target.line2.value,
            state: e.target.state.value,
            postal_code: e.target.postal_code.value,
          },
        },
      });

      setProcessingTo(true);

      if (!error && products !== [] && subTotal !== 0 && subTotal > 0) {
        if (!error && user.email !== undefined && user.uid !== undefined) {
          console.log(paymentMethod);
          const { id } = paymentMethod;
          try {
            const { data } = await axios.post(
              "https://sneakers-back-end.herokuapp.com/cart/checkout",
              {
                id,
                email: user.email,
                uid: user.uid,
                shoes: products,
                amount: subTotal * 100,
              }
            );

            console.log(data)
            Swal.fire({
              position: "top-center",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 5000,
            });
            setProcessingTo(false);
            setIsDisableTo(false);
            console.log(data);
            console.log(paymentMethod);
            elements.getElement(CardElement).clear();
            dispatch(limpiarCarrito());
          } catch (error) {
            console.log(error);
            setProcessingTo(false);
            setIsDisableTo(false);
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "error in your payment",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        } else {
          setIsDisableTo(true);
          navigate("/account");
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "create your user for pay",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } else {
        console.log(error);
        e.preventDefault();
        setProcessingTo(false);
        setIsDisableTo(false);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "error in your payment",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };

    const cardElementOption = {
      style: {
        base: {
          fontSize: "14px",
          iconColor: "#00ff01",
          backgroundColor: "#000000",
          color: "#ffffff",
          "::placeholder": {
            color: "#00ff01",
            backgroundColor: "0000000",
          },
          ":hover": {
            iconColor: "#ffff01",
            backgroundColor: "#000000",
          },
          ":-webkit-autofill": {
            backgroundColor: "#0000000",
          },
        },
        invalid: {},
      },
      hidePostalCode: true,
    };

    return (
      <form onSubmit={handleSubmit}>
        <Address />

        <span className="text-xl font-medium text-[#00ff01] block py-3">
          Card Details
        </span>

        <span className="text-xs text-[#00ff01]">Card Type</span>

        <div className="overflow-visible flex justify-between items-center mt-2">
          <div className="border rounded w-52 h-28 bg-black py-2 px-4 relative right-10">
            <span className="italic text-lg font-medium text-[#00ff01] underline">
              VISA
            </span>

            <div className="flex justify-between items-center pt-4 ">
              <span className="text-xs text-[#00ff01] font-medium">****</span>
              <span className="text-xs text-[#00ff01] font-medium">****</span>
              <span className="text-xs text-[#00ff01] font-medium">****</span>
              <span className="text-xs text-[#00ff01] font-medium">****</span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-xs  text-[#00ff01]">Card Holder Name</span>
              <span className="text-xs  text-[#00ff01]">12/18</span>
            </div>
          </div>

          <div className="flex justify-center  items-center flex-col">
            <img
              src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
              width="40"
              alt=""
              className="relative right-5"
            />
            <span className="text-xs font-medium text-gray-200 bottom-2 relative right-5">
              mastercard.
            </span>
          </div>
        </div>

        <div className="flex justify-center flex-col pt-3">
          <label className="text-xs text-[#00ff01] ">Name on Card</label>
          <input
            type="text"
            name="name"
            className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01]  focus:border-[#00ff01] rounded-md"
            placeholder="Card Holder Name"
          />
        </div>

        <div className="flex justify-center flex-col pt-3">
          <CardElement
            className=" p-2 border text-white bg-black border-gray-600 hover:border-[#00ff01] focus:outline-none focus:border-[#00ff01] rounded-md"
            options={cardElementOption}
          />
        </div>

        <button
          type="submit"
          className="h-12 w-full mt-3 bg-[#00ff01] rounded focus:outline-none text-white hover:bg-[#000000] disabled:opacity-50 disabled:bg-black"
          disabled={isDisable}
        >
          {isProcessing ? "Proccesading..." : `PAY $${subTotal}`}
        </button>
      </form>
    );
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <div>
          <div className=" p-5 bg-black rounded overflow-visible">
            <div className="flex justify-center flex-col pt-3">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
}

export default checkout;
