// app/api/registration/route.ts
// POST /api/registration
// Saves the registrant to the DB and sends a confirmation email.

import { NextRequest, NextResponse } from "next/server";
import { saveRegistration, isEmailRegistered, RegistrationPayload } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body: RegistrationPayload = await req.json();

    // ── Basic validation ────────────────────────────────────────────────────
    const { full_name, position, organisation, address, phone, email } = body;

    if (!full_name || !position || !organisation || !address || !phone || !email) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── Duplicate check ─────────────────────────────────────────────────────
    const alreadyRegistered = await isEmailRegistered(email);
    if (alreadyRegistered) {
      return NextResponse.json(
        { error: "This email address has already been registered." },
        { status: 409 }
      );
    }

    // ── Save to database ────────────────────────────────────────────────────
    const registration = await saveRegistration(body);

    // ── Send confirmation email ─────────────────────────────────────────────
    await sendConfirmationEmail({
      fullName: full_name,
      position,
      organisation,
      email,
    });

    return NextResponse.json(
      {
        message: "Registration successful.",
        id: registration.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/registration]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
