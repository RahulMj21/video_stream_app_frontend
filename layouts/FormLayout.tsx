import React from "react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="auth">
      <main className="container">{children}</main>
    </section>
  );
};

export default FormLayout;
