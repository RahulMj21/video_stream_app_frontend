import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <Link href={"#"}>
      <a className="btn-google">
        <FcGoogle /> Continue With Google
      </a>
    </Link>
  );
};

export default GoogleButton;
