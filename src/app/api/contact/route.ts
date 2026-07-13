import { NextResponse } from "next/server";
import { notifyCompany } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.name || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await notifyCompany("Contact Message", data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
