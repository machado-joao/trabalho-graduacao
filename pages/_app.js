import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProgressBar from "@badrap/bar-of-progress";
import { Router, useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import "../styles/globals.css";

const progress = new ProgressBar({
  size: 4,
  color: "#1e40af",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=Por favor, acesse a sua conta.");
    },
  });
  if (status === "loading") {
    return <div>Carregando...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push(
      "/unauthorized?message=Se você é um administrador acesse a sua conta."
    );
  }

  return children;
}

export default MyApp;
