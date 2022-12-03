import axios from "axios";
import { BsPaypal } from "react-icons/bs";
import CheckoutWizard from "../components/CheckoutWizard";
import Cookies from "js-cookie";
import { FaBarcode, FaStripe } from "react-icons/fa";
import { getError } from "../utils/error";
import { GiReceiveMoney } from "react-icons/gi";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function PlaceOrderScreen() {
  
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems
      .reduce(
        (a, c) => a + c.quantity * (c.price - (c.price * c.descount) / 100),
        0
      )
      .toFixed(2)
  );

  const shippingPrice = 0;
  const taxPrice = round2(itemsPrice * 0);
  const descount = round2(cartItems.reduce((a, c) => a + c.price, 0));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  const totalDescount = round2(totalPrice);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        descount,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Revisão do pedido">
      <CheckoutWizard activeStep={3} />
      <div className="card border border-gray-300 p-5">
        <h1 className="mb-4 text-center text-blue-800 text-5xl">
          Revisão do pedido
        </h1>
        {cartItems.length === 0 ? (
          <div className="card w-full p-5 bg-white">
            <h1 className="text-center text-red-600 text-3xl">
              Parece que você se perdeu, não é?
            </h1>
            {
              <div className="mb-4 text-xl text-center text-red-600">
                Você não possui produtos no carrinho!
              </div>
            }
            <div className="text-center">
              <button
                onClick={() => router.push("/")}
                type="button"
                className="primary-button text-xl"
              >
                Voltar para a página inicial
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-8 md:gap-6">
            <div className="overflow-x-auto md:col-span-5">
              <div className="text-center border border-gray-300 mb-5 overflow-x-auto p-5">
                <h2 className="mb-2 text-blue-600 text-3xl">
                  Lista de produtos
                </h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr className="text-black text-xl">
                      <th className="px-5 text-center">Produto</th>
                      <th className="p-5 text-center">Quantidade</th>
                      <th className="p-5 text-center">Preço unitário</th>
                      <th className="p-5 text-center">Preço total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item._id}
                        className="border-y divide-black border-blak"
                      >
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="cursor-pointer"
                            ></Image>
                          </Link>
                        </td>
                        <td className="p-5 text-xl only:text-center">
                          {item.quantity}
                        </td>
                        <td className="p-5 text-xl text-center">
                          R$&nbsp;
                          {(
                            item.price -
                            (item.price * item.descount) / 100
                          ).toFixed(2)}
                        </td>
                        <td className="p-5 text-xl text-center">
                          R$&nbsp;
                          {(
                            (item.price - (item.price * item.descount) / 100) *
                            item.quantity
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between gap-5">
                <div className="w-2/3 border border-gray-300 p-5">
                  <h2 className="mb-2 text-blue-600 text-center text-3xl">
                    Endereço para a entrega
                  </h2>
                  <div className="flex text-xl justify-between gap-2 mb-2">
                    <div className="flex justify-between items-start flex-col">
                      <span className="text-blue-700">
                        Nome:&nbsp;
                        <span className="text-black">
                          {shippingAddress.name}
                        </span>
                      </span>
                      <span className="text-blue-700">
                        Endereço:&nbsp;
                        <span className="text-black">
                          {shippingAddress.address}
                        </span>
                      </span>
                      <span className="text-blue-700">
                        Bairro:&nbsp;
                        <span className="text-black">
                          {shippingAddress.neighborhood}
                        </span>
                      </span>
                      <span className="text-blue-700">
                        Cidade:&nbsp;
                        <span className="text-black">
                          {shippingAddress.city}
                        </span>
                      </span>
                      <span className="text-blue-700">
                        CEP:&nbsp;
                        <span className="text-black">
                          {shippingAddress.postalCode}
                        </span>
                      </span>
                      <span className="text-blue-700">
                        Número:&nbsp;
                        <span className="text-black">
                          {shippingAddress.number}
                        </span>
                      </span>
                      <span className="text-blue-700">
                        Estado:&nbsp;
                        <span className="text-black">
                          {shippingAddress.state}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center flex-col">
                    <Link href="/shipping">
                      <div className="cursor-pointer bg-sky-100 w-fit hover:bg-blue-700 hover:text-white text-blue-700 text-center rounded shadow-md py-2 px-2">
                        Editar
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="w-1/3 border border-gray-300 p-5">
                  <div className="flex flex-col justify-between h-full">
                    <h2 className="mb-2 text-blue-600 text-center text-3xl">
                      Método de pagamento
                    </h2>
                    <div className="mb-2 text-xl text-center">
                      {paymentMethod === "Paypal" ? (
                        <div className="flex justify-center">
                          {paymentMethod}
                          <BsPaypal />
                        </div>
                      ) : paymentMethod === "Stripe" ? (
                        <div className="flex justify-center">
                          {paymentMethod} <FaStripe />
                        </div>
                      ) : paymentMethod === "PIX" ? (
                        <div className="flex justify-center">
                          {paymentMethod} <GiReceiveMoney />
                        </div>
                      ) : paymentMethod === "Boleto" ? (
                        <div className="flex justify-center">
                          {paymentMethod} <FaBarcode />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex items-center flex-col">
                      <Link href="/payment">
                        <div className="cursor-pointer bg-sky-100 w-fit hover:bg-blue-700 hover:text-white text-blue-700 text-center rounded shadow-md py-2 px-2">
                          Editar
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto md:col-span-3">
              <div className="bg-white shadow-md rounded-lg p-5 border border-gray-300">
                <h2 className="mb-2 text-blue-600 text-center text-3xl">
                  Resumo do pedido
                </h2>
                <ul>
                  <li>
                    <div className="mb-2 gap-5 text-xl flex justify-between">
                      <div>Itens</div>
                      <div>R$&nbsp;{itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex text-xl justify-between">
                      <div>Total</div>
                      <div className="flex flex-col align-middle items-end">
                        <span className="text-xl text-black">
                          R$&nbsp;
                          {totalDescount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className="text-blue-800 text-2xl border border-gray-300 bg-white shadow-md w-full"
                    >
                      {loading ? "Carregando..." : "Realizar pedido"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

PlaceOrderScreen.auth = true;

export default PlaceOrderScreen;
