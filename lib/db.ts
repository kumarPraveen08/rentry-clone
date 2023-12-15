import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prismadb = globalThis.prisma || new PrismaClient();

export default prismadb;
