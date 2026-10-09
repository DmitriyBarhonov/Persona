import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Один инстанс на всё приложение — чтобы не плодить лишние соединения с базой.
export const prisma = new PrismaClient({ adapter });
