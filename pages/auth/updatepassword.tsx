import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useMutation } from "react-query";
import { updateUserPassword } from "../../api";
import AuthProtectedRoute from "../../components/AuthProtectedRoute";
import Loader from "../../components/Loader";
import FormLayout from "../../layouts/FormLayout";
import { UpdatePasswordInput, UpdatePasswordSchema } from "../../schemas";

const UpdatePassword = AuthProtectedRoute(() => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const mutation = useMutation<
    { success: Boolean; message: string },
    AxiosError,
    UpdatePasswordInput
  >(updateUserPassword, {
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/profile/me");
    },
  });

  const handleUpdatePassword = (values: UpdatePasswordInput) => {
    mutation.mutate(values);
  };

  return mutation.isLoading ? (
    <Loader />
  ) : (
    <FormLayout>
      <div className="content">
        <h1>Update Password</h1>
        <form onSubmit={handleSubmit(handleUpdatePassword)} className="form">
          <div className="input-group">
            <FaLock />
            <input
              type="password"
              id="currentPassword"
              required
              {...register("currentPassword")}
            />
            <span>Current Password</span>
            <p className="error">{errors.currentPassword?.message}</p>
          </div>
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
            Update Password
          </button>
        </form>
      </div>
    </FormLayout>
  );
});

export default UpdatePassword;
