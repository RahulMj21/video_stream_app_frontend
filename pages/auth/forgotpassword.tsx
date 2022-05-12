import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope } from "react-icons/fa";
import { useMutation } from "react-query";
import { forgotUserPassword } from "../../api";
import GuestRoute from "../../components/GuestRoute";
import Loader from "../../components/Loader";
import FormLayout from "../../layouts/FormLayout";

const ForgotPassword = GuestRoute(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const router = useRouter();

  const mutation = useMutation<
    { success: Boolean; message: string },
    AxiosError,
    { email: string }
  >(forgotUserPassword, {
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    },
    onSuccess: ({ message }) => {
      toast.success(message);
    },
  });

  const handleForgotPassword = (values: { email: string }) => {
    mutation.mutate(values);
  };

  return mutation.isLoading ? (
    <Loader />
  ) : (
    <FormLayout>
      <div className="content">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit(handleForgotPassword)} className="form">
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="email"
              id="email"
              required
              {...register("email")}
            />
            <span>Email</span>
            <p className="error">{errors.email?.message}</p>
          </div>
          <button type="submit" className="btn-brand">
            ForgotPassword
          </button>
        </form>
      </div>
    </FormLayout>
  );
});

export default ForgotPassword;
