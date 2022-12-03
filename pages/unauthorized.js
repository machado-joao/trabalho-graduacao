import Layout from "../components/Layout";
import React from "react";
import { useRouter } from "next/router";

function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Acesso negado!">
      <div className="card w-full p-5 bg-white">
        <h1 className="text-center text-red-600 text-5xl">
          Acesso não autorizado!
        </h1>
        {message && (
          <div className="mb-4 text-2xl text-center text-gray-900">
            Você não pode acessar esta página antes de fazer login!
          </div>
        )}
        <div className="text-center">
          <button
            onClick={() => router.push("/login")}
            type="button"
            className="bg-blue-800 text-xl text-white"
          >
            Fazer login agora
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Unauthorized;
