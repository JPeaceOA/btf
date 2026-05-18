// lib/db.ts
// Prisma client singleton — prevents multiple instances in dev (hot reload safe)

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ─── Registration Helpers ────────────────────────────────────────────────────

export type RegistrationPayload = {
  full_name: string;
  position: string;
  organisation: string;
  address: string;
  phone: string;
  email: string;
};

/**
 * Save a new registration to the database.
 * Throws if the email is already registered.
 */
export async function saveRegistration(data: RegistrationPayload) {
  return prisma.registration.create({
    data: {
      fullName: data.full_name,
      position: data.position,
      organisation: data.organisation,
      address: data.address,
      phone: data.phone,
      email: data.email,
    },
  });
}

/**
 * Check if an email is already registered.
 */
export async function isEmailRegistered(email: string): Promise<boolean> {
  const existing = await prisma.registration.findUnique({
    where: { email },
  });
  return !!existing;
}

/**
 * Fetch all registrations (admin use).
 */
export async function getAllRegistrations() {
  return prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });
}
