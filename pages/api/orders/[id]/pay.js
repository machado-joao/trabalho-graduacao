import db from "../../../../utils/db";
import { getSession } from "next-auth/react";
import moment from "moment";
import Order from "../../../../models/Order";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("Acesse sua conta!");
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: "Esta compra já foi paga!" });
    }
    order.isPaid = true;
    order.paidAt = moment().subtract(3, "hour");
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: "Pagamento realizado com sucesso!", order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Compra não encontrada!" });
  }
};

export default handler;
