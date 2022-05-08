import React, { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomePageLayout = ({ children }: { children: ReactNode }) => {
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
