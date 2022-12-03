import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowUpCircleFill } from "react-icons/bs";
import ControllerLogo from "../public/images/controller.svg";
import Cookies from "js-cookie";
import DashboardLinks from "./DashboardLinks";
import DropdownLink from "./DropdownLink";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import React, { useContext, useEffect, useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";
import { RiLoginBoxLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
import { Store } from "../utils/Store";
import { ToastContainer } from "react-toastify";

function Layout({ title, children }) {

  const { status, data: session } = useSession();
  const year = new Date().getFullYear();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  const homeRef = useRef(null);
  const navRef = useRef(null);
  const rocketRef = useRef(null);

  const homeFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      homeRef.current.classList.add("home_shrink");
      navRef.current.classList.add("nav_shrink");
      rocketRef.current.classList.add("open");
    } else {
      homeRef.current.classList.remove("home_shrink");
      navRef.current.classList.remove("nav_shrink");
      rocketRef.current.classList.remove("open");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", homeFunc);
    return () => window.removeEventListener("scroll", homeFunc);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="GameOn" content="Um e-commerce de jogos eletrônicos de mídia física." />
        <meta
          name="description"
          content="Encontre jogos eletrônicos de mídia física com preços acessíveis e com muita variedade."
        />
        <meta
          name="keywords"
          content="Comércio eletrônico, loja de jogos, loja de games, loja eletrônica, games, jogos, mídia física"
        />
        <meta
          name="author"
          content="Ariel Paixão, Carlos Junior e João Machado"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="images/white-controller.svg" />
      </Head>
      <ToastContainer position="bottom-center" limit={2} />
      <div className="flex flex-col justify-between">
        <header ref={homeRef}>
          <nav
            ref={navRef}
            className="relative w-full flex flex-wrap items-center justify-between py-1 bg-white text-gray-500 shadow-lg"
          >
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
              <div className="container-fluid">
                <Link href="/">
                  <div className="text-blue-800 cursor-pointer text-5xl">
                    <span>Ga</span>
                    <Image
                      src={ControllerLogo}
                      alt="Um ícone de um controle que se parece com a letra M."
                      width={50}
                      height={30}
                    />
                    <span>e</span>
                    <span className="bg-blue-800 rounded-lg text-white text-5xl">
                      On
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex gap-x-3">
                <Link href="/cart">
                  <div className="shadow border outline-none border-gray-300 shadow-gray-300 px-3 py-2 my-2 cursor-pointer flex text-blue-800 bg-white rounded-lg hover:text-white hover:bg-blue-800 text-2xl">
                    {cartItemsCount > 0 && (
                      <ul className="flex items-center">
                        <li
                          className="bg-red-600 text-white px-2 py-1 rounded-full h-fit text-xs"
                        >
                          {cartItemsCount}
                        </li>
                      </ul>
                    )}
                    <AiOutlineShoppingCart />
                  </div>
                </Link>
                {status === "loading" ? (
                  "Carregando"
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-800 flex flex-wrap text-xl border border-solid border-gray-300">
                      <div className="container-fluid flex">
                        <span className="px-3 text-2xl">
                          {session.user.name}
                        </span>
                        <Image
                          src={`/imgUser/${session.user.name}.jpg`}
                          width={30}
                          height={30}
                          unoptimized
                          className="rounded-full mt-2"
                          alt="Foto de perfil"
                        />
                      </div>
                    </Menu.Button>
                    <Menu.Items className="absolute z-20 right-0 m-2 w-56 origin-top-right bg-white shadow-xl">
                      {!session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link m-2 rounded-md"
                            href="/profile"
                          >
                            Perfil
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link m-2 rounded-md"
                          href="/orderHistory"
                        >
                          Histórico de compras
                        </DropdownLink>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link m-2 rounded-md"
                            href="/admin/dashboard"
                          >
                            Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <a
                          className="dropdown-link m-2 rounded-md"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Sair
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <div className="shadow border outline-none border-gray-300 shadow-gray-300 px-3 py-2 tranform-y-0.5 my-2 cursor-pointer flex text-blue-800 bg-white rounded-lg hover:text-white hover:bg-blue-800 text-2xl">
                      <RiLoginBoxLine />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>
        {session?.user.isAdmin ?
          (
            <session className="fixed top-1/3 z-50">
              <DashboardLinks />
            </session>
          ) : ("")
        }
        <main>
          <div className="container min-h-screen m-auto mt-8 px-0">
            {children}
          </div>
        </main>
        <footer className="flex bg-white  gap-x-5 justify-center items-center h-10 shadow-md">
          <div className="flex justify-between">
            <Link href="/about">
              <a>Sobre nós</a>
            </Link>
          </div>
          <p>
            Copyright &copy; {year}, Game
            <span className="bg-blue-800 rounded-t-sm text-white">On</span>.
          </p>
        </footer>
      </div>
      <div
        className=" p-1 text-md text-center text-red-600 bg-red-100"
        role="alert"
      >
        <span className="text-xl">Aviso!</span> Site em desenvolvimento.
      </div>
      <button
        ref={rocketRef}
        onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }}
        className="scroll-top scroll-to-target open hover:bg-white hover:text-blue-700">
        <BsArrowUpCircleFill className="relative -left-2 text-2xl" />
      </button>
    </>
  );
}

export default Layout;
