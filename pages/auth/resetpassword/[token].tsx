import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useMutation } from "react-query";
import { resetUserPassword } from "../../../api";
import GuestRoute from "../../../components/GuestRoute";
import Loader from "../../../components/Loader";
import FormLayout from "../../../layouts/FormLayout";
import { ResetPasswordInput, ResetPasswordSchema } from "../../../schemas";

const ResetPassword = GuestRoute(() => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const mutation = useMutation<
    { success: Boolean; message: string },
    AxiosError,
    { input: ResetPasswordInput; token: string }
  >(resetUserPassword, {
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/auth/login");
    },
  });

  const handleResetPassword = (values: ResetPasswordInput) => {
    mutation.mutate({ input: values, token: router.query.token as string });
  };

  return mutation.isLoading ? (
    <Loader />
  ) : (
    <FormLayout>
      <div className="content">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit(handleResetPassword)} className="form">
          <div className="input-group">
            <FaLock />
            <input
              type="password"
              id="newPassword"
              required
              {...register("newPassword")}
            />
            <span>New Password</span>
            <p className="error">{errors.newPassword?.message}</p>
          </div>
          <div className="input-group">
            <FaLockOpen />
            <input
              type="password"
              id="confirmNewPassword"
              required
              {...register("confirmNewPassword")}
            />
            <span>Confirm New Password</span>
            <p className="error">{errors.confirmNewPassword?.message}</p>
          </div>
          <button type="submit" className="btn-brand">
            Reset Password
          </button>
        </form>
      </div>
    </FormLayout>
  );
});

export default ResetPassword;
