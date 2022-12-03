import Link from "next/link";
import React from "react";

function DropdownLink(props) {
  
  let { href, children, ...rest } = props;

  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

export default DropdownLink;
