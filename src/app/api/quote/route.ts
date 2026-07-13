import { NextResponse } from "next/server";
import { notifyCompany } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await notifyCompany("Freight Quote Request", data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
