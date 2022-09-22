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
    const [data, setData] = useState({
      state: "",
      validateState: null,
      city: "",
      validateCity: null,
      line1: "",
      validateLine1: null,
      postal_code: "",
      validatePostal_code: null,
      name: "",
      validateName: null,
    });

    const handleInputChange = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    };

    const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
      line1: /^[a-zA-Z0-9\_\s\-]{4,16}$/, // Letras, espacios, numeros, guion y guion_bajo
    };

    const validationName = () => {
      if (expresiones.nombre.test(data.name)) {
        setData({ ...data, validateName: "true" });
      } else {
        setData({ ...data, validateName: "false" });
      }
    };
    const validationState = () => {
      if (expresiones.nombre.test(data.state)) {
        setData({ ...data, validateState: "true" });
      } else {
        setData({ ...data, validateState: "false" });
      }
    };
    const validationCity = () => {
      if (expresiones.nombre.test(data.city)) {
        setData({ ...data, validateCity: "true" });
      } else {
        setData({ ...data, validateCity: "false" });
      }
    };
    const validationLine1 = () => {
      if (expresiones.line1.test(data.line1)) {
        setData({ ...data, validateLine1: "true" });
      } else {
        setData({ ...data, validateLine1: "false" });
      }
    };
    const validationPostal_code = () => {
      if (expresiones.line1.test(data.postal_code)) {
        setData({ ...data, validatePostal_code: "true" });
      } else {
        setData({ ...data, validatePostal_code: "false" });
      }
    };

    const user = {
      email: UserAuth()?.user?.email,
      uid: UserAuth()?.user?.uid,
    };

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

      if (
        !error &&
        products !== [] &&
        subTotal !== 0 &&
        subTotal > 0 &&
        data.validateName === "true" &&
        data.validateState === "true" &&
        data.validateCity === "true" &&
        data.validateLine1 === "true" &&
        data.validatePostal_code === "true"
      ) {
        if (!error && user.email !== undefined && user.uid !== undefined) {
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
            Swal.fire({
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 5000,
            });
            setProcessingTo(false);
            setIsDisableTo(false);
            elements.getElement(CardElement).clear();
            dispatch(limpiarCarrito());
          } catch (error) {
            console.log(error);
            setProcessingTo(false);
            setIsDisableTo(false);
            Swal.fire({
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
      <div>
        <form onSubmit={handleSubmit}>
          <div className="pb-5 rounded-t border-b-2 border-gray-400 overflow-visible">
            <span className="text-xl font-medium text-white block pb-3">
              Address
            </span>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-[#00ff01]">State</label>
              <input
                type="text"
                name="state"
                onChange={handleInputChange}
                onBlur={validationState}
                onKeyUp={validationState}
                className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
                placeholder="Your state"
              />
              {data.validateState === "false" && (
                <p className="text-xs px-1  text-red-500">
                  The state can only contain letters and spaces
                </p>
              )}
            </div>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-[#00ff01]">City</label>
              <input
                type="text"
                name="city"
                onChange={handleInputChange}
                onBlur={validationCity}
                onKeyUp={validationCity}
                className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
                placeholder="Your city"
              />
              {data.validateCity === "false" && (
                <p className="text-xs px-1  text-red-500">
                  The city can only contain letters and spaces
                </p>
              )}
            </div>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-[#00ff01]">Line 1</label>
              <input
                type="text"
                name="line1"
                onChange={handleInputChange}
                onBlur={validationLine1}
                onKeyUp={validationLine1}
                className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
                placeholder="Your address"
              />
              {data.validateLine1 === "false" && (
                <p className="text-xs px-1  text-red-500">
                  enter the line 1 correctly
                </p>
              )}
            </div>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-[#00ff01]">Postal code</label>
              <input
                type="text"
                name="postal_code"
                onChange={handleInputChange}
                onBlur={validationPostal_code}
                onKeyUp={validationPostal_code}
                className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01] focus:border-[#00ff01] rounded-md"
                placeholder="Your postal code"
              />
              {data.validatePostal_code === "false" && (
                <p className="text-xs px-1  text-red-500">
                  enter the postal code correctly
                </p>
              )}
            </div>
          </div>
          <span className="text-xl font-medium text-white block py-3">
            Card Details
          </span>

          <span className="text-xs text-[#00ff01] ">Card Type</span>

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
                <span className="text-xs text-[#00ff01]">
                  {data.name}
                </span>
                <span className="text-xs text-[#00ff01]">**/**</span>
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
              onChange={handleInputChange}
              onBlur={validationName}
              onKeyUp={validationName}
              className="w-full h-6 bg-black text-white placeholder-[#00ff01] placeholder-opacity-25 text-sm border-b border-gray-600 py-4 hover:border-[#00ff01]  focus:border-[#00ff01] rounded-md"
              placeholder="Card Holder Name"
            />
            {data.validateName === "false" && (
              <p className="text-xs px-1  text-red-500">
                Please enter a valid name.
              </p>
            )}
          </div>

          <div className="flex justify-center flex-col pt-3">
            <CardElement
              className="p-2 border text-white bg-black border-gray-600 hover:border-[#00ff01] focus:outline-none focus:border-[#00ff01] rounded-md"
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
      </div>
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
