import { BsPaypal } from "react-icons/bs";
import CheckoutWizard from "../components/CheckoutWizard";
import Cookies from "js-cookie";
import { FaBarcode, FaStripe } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import Layout from "../components/Layout";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const methods = ["Paypal", "PIX", "Boleto", "Stripe"];

function PaymentScreen() {
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Por favor, selecione o método de pagamento!");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeOrder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Pagamento">
      <CheckoutWizard activeStep={2} />
      <div className="card w-full">
        <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
          <h1 className="my-4 text-center text-blue-800 text-5xl">
            Método de pagamento
          </h1>
          {methods.map((payment, index) => (
            <div key={index} className="flex flex-col items-center">
              <label
                className="focus:bg-blue-600 w-1/3 cursor-pointer text-xl px-10 py-2 card bg-white hover:text-white hover:shadow-slate-500 hover:bg-indigo-500 hover:border-blue-600 hover:outline-none"
                htmlFor={payment}
              >
                <span className="flex justify-between gap-x-3">
                  <input
                    name="paymentMethod"
                    className="p-2 m-2 cursor-pointer outline-non focus:ring-0"
                    id={payment}
                    type="radio"
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                  {payment === "Paypal" ? (
                    <div className="flex gap-x-10 justify-between">
                      {payment}
                      <BsPaypal />
                    </div>
                  ) : payment === "Stripe" ? (
                    <div className="flex gap-x-10 justify-between">
                      {payment} <FaStripe />
                    </div>
                  ) : payment === "PIX" ? (
                    <div className="flex gap-x-14 justify-between">
                      {payment} <GiReceiveMoney />
                    </div>
                  ) : payment === "Boleto" ? (
                    <div className="flex gap-x-10 justify-between">
                      {payment} <FaBarcode />
                    </div>
                  ) : (
                    ""
                  )}
                </span>
              </label>
            </div>
          ))}
          <div className="mb-4 text-xl flex justify-between">
            <button
              onClick={() => router.push("/shipping")}
              type="button"
              className="primary-button"
            >
              Voltar
            </button>
            <button className="primary-button">Avançar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

PaymentScreen.auth = true;

export default PaymentScreen;
