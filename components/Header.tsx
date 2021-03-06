import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { logoutUser } from "../api";
import { selectUser } from "../slices/userSlice";
import Loader from "./Loader";

const Header = () => {
  const router = useRouter();
  const [isDropdown, setIsDropdown] = useState(false);
  const user = useSelector(selectUser);

  const mutation = useMutation<
    { success: Boolean; message: string },
    AxiosError
  >(logoutUser, {
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

  return mutation.isLoading ? (
    <Loader />
  ) : (
    <header className="header">
      <Image
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
        src="/images/logo.png"
        height={40}
        width={130}
        objectFit="contain"
      />
      <div className="avatar">
        <Image
          src={
            user?.avatar.secure_url
              ? user.avatar.secure_url
              : "/images/avatar.png"
          }
          alt="image"
          height={40}
          width={40}
          objectFit="cover"
          onClick={() => setIsDropdown(!isDropdown)}
        />
        <div className="overlay" onClick={() => setIsDropdown(false)} />
        <div className={`avatar__dropdown ${isDropdown ? "show" : ""}`}>
          <div className="item" onClick={() => router.push("/profile/me")}>
            Profile
          </div>
          <div className="item" onClick={() => mutation.mutate()}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
