import axios from "axios";
import { LoginInput, RegisterInput } from "../schemas";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const healthCheck = async () => {
  return api.get("/healthcheck");
};
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
