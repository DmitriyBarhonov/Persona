 import { prisma } from "../db/prisma.js";
import bcrypt from "bcrypt";
export const userRepository = {
  async create(email: string, password : string) {
      const passwordHash = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { email, passwordHash  },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};