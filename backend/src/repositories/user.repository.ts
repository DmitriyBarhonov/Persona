import { prisma } from "../db/prisma.js";
export const userRepository = {
  create(email: string, passwordHash: string) {
    return prisma.user.create({
      data: { email, passwordHash },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },
};
