import React, { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="homeLayout">
      <Header />
      <Sidebar />
      <main className="main">{children}</main>
    </section>
  );
};

export default HomePageLayout;
