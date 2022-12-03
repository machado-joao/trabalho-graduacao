import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function CartScreen() {
  
  const { data: session } = useSession();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    toast.success("O produto foi removido do carrinho!");
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Não possuimos mais deste produto em estoque.");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Quantidade alterada com sucesso!");
  };

  return (
    <Layout title="Carrinho">
      <h1 className="mb-5 text-5xl text-blue-800 text-center card">
        Carrinho de compras
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center card p-6 w-full mb-5">
          <div className="flex items-center flex-col">
            <div className="mb-5 text-2xl">
              O seu carrinho de compras está vazio.
            </div>
            <Link href="/">
              <button className="primary-button bg-white text-xl border border-solid border-gray-300">
                Voltar
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-4 text-xl md:gap-5">
            <div className="overflow-x-auto md:col-span-3 card">
              <table className="min-w-full">
                <thead>
                  <tr className="text-center text-2xl text-black">
                    <th className="p-5 text-center">Produto</th>
                    <th className="p-5 text-center">Quantidade</th>
                    <th className="p-5 text-center">Preço unitário</th>
                    <th className="p-5 text-center">Preço total</th>
                    <th className="p-5 text-center">Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-t border-t-black">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <div className="flex cursor-pointer justify-center text-center">
                            <Image
                              src={item.image}
                              alt={"Capa do jogo " + item.name}
                              width={80}
                              height={80}
                            />
                          </div>
                        </Link>
                      </td>
                      <td className="p-5 text-center">
                        <select
                          className="bg-white-900 p-1 text-black text-xl"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 pointer-events-none text-black text-center">
                        R$&nbsp;
                        {(
                          item.price -
                          (item.price * item.descount) / 100
                        ).toFixed(2)}
                      </td>
                      <td className="p-5 pointer-events-none text-black text-center">
                        R$&nbsp;
                        {(
                          (item.price - (item.price * item.descount) / 100) *
                          item.quantity
                        ).toFixed(2)}
                      </td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => removeItemHandler(item)}
                          className="bg-white py-3 text-blue-800 shadow-lg border border-solid border-gray-300"
                        >
                          <div className="bg-none">
                            <RiDeleteBin2Line />
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <ul className="card bg-white p-5">
                <li>
                  <div className="pb-3 text-xl">
                    Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                    R$&nbsp;
                    {cartItems
                      .reduce(
                        (a, c) =>
                          a +
                          c.quantity * (c.price - (c.price * c.descount) / 100),
                        0
                      )
                      .toFixed(2)}
                  </div>
                </li>
                <li>
                  <button
                    onClick={
                      session?.user
                        ? () => router.push("/shipping")
                        : router.push("login?redirect=shipping")
                    }
                    className="primary-button w-full border border-solid border-gray-300"
                  >
                    Confirmar
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
