import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = [
      "first_name",
      "last_name",
      "position",
      "organisation",
      "phone",
    ];

    for (const field of requiredFields) {
      if (typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json(
          { error: `Missing or invalid required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const numberOfGuests =
      typeof body.number_of_guests === "number" && body.number_of_guests >= 1
        ? Math.min(Math.floor(body.number_of_guests), 15)
        : 1;

    // Validate phone format
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    if (!phoneRegex.test(body.phone.trim())) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Optional address fields
    const address = body.address && typeof body.address === "object"
      ? (body.address as Record<string, unknown>)
      : {};

    const getString = (val: unknown) =>
      typeof val === "string" ? val.trim() : "";

    // Create registration record in database
    const registration = await prisma.registration.create({
      data: {
        firstName: body.first_name.trim(),
        lastName: body.last_name.trim(),
        numberOfGuests,
        position: body.position.trim(),
        organisation: body.organisation.trim(),
        country: getString(address.country),
        state: getString(address.state),
        city: getString(address.city),
        buildingApart: getString(address.building_apart),
        street: getString(address.street),
        phone: body.phone.trim(),
        email: typeof body.email === "string" ? body.email.trim() : "",
      },
    });

    console.log(
      `✓ Registration created: ${registration.id} (${registration.firstName} ${registration.lastName})`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully",
        id: registration.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { error: "Failed to process registration. Please try again later." },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to fetch all registrations (for admin dashboard)
export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error("Fetch registrations error:", error);

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
