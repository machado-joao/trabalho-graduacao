import db from "../../../utils/db";
import { getSession } from "next-auth/react";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({
      message: "Acesse sua conta!",
    });
  }

  const { user } = session;
  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();
  res.send(orders);
};

export default handler;
