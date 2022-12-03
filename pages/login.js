import { getError } from "../utils/error";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import LoginBg from "../public/images/login.svg";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function LoginScreen() {
  
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
    formState: { errors },
  } = useForm();

  console.log(errors);

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
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
    <Layout title="Login">
      <div className="h-full">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <Image
                src={LoginBg}
                alt="Imagem de um adolescente cartunizado sentado em uma cadeira gamer e digitando em seu teclado apressadamente."
                className="vertical_img"
                width={640}
                height={640}
              />
            </div>
            <div className="bg-white p-5 rounded-lg shadow-xl xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-5">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-6">
                  <label htmlFor="email" className="text-blue-700 text-2xl">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    {...register("email", {
                      required: "Por favor, digite o seu e-mail.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                        message: "Por favor, digite um e-mail válido.",
                      },
                    })}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    autoFocus
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="text-blue-700 text-2xl">
                    Senha
                  </label>
                  <input
                    type="password"
                    placeholder="Sua senha"
                    {...register("password", {
                      required: "Por favor, digite a sua senha.",
                      /* pattern: {
                        value:
                          /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                        message: "Sua senha deve obedecer aos critérios de segurança.",
                      }, */
                    })}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    autoFocus
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="checkbox"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="checkbox"
                    >
                      Lembrar da conta
                    </label>
                  </div>
                  <p className="text-md flex font-semibold pt-1 mb-0">
                    Não possui uma conta?&nbsp;
                    <Link href={`/register?redirect=${redirect || "/"}`}>
                      <div className="hover:text-blue-700 hover:underline text-right focus:text-red-700 cursor-pointer transition duration-200 ease-in-out">
                        Registre-se!
                      </div>
                    </Link>
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => router.push("/")}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Voltar
                  </button>
                  <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginScreen;
