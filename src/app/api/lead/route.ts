import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // Honeypot — silently accept so bots think it worked
    const website = String(body.website ?? "").trim();
    if (website) return NextResponse.json({ ok: true });

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const reason = String(body.reason ?? "").trim();
    const message = String(body.message ?? "").trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Name is required";
    if (!EMAIL_RE.test(email)) errors.email = "A valid email is required";
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const lead = await db.lead.create({
      data: {
        name: name.slice(0, 120),
        email: email.slice(0, 160),
        phone: phone ? phone.slice(0, 40) : null,
        reason: reason ? reason.slice(0, 80) : null,
        message: message ? message.slice(0, 600) : null,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[api/lead] failed:", err);
    return NextResponse.json({ ok: false, error: "Failed to save lead" }, { status: 500 });
  }
}
