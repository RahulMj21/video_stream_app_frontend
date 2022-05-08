import { AxiosError } from "axios";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getMe } from "../api";
import { clearUser, setUser, User } from "../slices/userSlice";
import Loader from "./Loader";

const AuthProtectedRoute =
  (Page: NextPage) =>
  ({ pageProps }: AppProps) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { isLoading } = useQuery<{ success: true; user: User }, AxiosError>(
      "me",
      getMe,
      {
        onError: () => {
          dispatch(clearUser());
          router.push("/auth/login");
        },
        onSuccess: (data) => {
          if (data?.user) {
            dispatch(setUser(data?.user));
          } else {
            router.push("/auth/login");
          }
        },
      }
    );
    return isLoading ? <Loader /> : <Page {...pageProps} />;
  };

export default AuthProtectedRoute;
