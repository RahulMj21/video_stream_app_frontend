import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api";
import GoogleButton from "../../components/GoogleButton";
import FormLayout from "../../layouts/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, RegisterSchema } from "../../schemas";
import { FaEnvelope, FaLock, FaUser, FaUserLock } from "react-icons/fa";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });
  const router = useRouter();
  const mutation = useMutation<
    { success: Boolean; message: string },
    AxiosError,
    RegisterInput
  >(registerUser, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ message }) => {
      console.log(message);
      toast.success(message);
      router.push("/");
    },
  });

  const handleRegister = (values: RegisterInput) => {
    mutation.mutate(values);
  };

  return mutation.isLoading ? (
    <Loader />
  ) : (
    <div className="content">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(handleRegister)} className="form">
        <div className="input-group">
          <FaUser />
          <input type="text" id="name" required {...register("name")} />
          <span>Name</span>
          <p className="error">{errors.name?.message}</p>
        </div>
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
        <div className="input-group">
          <FaUserLock />
          <input
            type="password"
            id="confirmPassword"
            required
            {...register("confirmPassword")}
          />
          <span>Confirm Password</span>
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>
        <button type="submit" className="btn-brand">
          Register
        </button>
        <p className="toggle-auth">
          Already have an account?
          <Link href="/auth/login">
            <a> Login Now </a>
          </Link>
        </p>
      </form>
      <GoogleButton />
    </div>
  );
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return <FormLayout>{page}</FormLayout>;
};

export default Register;
