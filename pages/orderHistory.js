import axios from "axios";
import { getError } from "../utils/error";
import Layout from "../components/Layout";
import Link from "next/link";
import moment from "moment";
import React, { useEffect, useReducer } from "react";
import "remixicon/fonts/remixicon.css";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderHistoryScreen() {
  
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title="Histórico">
      <h1 className="mb-4 text-center text-blue-800 text-5xl bg-white shadow-md shadow-gray-400 rounded-xl">
        Histórico de compras
      </h1>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto card">
          <table className="min-w-full p-5">
            <thead className="border-b border-b-black">
              <tr className="text-2xl text-black">
                <th className="p-5 text-center">Data do pedido</th>
                <th className="p-5 text-center">Total</th>
                <th className="p-5 text-center">Pagamento</th>
                <th className="p-5 text-center">Data da entrega</th>
                <th className="p-5 text-center">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t text-xl border-t-black">
                  <td className="p-5 text-center">
                    {order.createdAt.substring(8, 10)}/
                    {order.createdAt.substring(5, 7)}/
                    {order.createdAt.substring(0, 4)}
                  </td>
                  <td className="p-5 text-center">R$ {order.descount}</td>
                  <td className="p-5 text-center">
                    {order.isPaid ? (
                      <span className="bg-green-200 p-2 rounded-xl">
                        {order.paidAt.substring(8, 10)}/
                        {order.paidAt.substring(5, 7)}/
                        {order.paidAt.substring(0, 4)}
                      </span>
                    ) : (
                      <span className="bg-red-200 p-2 rounded-xl">
                        Não pago
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-center">
                    {order.isDelivered ? (
                      <span className="bg-green-200 p-2 rounded-xl">
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-sm">
                          Previsão: {moment().add(7, "days").fromNow()}
                        </span>
                        <span className="bg-red-200 p-2 rounded-xl">
                          Não entregue
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-5 text-center">
                    <Link href={`/order/${order._id}`} passHref>
                      <span className="cursor-pointer">
                        <i className="ri-file-list-3-line"></i>
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

OrderHistoryScreen.auth = true;

export default OrderHistoryScreen;
