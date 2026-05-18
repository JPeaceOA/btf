// lib/email.ts
// Sends a confirmation email to the registrant after successful sign-up.
//
// Requires these environment variables in .env.local:
//   SMTP_HOST=smtp.gmail.com          (or your provider's SMTP host)
//   SMTP_PORT=465
//   SMTP_SECURE=true                  (true for port 465, false for 587)
//   SMTP_USER=your@email.com
//   SMTP_PASS=your_app_password
//   EMAIL_FROM="Summit Secretariat <your@email.com>"
//
// Install dependency: npm install nodemailer
// Types:            npm install --save-dev @types/nodemailer

import nodemailer from "nodemailer";

// ─── Transporter ─────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type RegistrationEmailData = {
  fullName: string;
  position: string;
  organisation: string;
  email: string;
};

// ─── Email Template ───────────────────────────────────────────────────────────

function buildConfirmationHtml(data: RegistrationEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Confirmed</title>
  <style>
    body { margin: 0; padding: 0; background: #f5f5f0; font-family: Georgia, serif; color: #1a1a1a; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #1a1a1a; }
    .header { background: #1a472a; padding: 36px 40px; text-align: center; }
    .header p { color: #ffffff; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 12px; }
    .header h1 { color: #ffffff; font-size: 22px; font-weight: bold; margin: 0; letter-spacing: 1px; text-transform: uppercase; }
    .body { padding: 40px; }
    .greeting { font-size: 17px; font-weight: bold; margin-bottom: 16px; }
    .body p { font-size: 14px; line-height: 1.8; color: #333333; margin: 0 0 16px; }
    .detail-block { border: 1px solid #1a1a1a; padding: 20px 24px; margin: 24px 0; background: #fafafa; }
    .detail-block h3 { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #1a472a; margin: 0 0 12px; }
    .detail-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid #e5e5e5; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #666666; font-weight: bold; }
    .detail-value { color: #1a1a1a; text-align: right; }
    .event-info { background: #1a472a; color: #ffffff; padding: 20px 24px; margin: 24px 0; }
    .event-info h3 { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #86efac; margin: 0 0 12px; }
    .event-info p { font-size: 13px; color: #d1fae5; margin: 4px 0; line-height: 1.6; }
    .footer { border-top: 1px solid #1a1a1a; padding: 24px 40px; background: #f9f9f6; text-align: center; }
    .footer p { font-size: 11px; color: #666666; margin: 4px 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Header -->
    <div class="header">
      <p>Nigeria Sub-National Investment & Tourism Information Summit</p>
      <h1>Registration Confirmed</h1>
    </div>

    <!-- Body -->
    <div class="body">
      <p class="greeting">Dear ${data.fullName},</p>
      <p>
        Thank you for registering for the <strong>Nigeria Sub-National Investment and Tourism
        Information Summit</strong> — featuring the launch of <em>Book Nigeria</em>.
        Your registration has been received and confirmed.
      </p>
      <p>
        We look forward to welcoming you to this landmark event. Please find a summary
        of your registration details below.
      </p>

      <!-- Registration Details -->
      <div class="detail-block">
        <h3>Your Registration Details</h3>
        <div class="detail-row">
          <span class="detail-label">Full Name</span>
          <span class="detail-value">${data.fullName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Position</span>
          <span class="detail-value">${data.position}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Organisation</span>
          <span class="detail-value">${data.organisation}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">${data.email}</span>
        </div>
      </div>

      <!-- Event Details -->
      <div class="event-info">
        <h3>Event Information</h3>
        <p>📅 <strong>Date:</strong> June 17, 2026</p>
        <p>🕙 <strong>Time:</strong> 10:00 AM – 1:00 PM</p>
        <p>📍 <strong>Venue:</strong> Conference Hall, Presidential Villa, Abuja</p>
      </div>

      <p>
        If you have any questions prior to the event, please do not hesitate to
        reach out to the summit secretariat using the contact details below.
      </p>
      <p>We look forward to seeing you there.</p>
      <p>
        Warm regards,<br />
        <strong>The Summit Secretariat</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Block C 8th Floor C807–C816, Federal Secretariat Complex, Phase II</p>
      <p>Shehu Shagari Way, Abuja, Nigeria</p>
      <p>Tel: +234 803 704 1001</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ─── Send Function ────────────────────────────────────────────────────────────

/**
 * Send a registration confirmation email to the registrant.
 */
export async function sendConfirmationEmail(data: RegistrationEmailData): Promise<void> {
  const html = buildConfirmationHtml(data);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? "Summit Secretariat <no-reply@example.com>",
    to: data.email,
    subject: "Registration Confirmed – Nigeria Sub-National Investment & Tourism Summit",
    html,
    // Plain-text fallback for email clients that don't render HTML
    text: [
      `Dear ${data.fullName},`,
      ``,
      `Your registration for the Nigeria Sub-National Investment and Tourism Information Summit has been confirmed.`,
      ``,
      `Registration Details:`,
      `  Name:         ${data.fullName}`,
      `  Position:     ${data.position}`,
      `  Organisation: ${data.organisation}`,
      `  Email:        ${data.email}`,
      ``,
      `Event Details:`,
      `  Date:  June 17, 2026`,
      `  Time:  10:00 AM – 1:00 PM`,
      `  Venue: Conference Hall, Presidential Villa, Abuja`,
      ``,
      `Regards,`,
      `The Summit Secretariat`,
      `Tel: +234 803 704 1001`,
    ].join("\n"),
  });
}
