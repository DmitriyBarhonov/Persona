import type { User } from "../generated/prisma/client.js";

// Срезает passwordHash перед отправкой юзера клиенту — наружу не должен уйти даже хэш.
export const toUserDto = (user: User) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});
