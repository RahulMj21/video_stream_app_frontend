import React from "react";
import FormLayout from "../../layouts/FormLayout";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleButton from "../../components/GoogleButton";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleLogin = () => {};

  return (
    <div className="content">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="form">
        <div className="input-group">
          <FaEnvelope />
          <input type="email" id="email" required {...register("email")} />
          <span>Email</span>
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="input-group">
          <FaLock />
          <input
            type="password"
            id="password"
            required
            {...register("password")}
          />
          <span>Password</span>
          <p className="error">{errors.password?.message}</p>
        </div>
        <button type="submit" className="btn-brand">
          Login
        </button>
        <p className="toggle-auth">
          Don't have an account?
          <Link href="/auth/register">
            <a>Register now </a>
          </Link>
        </p>
      </form>
      <GoogleButton />
    </div>
  );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <FormLayout>{page}</FormLayout>;
};

export default Login;
