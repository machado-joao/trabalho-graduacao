import axios from "axios";
import db from "../../utils/db";
import Image from "next/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Product from "../../models/Product";
import React, { useContext } from "react";
import ResponseHTTP404 from "../../components/ResponseHTTP404";
import { Store } from "../../utils/Store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function ProductScreen(props) {
  
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return (
      <Layout title="Produto não encontrado">
        <ResponseHTTP404 />
      </Layout>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error(
        <span className="p-2 text-red-600">
          Este produto está indisponível!
        </span>
      );
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className="flex">
        <div className="py-2">
          <Link href="/">
            <button className="bg-white border border-solid border-gray-300">
              Voltar
            </button>
          </Link>
        </div>
        <div className="w-full bg-transparent flex items-center flex-col">
          <h1 className="container shadow-md mt-4 rounded-xl bg-white w-fit text-blue-800 px-6 py-0 text-center text-4xl uppercase">
            {product.name}
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-5 md:gap-4">
        <div className="md:col-span-2">
          <div className="mb-5 shadow-gray-600 shadow-md rounded-full">
            <Image
              src={product.image}
              alt={"Capa do jogo " + product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </div>
        </div>
        <div className="col-span-3">
          <div className="col-span-3 flex justify-between">
            <div className="text-xl w-3/5">
              <ul>
                <li className="game-details">Plataforma: {product.category}</li>
                <li className="game-details">
                  Distribuidora: {product.publisher}
                </li>
                <li className="game-details">
                  Nota: {product.rating} de {product.numReviews} avaliações
                </li>
                <li className="game-details">Gênero: {product.gender}</li>
              </ul>
            </div>
            <div className="w-2/5">
              <div className="p-6 card bg-white">
                <div className="mb-2 flex">
                  {product.countInStock > 0 ? (
                    <div className="text-2xl">
                      <p>Preço: R$ {product.price}</p>
                      <p>Unidades restantes: {product.countInStock}</p>
                    </div>
                  ) : (
                    <div className="text-2xl text-red-600 text-center">
                      <p>Produto esgotado!</p>
                    </div>
                  )}
                </div>
                <div className="flex mt-7 text-xl text-center">
                  <button
                    onClick={addToCartHandler}
                    className="w-full bg-white flex justify-center border border-solid border-gray-300"
                  >
                    Comprar
                    <i className="ri-shopping-cart-line ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <ul className="w-full bg-transparent flex items-center flex-col">
            <h1 className="container shadow-md mt-4 rounded-xl bg-white w-fit text-blue-800 px-6 py-0 text-center text-4xl uppercase">
              {product.title}
            </h1>
            <li className="text-sm p-4 text-left shadow-md border border-solid border-gray-300 bg-white rounded-xl m-1 cursor-text">
              <span className="flex text-2xl py-4 justify-center text-center w-full">
                Descrição
              </span>
              <span className="text-lg">{product.description}</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

export default ProductScreen;
