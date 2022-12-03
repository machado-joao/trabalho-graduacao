import { FcSearch } from "react-icons/fc";
import Image from "next/image";
import Layout from "../../components/Layout";
import { MdAdminPanelSettings } from "react-icons/md";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

function AdminProfileScreen() {

  const { data: session } = useSession();
  const { handleSubmit, register, setValue } = useForm();

  const checkCNPJ = () => {
    const campo = document.getElementById("campo").value;
    console.log(campo);
    const cnpj = campo.replace(/\D/g, "");
    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValue("checkCNPJ", data.checkCNPJ);
        setValue("razao_social", data.razao_social);
        setValue("nome_fantasia", data.nome_fantasia);
        setValue("cnpj", data.cnpj);
        setValue("cnae_fiscal_descricao", data.cnae_fiscal_descricao);
        setValue("situacao_cadastral", data.situacao_cadastral);
        setValue("cnae_fiscal", data.cnae_fiscal);
        setValue("natureza_juridica", data.natureza_juridica);
        setValue("situacao_cadastral", data.situacao_cadastral);
        setValue(
          "descricao_situacao_cadastral",
          data.descricao_situacao_cadastral
        );
        setValue("data_situacao_cadastral", data.data_situacao_cadastral);
        setValue("bairro", data.bairro);
        setValue("complemento", data.complemento);
        setValue("cep", data.cep);
        setValue("logradouro", data.logradouro);
        setValue("uf", data.uf);
        setValue(
          "descricao_tipo_de_logradouro",
          data.descricao_tipo_de_logradouro
        );
        setValue("ddd_telefone_1", data.ddd_telefone_1);
        setValue("ddd_telefone_2", data.ddd_telefone_2);
        setValue("email", data.email);
      });
  };

  return (
    <Layout title="Perfil">
      <div>
        <div className="grid grid-cols-6 gap-5">
          <div className="border-4 col-span-4 rounded-lg p-10 bg-slate-50 shadow-sm shadow-slate-600">
            <span className="text-center my-2">
              <h2 className="text-5xl">
                <span className="text-blue-700">Informações</span> da empresa
              </h2>
            </span>
            <div>
              <div className="mb-4 flex justify-center">
                <input
                  id="campo"
                  placeholder="CNPJ"
                  className="form-control z-0 block w-2/3 px-4 text-center py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                  {...register("checkCNPJ")}
                />
                <span
                  className="relative right-10 top-2 cursor-pointer !px-0 z-10"
                  id="campo"
                  onClick={checkCNPJ}
                >
                  <FcSearch className="text-3xl" />
                </span>
              </div>
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className="mt-4 pb-5 border border-slate-400 shadow-sm shadow-slate-600 p-2">
                  <div className="text-center text-xl mb-2 ">Nome/CNPJ</div>
                  <div className="flex gap-5">
                    <div className="text-xl w-1/3 p-2 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="razao_social"
                      >
                        Razão Social
                      </label>
                      <input
                        {...register("razao_social")}
                        placeholder="Não encontrado"
                        readOnly
                        className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                      />
                    </div>
                    <div className="text-xl w-1/3 p-2 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="nome_fantasia"
                      >
                        Nome fantasia
                      </label>
                      <input
                        {...register("nome_fantasia")}
                        placeholder="Não encontrado"
                        readOnly
                        className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                      />
                    </div>
                    <div className="text-xl w-1/3 p-2 text-center shadow shadow-slate-600 py-2">
                      <label className="text-xl text-blue-700" htmlFor="cnpj">
                        CNPJ
                      </label>
                      <input
                        {...register("cnpj")}
                        placeholder="Não encontrado"
                        readOnly
                        className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pb-5 border border-slate-400 shadow-sm shadow-slate-600 p-2">
                  <div className="text-center text-xl mb-2 ">CNAE</div>
                  <div className="flex gap-5">
                    <div className="text-xl p-2 w-1/3 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="cnae_fiscal"
                      >
                        CNAE Fiscal
                      </label>
                      <input
                        {...register("cnae_fiscal")}
                        placeholder="Não encontrado"
                        readOnly
                        className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                      />
                    </div>
                    <div className="text-xl p-2 w-2/3 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="cnae_fiscal_descricao"
                      >
                        CNAE Fiscal descrição
                      </label>
                      <input
                        {...register("cnae_fiscal_descricao")}
                        placeholder="Não encontrado"
                        readOnly
                        className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pb-5 border border-slate-400 shadow-sm shadow-slate-600 p-2">
                  <div className="text-center text-xl mb-2 ">
                    Natureza/Situação
                  </div>
                  <div className="flex gap-5">
                    <div className="text-xl p-2 w-2/4 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="natureza_juridica"
                      >
                        Natureza Juridíca
                      </label>
                      <input
                        {...register("natureza_juridica")}
                        placeholder="Não encontrado"
                        readOnly
                        className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                      />
                    </div>
                    <div className="text-xl p-2 w-1/4 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="situacao_cadastral"
                      >
                        Situação cadastral
                      </label>
                      <div className="flex">
                        <input
                          {...register("situacao_cadastral")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-1/2 block text-center font-normal text-gray-700 bg-white"
                        />
                        <span>:</span>
                        <input
                          {...register("descricao_situacao_cadastral")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-1/2 block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-xl p-2 w-1/3 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="data_situacao_cadastral"
                      >
                        Situação cadastral data
                      </label>
                      <input
                        {...register("data_situacao_cadastral")}
                        placeholder="Não encontrado"
                        readOnly
                        className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pb-5 border border-slate-400 shadow-sm shadow-slate-600 p-2">
                  <div className="text-center text-xl mb-2">Endereço</div>
                  <div className="flex gap-5">
                    <div className="text-xl p-2 w-1/5 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="descricao_tipo_de_logradouro"
                      >
                        Tipo
                      </label>
                      <div className="flex">
                        <input
                          {...register("descricao_tipo_de_logradouro")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-xl p-2 w-2/4 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="natureza_juridica"
                      >
                        Logradouro
                      </label>
                      <div className="flex">
                        <input
                          {...register("logradouro")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-xl p-2 w-2/4 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="natureza_juridica"
                      >
                        Complemento
                      </label>
                      <div className="flex">
                        <input
                          {...register("complemento")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="text-xl mt-5 p-2 w-3/5 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="descricao_tipo_de_logradouro"
                      >
                        Bairro
                      </label>
                      <div className="flex">
                        <input
                          {...register("bairro")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-xl mt-5 p-2 w-1/5 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="descricao_tipo_de_logradouro"
                      >
                        CEP
                      </label>
                      <div className="flex">
                        <input
                          {...register("cep")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-xl mt-5 p-2 w-1/5 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="descricao_tipo_de_logradouro"
                      >
                        UF
                      </label>
                      <div className="flex">
                        <input
                          {...register("uf")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pb-5 border border-slate-400 shadow-sm shadow-slate-600  p-2">
                  <div className="text-center text-xl mb-2">Contato</div>
                  <div className="flex gap-5">
                    <div className="text-xl p-2 w-1/5 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="ddd_telefone_1"
                      >
                        Telefone 1
                      </label>
                      <div className="flex">
                        <input
                          {...register("ddd_telefone_1")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-xl p-2 w-1/5 text-center shadow shadow-slate-600 py-2">
                      <label
                        className="text-xl text-blue-700"
                        htmlFor="ddd_telefone_2"
                      >
                        Telefone 2
                      </label>
                      <div className="flex">
                        <input
                          {...register("ddd_telefone_2")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="text-xl p-2 w-3/5 text-center shadow  shadow-slate-600 py-2">
                      <label className="text-xl text-blue-700" htmlFor="email">
                        E-mail
                      </label>
                      <div className="flex">
                        <input
                          {...register("email")}
                          placeholder="Não encontrado"
                          readOnly
                          className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-2 h-auto bg-slate-900 shadow-sm shadow-slate-600">
            <div className=" ">
              {session?.user.isAdmin ? (
                <div className="p-10">
                  <div className="flex justify-center">
                    <Image
                      src={`/imgUser/${session.user.name}.jpg`}
                      width={100}
                      height={100}
                      unoptimized
                      className="shadow-black rounded-full "
                      alt="Foto de perfil do administrador."
                    />
                  </div>
                  <div className="">
                    <span className="text-xl text-slate-50 flex justify-center">
                      <MdAdminPanelSettings className="text-3xl" />
                      Administrador
                    </span>
                  </div>
                  <div className="mt-4 grid gap-y-4 border p-2">
                    <div className="text-xl text-white text-center shadow shadow-slate-50 py-2">
                      <div className="">Nome:</div>{" "}
                      <span className="text-slate-50">
                        {session.user.name}
                      </span>
                    </div>
                    <div className="text-xl text-white text-center shadow shadow-slate-50 py-2">
                      <div className="">Email:</div>{" "}
                      <span className="text-slate-50">
                        {session.user.email}
                      </span>
                    </div>
                    <div className="text-xl text-white text-center shadow shadow-slate-50 py-2">
                      <div className="">ID:</div>{" "}
                      <span className="text-slate-50">{session.user._id}</span>
                    </div>
                    <div className="text-xl text-white text-center shadow shadow-slate-50 py-2">
                      <div className="">Hierarquia:</div>{" "}
                      <span className="text-slate-50">
                        {session.user.isAdmin ? "Administrador" : "Not Admin"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminProfileScreen;
