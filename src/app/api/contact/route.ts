import { NextResponse } from "next/server";

/**
 * Contact form endpoint — STUB.
 * ------------------------------------------------------------------
 * This currently validates the payload and logs it. Nothing is emailed.
 *
 * To make it live, add an email provider. With Resend:
 *   1. pnpm add resend
 *   2. Set RESEND_API_KEY in .env.local
 *   3. Replace the console.log below with a send call to site.email
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    // Basic honeypot-free sanity check on email shape
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    console.log("[contact] new enquiry", {
      name,
      email,
      phone: body.phone ?? null,
      interest: body.interest ?? null,
      property: body.property ?? null,
      message: message ?? null,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not process request." }, { status: 500 });
  }
}
