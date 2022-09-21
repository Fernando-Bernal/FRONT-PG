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
      line1: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
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
          console.log(paymentMethod);
          const { id } = paymentMethod;
          try {
            const { data } = await axios.post(
              "https://sneakers-back-end.herokuapp.com/checkout",
              {
                id,
                email: user.email,
                uid: user.uid,
                shoes: products,
                amount: subTotal * 100,
              }
            );
            console.log(paymentMethod);
            Swal.fire({
              position: "top-center",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 5000,
            });
            setProcessingTo(false);
            setIsDisableTo(false);
            console.log(data);
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
      <div>
        <form onSubmit={handleSubmit}>
          <div className="pb-5 bg-[#2f3436] rounded-t border-b border-gray-400 overflow-visible">
            <span className="text-xl font-medium text-gray-100 block pb-3">
              Address
            </span>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-gray-400 ">State</label>
              <input
                type="text"
                name="state"
                onChange={handleInputChange}
                onBlur={validationState}
                onKeyUp={validationState}
                className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                placeholder="Arizona"
              />
              {data.validateState === "false" && (
                <p className="text-xs px-1  text-red-500">
                  The state can only contain letters and spaces
                </p>
              )}
            </div>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-gray-400 ">City</label>
              <input
                type="text"
                name="city"
                onChange={handleInputChange}
                onBlur={validationCity}
                onKeyUp={validationCity}
                className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                placeholder="Tucson"
              />
              {data.validateCity === "false" && (
                <p className="text-xs px-1  text-red-500">
                  The city can only contain letters and spaces
                </p>
              )}
            </div>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-gray-400 ">Line 1</label>
              <input
                type="text"
                name="line1"
                onChange={handleInputChange}
                onBlur={validationLine1}
                onKeyUp={validationLine1}
                className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                placeholder="North Stone Avenue & W Alturas St"
              />
              {data.validateLine1 === "false" && (
                <p className="text-xs px-1  text-red-500">
                  enter the line 1 correctly
                </p>
              )}
            </div>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-gray-400 ">Postal code</label>
              <input
                type="text"
                name="postal_code"
                onChange={handleInputChange}
                onBlur={validationPostal_code}
                onKeyUp={validationPostal_code}
                className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                placeholder="AZ85705"
              />
              {data.validatePostal_code === "false" && (
                <p className="text-xs px-1  text-red-500">
                  enter the postal code correctly
                </p>
              )}
            </div>
          </div>
          <span className="text-xl font-medium text-gray-100 block py-3">
            Card Details
          </span>

          <span className="text-xs text-gray-400 ">Card Type</span>

          <div className="overflow-visible flex justify-between items-center mt-2">
            <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
              <span className="italic text-lg font-medium text-gray-200 underline">
                VISA
              </span>

              <div className="flex justify-between items-center pt-4 ">
                <span className="text-xs text-gray-200 font-medium">****</span>
                <span className="text-xs text-gray-200 font-medium">****</span>
                <span className="text-xs text-gray-200 font-medium">****</span>
                <span className="text-xs text-gray-200 font-medium">****</span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs  text-gray-200">
                  Giga Tamarashvili
                </span>
                <span className="text-xs  text-gray-200">12/18</span>
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
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              onBlur={validationName}
              onKeyUp={validationName}
              className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
              placeholder="Giga Tamarashvili"
            />
            {data.validateName === "false" && (
              <p className="text-xs px-1  text-red-500">
                Por favor ingrese un nombre valido.
              </p>
            )}
          </div>

          <div className="flex justify-center flex-col pt-3">
            <CardElement
              className=" p-2 border bg-gray-800 border-gray-600 hover:border-blue-600"
              options={cardElementOption}
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full mt-3 bg-[#00ff01] rounded focus:outline-none text-white hover:bg-blue-600 disabled:opacity-50 disabled:bg-[#2f3436]"
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
