import axios from "axios";
import { getError } from "../utils/error";
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import React, { useEffect } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { signIn, useSession } from "next-auth/react";
import { TbUserCircle } from "react-icons/tb";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function ProfileScreen() {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("lastName", session.user.lastName);
    setValue("email", session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, image, lastName, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        image,
        lastName,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Perfil atualizado com sucesso!");
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Perfil">
      {session.user.isAdmin ? (
        <Link onLoad={router.push("/unauthorizedProfile")} href="/"></Link>
      ) : (
        <form
          className="grid md:grid-cols-6 md:gap-5"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="col-span-6 card py-2 mb-4 text-center text-blue-800 text-5xl">
            Perfil
          </h1>
          <div className="col-span-3">
            <Image
              src={`/imgUser/${session.user.name}.jpg`}
              width={700}
              height={700}
              unoptimized
              alt="Foto de perfil"
            />
          </div>
          <div className="col-span-3 flex flex-col justify-between">
            <div className="gap-5 flex">
              <div className="w-1/2 card p-10">
                <div className="mb-6">
                  <label htmlFor="name" className="text-black text-2xl">
                    Nome
                  </label>
                  <div className="flex gap-x-2">
                    <TbUserCircle className="text-2xl my-2 text-blue-800" />
                    <input
                      {...register("name", {
                        required: "Por favor, digite o eu primeiro nome.",
                        minLength: {
                          value: 2,
                          message: "Por favor, digite um nome válido.",
                        },
                      })}
                      type="name"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                      id="name"
                    />{" "}
                    {errors.name && (
                      <div className="text-sm text-red-600">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="lastName" className="text-black text-2xl">
                    Sobrenome
                  </label>
                  <div className="flex gap-x-2">
                    <MdOutlineDriveFileRenameOutline className="text-2xl my-2 text-blue-800" />
                    <input
                      {...register("lastName", {
                        required: "Por favor, digite o seu último nome.",
                        minLength: {
                          value: 2,
                          message: "Por favor, digite um sobrenome válido.",
                        },
                      })}
                      type="lastName"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                      id="lastName"
                    />{" "}
                    {errors.lastName && (
                      <div className="text-sm text-red-600">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card p-10 w-1/2">
                <div className="mb-4">
                  <label htmlFor="email" className="text-black text-2xl">
                    E-mail
                  </label>
                  <div className="flex gap-x-2">
                    <HiOutlineMail className="text-2xl my-2 text-blue-800" />
                    <input
                      type="email"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                      id="email"
                      {...register("email", {
                        required: "Por favor, digite o seu e-mail",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                          message: "Por favor, digite um e-mail válido.",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="text-red-600">{errors.email.message}</div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="text-black text-2xl">
                    Senha
                  </label>
                  <div className="flex gap-x-2">
                    <RiLockPasswordLine className="text-2xl my-2 text-blue-800" />
                    <input
                      type="password"
                      {...register("password", {
                        required: "Por favor, digite a sua senha atual.",
                        /* pattern: {
                          value:
                            /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                          message: "Sua senha deve obedecer aos critérios de segurança exigidos.",
                        }, */
                      })}
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                      id="password"
                      autoFocus
                    />
                    {errors.password && (
                      <div className="text-sm flex justify-between text-red-600">
                        {errors.password.message}
                        <span
                          onClick={() => {
                            toast(
                              "Sobre a ISO/IEC 27000, mínimo: 3 letras minúsculas. 2 letras maiúsculas. 2 números. 2 caracteres especiais. 8 caracteres ou mais.",
                              { position: "top-center" }
                            );
                          }}
                        >
                          <i className="cursor-pointer text-xl ri-alert-line"></i>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="passwordIsValid"
                    className="text-black text-2xl"
                  >
                    Confirmação de senha
                  </label>
                  <div className="flex gap-x-2">
                    <RiLockPasswordLine className="text-2xl my-2 text-blue-800" />
                    <input
                      type="password"
                      {...register("passwordIsValid", {
                        required: "Por favor, digite a sua senha novamente.",
                        validate: (value) => value === getValues("password"),
                        pattern: {
                          value:
                            /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                          message: "As senhas deve ser iguais!",
                        },
                      })}
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-700 focus:border-blue-600 focus:outline-none"
                      id="passwordIsValid"
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
                </div>
              </div>
            </div>
            <div className="mb-4 w-full flex flex-col items-end">
              <button className="primary-button text-xl bg-white">
                Salvar
              </button>
            </div>
          </div>
        </form>
      )}
    </Layout>
  );
}

ProfileScreen.auth = true;

export default ProfileScreen;
