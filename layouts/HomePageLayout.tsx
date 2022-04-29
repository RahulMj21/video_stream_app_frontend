import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useMe } from "../contexts/MeContext";

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useMe();
  if (!user) router.push("/auth/login");

  return (
    <section className="homeLayout">
      <Header />
      <main className="main">
        <Sidebar />
        <div className="content">{children}</div>
      </main>
    </section>
  );
};

export default HomePageLayout;
