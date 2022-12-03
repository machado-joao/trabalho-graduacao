import axios from "axios";
import { Bar } from "react-chartjs-2";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import Link from "next/link";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useReducer } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export const options = {
  type: "line",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function DashboardScreen() {
  
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesDataPrice: [], salesDataDescount: [] },
    error: "",
  });

  const data = {
    type: "line",
    labels: summary.salesDataPrice.map((x) => x._id), // 2022/01 2022/03
    label: summary.salesDataDescount.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Valor total",
        backgroundColor: "blue",
        data: summary.salesDataPrice.map((x) => x.totalSales),
      },
      {
        label: "Valor com desconto",
        backgroundColor: "#670999",
        data: summary.salesDataDescount.map((x) => x.totalSales),
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title="Visão Geral">
      <div className="grid md:grid-cols-6 md:gap-5">
        <div className="md:col-span-6">
          <h1 className="mb-4 text-center card text-blue-700 text-5xl">
            Visão geral
          </h1>
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    R$ {summary.ordersPrice}{" "}
                  </p>
                  <p className="text-xl">Vendas</p>
                  <Link href="/admin/orders">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar vendas
                    </span>
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    {summary.ordersCount}{" "}
                  </p>
                  <p className="text-xl">Pedidos</p>
                  <Link href="/admin/orders">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar compras
                    </span>
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    {summary.productsCount}{" "}
                  </p>
                  <p className="text-xl">Produtos</p>
                  <Link href="/admin/products">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar produtos
                    </span>
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl text-blue-700">
                    {summary.usersCount}{" "}
                  </p>
                  <p className="text-xl">Usuários</p>
                  <Link href="/admin/users">
                    <span className="hover:underline text-blue-700 cursor-pointer">
                      Visualizar usuários
                    </span>
                  </Link>
                </div>
              </div>
              <h2 className="text-2xl text-blue-700 p-2">
                Relatório de vendas
              </h2>
              <Bar
                className="card p-10"
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

DashboardScreen.auth = { adminOnly: true };

export default DashboardScreen;
