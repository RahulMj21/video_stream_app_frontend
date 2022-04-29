import React from "react";
import FormLayout from "../../layouts/FormLayout";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "../../components/GoogleButton";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { LoginInput, LoginSchema } from "../../schemas";
import { useMutation } from "react-query";
import { loginUser } from "../../api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";

const Login = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const mutation = useMutation<
    { success: Boolean; message: string },
    AxiosError,
    LoginInput
  >(loginUser, {
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/");
    },
  });

  const handleLogin = (values: LoginInput) => {
    mutation.mutate(values);
  };

  return mutation.isLoading ? (
    <Loader />
  ) : (
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
