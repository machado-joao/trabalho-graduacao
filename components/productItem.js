import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "remixicon/fonts/remixicon.css";
import { SiXbox, SiPlaystation, SiNintendoswitch } from "react-icons/si";
import { toast } from "react-toastify";

function ProductItem({ product, addToCartHandler }) {
  
  function getCategoryIcons(category) {
    if (category == "Xbox") {
      return (
        <SiXbox className="translate-y-8 absolute flex z-20 text-green-700" />
      );
    } else if (category == "PlayStation") {
      return (
        <SiPlaystation className="translate-y-8 absolute flex z-20 text-blue-700" />
      );
    } else if (category == "Nintendo Switch") {
      return (
        <SiNintendoswitch className="translate-y-8 absolute flex z-20 text-red-700" />
      );
    } else {
      return (
        <div>
          <SiXbox className="translate-y-8 translate-x-1 absolute z-20 text-green-700" />
          <SiPlaystation className="translate-y-8 translate-x-6 absolute z-20 text-blue-700" />
          <SiNintendoswitch className="translate-y-8 translate-x-11 absolute z-20 text-red-700" />
        </div>
      );
    }
  }

  return (
    <div className="card p-5 hover:-translate-y-2">
      <p className="mb-2 ml-3 text-black">
        Distribuidora: <span>{product.publisher}</span>
      </p>
      <Link href={`/product/${product.slug}`}>
        <div className="cursor-pointer">
          <Image
            src={product.image}
            alt={"Capa do jogo " + product.name}
            className="rounded card w-full"
            width={500}
            height={500}
          />
        </div>
      </Link>
      {getCategoryIcons(product.category)}
      <div className="mx-2">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-2xl text-center text-blue-800 cursor-pointer">
            {product.name}
          </h2>
        </Link>
        <div className="text-center text-black text-md">
          Restam: <span>{product.countInStock}</span>{" "}
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center flex-col ml-2">
            <span className="flex">
              <span className=" flex-col items-center flex">
                <span className="flex">
                  <span className="text-black text-sm">de: </span>{" "}
                  <span className="line-through text-sm text-red-600">
                    R$ &nbsp;{product.price.toFixed(2)}
                  </span>
                </span>
                <span className="text-xs">
                  {product.descount}% de desconto!
                </span>
              </span>
            </span>
            <span className="text-xl text-green-600">
              <span className="text-black">por:</span>{" "}
              <span>
                R$&nbsp;
                {(
                  product.price -
                  (product.price * product.descount) / 100
                ).toFixed(2)}
              </span>
            </span>
          </div>
          <div>
            {product.countInStock > 0 ? (
              <button
                className="primary-button border border-solid text-2xl border-gray-300 hover:bg-blue-700 hover:text-white"
                type="button"
                onClick={() => addToCartHandler(product)}
              >
                <AiOutlineShoppingCart />
              </button>
            ) : (
              <button
                className="primary-button bg-white hover:bg-current border border-solid cursor-not-allowed border-gray-300"
                type="button"
                onClick={() => toast.error("Produto indisponível!")}
              >
                <AiOutlineShoppingCart className="text-red-600 text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
