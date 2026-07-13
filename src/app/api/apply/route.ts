import { NextResponse } from "next/server";
import { notifyCompany, sendWelcomeLetter } from "@/lib/mailer";

// Owner-operator application:
// 1) notifies the company with the full application details
// 2) AUTOMATICALLY sends the applicant the welcome letter with the
//    onboarding-kit link + PDF (the automated flow requested).
export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const firstName = String(data.name).trim().split(/\s+/)[0];
    await Promise.all([
      notifyCompany("Owner-Operator Application", data),
      sendWelcomeLetter(String(data.email), firstName),
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[apply]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
