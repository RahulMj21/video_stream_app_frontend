import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { logoutUser } from "../api";
import Loader from "./Loader";

const Header = () => {
  const router = useRouter();
  const [isDropdown, setIsDropdown] = useState(false);

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
      <h3 className="logo">Logo</h3>
      <div className="avatar">
        <Image
          src="/avatar.jpg"
          alt="image"
          height={40}
          width={40}
          objectFit="cover"
          onClick={() => setIsDropdown(!isDropdown)}
        />
        <div className="overlay" onClick={() => setIsDropdown(false)} />
        <div className={`avatar__dropdown ${isDropdown ? "show" : ""}`}>
          <div className="item">Profile</div>
          <div className="item" onClick={() => mutation.mutate()}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
