import { boolean, object, string, TypeOf } from "zod";

export const RegisterSchema = object({
  name: string({ required_error: "name is required" })
    .nonempty("name is required")
    .min(3, "name cannot be smaller than 3 characters")
    .max(30, "name cannot be longer than 30 characters"),
  email: string({ required_error: "email is required" })
    .nonempty("email is required")
    .email("please provide a valid email"),
  password: string({ required_error: "password is required" })
    .nonempty("password is required")
    .min(6, "password cannot be smaller than 6 characters")
    .max(30, "password cannot be longer than 30 characters"),
  confirmPassword: string({
    required_error: "confirm password is required",
  }).nonempty("confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "confirm password and password not same",
  path: ["confirmPassword"],
});

export const LoginSchema = object({
  email: string({ required_error: "email is required" })
    .nonempty("email is required")
    .email("please provide a valid email"),
  password: string({ required_error: "password is required" })
    .nonempty("password is required")
    .min(6, "password cannot be smaller than 6 characters")
    .max(30, "password cannot be longer than 30 characters"),
});

export const UpdatePasswordSchema = object({
  currentPassword: string({ required_error: "current password is required" })
    .nonempty("current password is required")
    .min(6, "current password cannot be smaller than 6 characters")
    .max(30, "current password cannot be longer than 30 characters"),
  newPassword: string({ required_error: "new password is required" })
    .nonempty("new password is required")
    .min(6, "new password cannot be smaller than 6 characters")
    .max(30, "new password cannot be longer than 30 characters"),
  confirmNewPassword: string({
    required_error: "confirm new password is required",
  }).nonempty("confirm new password is required"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "confirm new password and password not same",
  path: ["confirmNewPassword"],
});

export const ResetPasswordSchema = object({
  newPassword: string({ required_error: "new password is required" })
    .nonempty("new password is required")
    .min(6, "new password cannot be smaller than 6 characters")
    .max(30, "new password cannot be longer than 30 characters"),
  confirmNewPassword: string({
    required_error: "confirm new password is required",
  }).nonempty("confirm new password is required"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "confirm new password mismatched with the new password",
  path: ["confirmNewPassword"],
});

export const UpdateVideoSchema = object({
  videoTitle: string({ required_error: "please provide video title" })
    .nonempty("video title is required")
    .min(3, "video title must contain atleast 3 characters")
    .max(40, "video title must be smaller than 40 character"),
  videoDescription: string({
    required_error: "please provide video description",
  })
    .nonempty("video description is required")
    .min(3, "video description must contain atleast 3 characters")
    .max(200, "video description must be smaller than 200 character"),
  published: boolean({
    required_error: "please provide video published status",
  }),
});

export type RegisterInput = TypeOf<typeof RegisterSchema>;
export type LoginInput = TypeOf<typeof LoginSchema>;
export type UpdatePasswordInput = TypeOf<typeof UpdatePasswordSchema>;
export type ResetPasswordInput = TypeOf<typeof ResetPasswordSchema>;
export type UpdateVideoInput = TypeOf<typeof UpdateVideoSchema>;
