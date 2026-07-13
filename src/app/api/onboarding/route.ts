import { NextResponse } from "next/server";
import { notifyCompany } from "@/lib/mailer";

// Online onboarding kit submission: the full signed kit data is emailed
// to the company as a structured document for the driver's file.
export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.fullLegalName || !data.email || !data.signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await notifyCompany("SIGNED Onboarding Kit Submission", data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[onboarding]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
