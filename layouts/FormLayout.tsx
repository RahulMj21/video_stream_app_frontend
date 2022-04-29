import { useRouter } from "next/router";
import React from "react";
import { useMe } from "../contexts/MeContext";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useMe();
  if (user) router.push("/");

  return (
    <section className="auth">
      <main className="container">{children}</main>
    </section>
  );
};

export default FormLayout;
