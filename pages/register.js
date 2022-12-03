import axios from "axios";
import { getError } from "../utils/error";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import React, { useEffect } from "react";
import RegisterBg from "../public/images/register.svg";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function RegisterScreen() {
  
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, lastName, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        lastName,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        lastName,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Registro">
      <section className="h-full">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <Image
                src={RegisterBg}
                alt="Imagem cartunizada de uma mulher fazendo compras em um e-commerce pelo seu celular."
                className="vertical_img"
                width={640}
                height={640}
              />
            </div>
            <div className="bg-white p-5 rounded-lg shadow-xl xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-5">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex justify-between">
                  <div className="mb-6">
                    <label htmlFor="name" className="text-blue-700 text-2xl">
                      Nome
                    </label>
                    <input
                      placeholder="Seu primeiro nome"
                      {...register("name", {
                        required: "Por favor, digite o seu primeiro nome.",
                        minLength: {
                          value: 2,
                          message: "Por favor, digite um nome válido.",
                        },
                      })}
                      type="name"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="name"
                      autoFocus
                    />{" "}
                    {errors.name && (
                      <div className="text-sm text-red-600">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="lastName"
                      className="text-blue-700 text-2xl"
                    >
                      Sobrenome
                    </label>
                    <input
                      placeholder="Seu último nome"
                      {...register("lastName", {
                        required: "Por favor, digite o seu último nome.",
                        minLength: {
                          value: 2,
                          message: "Por favor, digite um sobrenome válido.",
                        },
                      })}
                      type="lastName"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="lastName"
                      autoFocus
                    />{" "}
                    {errors.lastName && (
                      <div className="text-sm text-red-600">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="text-blue-700 text-2xl">
                    E-mail
                  </label>
                  <input
                    placeholder="Seu melhor e-mail"
                    {...register("email", {
                      required: "Por favor, digite o seu e-mail.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                        message: "Por favor, digite um e-mail válido.",
                      },
                    })}
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    autoFocus
                  />{" "}
                  {errors.email && (
                    <div className="text-sm text-red-600">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="text-blue-700 text-2xl">
                    Senha
                  </label>
                  <input
                    placeholder="Sua senha"
                    type="password"
                    {...register("password", {
                      required: "Por favor, digite a sua senha.",
                      pattern: {
                        value:
                          /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                        message:
                          "Sua senha deve obedecer aos critérios mínimos exigidos.",
                      },
                    })}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    autoFocus
                  />
                  {errors.password && (
                    <div className="text-sm flex justify-between text-red-600">
                      {errors.password.message}
                      <span
                        onClick={() => {
                          toast.info(
                            <div className="text-black text-sm">
                              <ul>
                                <li>Ao menos uma letra maiúscula.</li>
                                <li>Ao menos uma letra minúscula.</li>
                                <li>Ao menos um dígito.</li>
                                <li>Ao menos um caractere especial.</li>
                                <li>Ao menos oito caracteres no total.</li>
                              </ul>
                            </div>
                          );
                        }}
                      >
                        <i className="cursor-pointer text-xl text-blue-800 ri-information-fill"></i>
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="passwordIsValid"
                    className="text-blue-700 text-2xl"
                  >
                    Confirmação de senha
                  </label>
                  <input
                    placeholder="Confirme sua senha"
                    type="password"
                    {...register("passwordIsValid", {
                      required:
                        "Por favor, digite a sua senha novamente para confirmação.",
                      validate: (value) => value === getValues("password"),
                      pattern: {
                        value:
                          /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                        message: "As senhas devem ser iguais!",
                      },
                    })}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="passwordIsValid"
                    autoFocus
                  />
                  {errors.passwordIsValid && (
                    <div className="text-sm flex justify-between text-red-600">
                      {errors.passwordIsValid.message}
                    </div>
                  )}
                  {errors.passwordIsValid && (
                    <div className="text-sm flex justify-between text-red-600">
                      As senhas digitadas não são iguais!
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-md  flex font-semibold mt-2 pt-1 mb-0">
                    Já possui uma conta?&nbsp;
                    <Link href={`/login?redirect=${redirect || "/"}`}>
                      <div className="hover:text-blue-700 hover:underline text-right focus:text-red-700 cursor-pointer transition duration-200 ease-in-out">
                        Entrar
                      </div>
                    </Link>
                  </p>
                </div>
                <div className="flex justify-end">
                  <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Cadastrar-se
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default RegisterScreen;
