import axios from "axios";
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  UpdatePasswordInput,
  UpdateVideoInput,
} from "../schemas";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const api = axios.create({
  baseURL,
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
    .then((res) => res.data)
    .catch(() => null);
};

export const updateUserPassword = async (input: UpdatePasswordInput) => {
  return api
    .put("/user/updatepassword", input)
    .then((res) => res.data)
    .catch((err) => null);
};

export const forgotUserPassword = async (input: { email: string }) => {
  return api.post("/user/forgotpassword", input).then((res) => res.data);
};

export const resetUserPassword = async ({
  input,
  token,
}: {
  input: ResetPasswordInput;
  token: string;
}) => {
  return api.put(`/user/resetpassword/${token}`, input).then((res) => res.data);
};

// video route 👇👇👇👇👇
export const uploadVideo = async ({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (ProgressEvent: any) => void };
}) => {
  return axios
    .post(`${baseURL}/video/new`, formData, {
      ...config,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const updateVideo = async ({
  input,
  videoId,
}: {
  input: UpdateVideoInput;
  videoId: string;
}) => {
  return api.put(`/video/update/${videoId}`, input).then((res) => res.data);
};

export const getAllVideos = async () => {
  return api
    .get("/video/all")
    .then((res) => res.data)
    .catch((err) => null);
};

export const getMyVideos = async () => {
  return api
    .get(`/video/own`)
    .then((res) => res.data)
    .catch((err) => null);
};

export const getUserVideos = async (userId: string) => {
  return api.get(`/video/all/${userId}`).then((res) => res.data);
};
