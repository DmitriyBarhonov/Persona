import { axiosInstance } from "@/src/shared/api";

export type CreateUserPayload = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
};

export const createUser = async (payload: CreateUserPayload) => {
  const { data } = await axiosInstance.post<User>("/users", payload);
  return data;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await axiosInstance.post<User>("/auth/login", payload);
  return data;
};
