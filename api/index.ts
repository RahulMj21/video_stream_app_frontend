import axios from "axios";
import { LoginInput, RegisterInput } from "../schemas";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// test route 👇👇👇👇👇
export const healthCheck = async () => {
  return api.get("/healthcheck");
};
// auth route 👇👇👇👇👇
export const registerUser = async (input: RegisterInput) => {
  return api
    .post("/register", input)
    .then(({ data }: { data: { success: Boolean; message: string } }) => data);
};
export const loginUser = async (input: LoginInput) => {
  return api
    .post("/login", input)
    .then(({ data }: { data: { success: Boolean; message: string } }) => data);
};
export const logoutUser = async () => {
  return api
    .get("/logout")
    .then(({ data }: { data: { success: Boolean; message: string } }) => data);
};

// user route 👇👇👇👇👇
export const getMe = async () => {
  return api
    .get("/me")
    .then((res) => res.data.user)
    .catch(() => null);
};

// video route 👇👇👇👇👇
export const uploadVideo = async ({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (ProgressEvent: any) => void };
}) => {
  return api
    .post("/video/new", formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
