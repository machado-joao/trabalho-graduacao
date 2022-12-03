import { AiOutlineLoading } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import React from "react";
import { RiLoginBoxLine } from "react-icons/ri";
import { useRouter } from "next/router";

const iconSteps = [
  {
    path: "login",
    display: "Autenticação",
    icon: RiLoginBoxLine,
  },
  {
    path: "shipping",
    display: "Endereço de entrega",
    icon: FaShippingFast,
  },
  {
    path: "payment",
    display: "Método de pagamento",
    icon: MdPayment,
  },
  {
    path: "placeOrder",
    display: "Revisão da compra",
    icon: HiOutlineDocumentSearch,
  },
];

function CheckoutWizard({ activeStep = 0 }) {

  const router = useRouter();

  return (
    <div className="my-2 flex flex-wrap gap-x-3">
      {iconSteps.map((step, index) => (
        <div
          key={step.path}
          className={`flex-1 border-b-4 text-center text-2xl 
                        ${
                          index <= activeStep
                            ? "border-blue-700 text-blue-700"
                            : "border-gray-400 text-gray-400"
                        }
         `}
        >
          <span
            onClick={() => router.push(`/${step.path}`)}
            className="cursor-pointer card py-3 !flex !flex-col !items-center"
          >
            {step.display}
            <i>
              {index == activeStep ? (
                <AiOutlineLoading className="rotate" />
              ) : (
                <step.icon />
              )}
            </i>
          </span>
        </div>
      ))}
    </div>
  );
}

export default CheckoutWizard;
