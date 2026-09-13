 import { prisma } from "../db/prisma.js";

export const userRepository = {
  create(email: string, password: string) {
     
    return prisma.user.create({
      data: { email, password },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};