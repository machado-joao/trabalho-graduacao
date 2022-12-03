import {
  FaClipboardCheck,
  FaClipboardList,
  FaDeezer,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import React from "react";
import ReactTooltip from "react-tooltip";

function DashboardLinks() {
  return (
    <div className="card text-xl py-5 px-3">
      <ul className="flex flex-col mt-3 text-center align-middle items-center">
        <Link href="/admin/adminProfile">
          <li className="py-0 hover:scale-125 text-blue-700" data-tip="Perfil">
            <FaUserAlt />
          </li>
        </Link>
        <hr className="mt-1 mb-4 w-full flex flex-1" />
        <Link href="/admin/dashboard">
          <li
            className="card px-2 py-2 cursor-pointer !rounded-sm hover:scale-125 text-blue-700"
            data-tip="Dashboard"
          >
            <span>
              <FaDeezer />
            </span>
          </li>
        </Link>
        <Link href="/admin/orders">
          <li
            className="card px-2 py-2 cursor-pointer !rounded-sm hover:scale-125 text-blue-700"
            data-tip="Pedidos"
          >
            <span>
              <FaClipboardCheck />
            </span>
          </li>
        </Link>
        <Link href="/admin/products">
          <li
            className="card px-2 py-2 cursor-pointer !rounded-sm hover:scale-125 text-blue-700"
            data-tip="Produtos"
          >
            <span>
              <FaClipboardList />
            </span>
          </li>
        </Link>
        <Link href="/admin/users">
          <li
            className="card px-2 py-2 cursor-pointer !rounded-sm hover:scale-125 text-blue-700"
            data-tip="Usuários"
          >
            <span>
              <FaUsers />
            </span>
          </li>
        </Link>
      </ul>
      <ReactTooltip
        delayHide={1000}
        place="right"
        type="info"
        effect="solid"
        backgroundColor="#2028b3"
        textColor="#fff"
        borderColor="#cbd5e0"
      />
    </div>
  );
}

export default DashboardLinks;
