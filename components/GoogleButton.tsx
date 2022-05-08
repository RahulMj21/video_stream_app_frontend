import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import showConsentScreen from "../utils/showConsentScreen";

const GoogleButton = () => {
  return (
    <Link href={showConsentScreen()}>
      <a className="btn-google">
        <FcGoogle /> Continue With Google
      </a>
    </Link>
  );
};

export default GoogleButton;
