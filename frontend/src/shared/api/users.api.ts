import { axiosInstance } from "./axiosInstance";

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
