import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const requiredFields = [
    "first_name", 
    "last_name", 
    "guest_category", 
    "position", 
    "organisation", 
    "phone", 
    "email"
  ] as const;

  for (const field of requiredFields) {
    const v = body[field];
    if (typeof v !== "string" || !v.trim()) {
      return NextResponse.json({ 
        error: `Missing or invalid required field: ${field}` 
      }, { status: 400 });
    }
  }

  const email = (body.email as string).trim();
  const phone = (body.phone as string).trim();
  const guestCategory = (body.guest_category as string).trim();

  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }
  if (!/^\+?[0-9\s\-]{7,15}$/.test(phone)) {
    return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
  }

  // 1. Initial check to PREVENT DUPLICATES
  const existingRegistration = await prisma.registration.findFirst({
    where: {
      OR: [
        { email: email },
        { phone: phone }
      ]
    }
  });

  if (existingRegistration) {
    return NextResponse.json(
      { error: "This email or phone number is already registered" },
      { status: 409 }
    );
  }

  const address =
    body.address && typeof body.address === "object"
      ? (body.address as Record<string, unknown>)
      : {};

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  try {
    const registration = await prisma.registration.create({
      data: {
        firstName: (body.first_name as string).trim(),
        lastName: (body.last_name as string).trim(),
        guestCategory,
        position: (body.position as string).trim(),
        organisation: (body.organisation as string).trim(),
        country: str(address.country),
        state: str(address.state),
        city: str(address.city),
        buildingApart: str(address.building_apart),
        street: str(address.street),
        phone,
        email,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Registration submitted successfully", 
        id: registration.id 
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // 2. Database-level check for duplicate registration (handles race conditions)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: "This email or phone number is already registered" },
          { status: 409 }
        );
      }
    }

    const message = error instanceof Error ? error.message : "Unknown database error";
    console.error("Registration DB error:", error);
    return NextResponse.json({ error: `Database error: ${message}` }, { status: 500 });
  }
}

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({ 
      orderBy: { createdAt: "desc" } 
    });
    return NextResponse.json({ 
      success: true, 
      count: registrations.length, 
      data: registrations 
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch registrations: ${message}` }, { status: 500 });
  }
}