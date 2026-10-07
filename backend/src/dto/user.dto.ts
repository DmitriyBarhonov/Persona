import type { User } from "../generated/prisma/client.js";

export const toUserDto = (user: User) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});
