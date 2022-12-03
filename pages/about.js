import Image from "next/image";
import Layout from "../components/Layout";
import React from "react";
import TeamSvg from "../public/images/team.svg";

function AboutScreen() {
  return (
    <Layout title="Sobre">
      <section className="grid mb-14 grid-cols-1 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4 container">
        <div className="col-span-1 text-center">
          <Image
            src={TeamSvg}
            alt="Imagem cartunizada dos membros da equipe de desenvolvedores da plataforma GameOn."
            className="w-full card !shadow-none vertical_img !bg-sky-100"
            layout="responsive"
            width={350}
            height={350}
          />
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <div className="my-10">
            <div className="mb-5">
              <span className="text-3xl p-5">Nós somos</span>
            </div>
            <h1 className="flex flex-col text-5xl lg:ml-10 lg:text-left md:text-center sm:text-center text-center text-slate-600">
              <span> Alunos da Faculdade de Tecnologia de Guaratinguetá</span>
              <span className="text-blue-800 text-5xl">
                {" "}
                e cursamos Análise e Desenvolvimento de Sistemas.
              </span>
            </h1>
            <div className="text-3xl p-5">
              Conheça um pouco mais sobre nós e também nosso projeto visitando
              nosso repositório no{" "}
              <a
                href="https://github.com/machado-joao/trabalho-graduacao"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutScreen;
