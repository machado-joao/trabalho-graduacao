import Image from "next/image";
import ImgError from "../public/images/404.svg";
import Link from "next/link";

function ResponseHTTP404() {
  return (
    <div className="card flex items-center flex-col">
      <div className="text-5xl text-center">
        <h1 className="text-blue-800">Parece que não há nada por aqui!</h1>
        <div className="flex text-center">
          <Image
            src={ImgError}
            alt="Um animal fantástico segura e morde o número zero do erro 404."
            width={500}
            height={500}
            className="vertical_img"
          />
          <Link href="/">
            <button className="bg-zinc-800 error_404 text-white hover:bg-red-800">
              {" "}
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResponseHTTP404;
