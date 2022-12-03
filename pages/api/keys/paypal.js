import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .send("Acesse sua conta antes de prosseguir com o pagamento.");
  }
  res.send(process.env.PAYPAL_CLIENT_ID || "BRL");
};

export default handler;
