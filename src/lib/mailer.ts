import nodemailer from "nodemailer";
import { COMPANY, SITE_URL } from "./company";
import { RATES } from "./rates";

// SMTP config via env vars (see .env.example). If SMTP is not configured,
// submissions are logged to the server console instead of failing,
// set the env vars in production to activate real email delivery.
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const FROM = () => process.env.SMTP_FROM || `"${COMPANY.shortName}" <${process.env.SMTP_USER}>`;
const NOTIFY_TO = () => process.env.NOTIFY_EMAIL || COMPANY.email;

export async function sendMail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const transport = getTransport();
  if (!transport) {
    console.log("[FBL mailer] SMTP not configured, would have sent:", {
      to: opts.to,
      subject: opts.subject,
    });
    return { queued: false };
  }
  await transport.sendMail({ from: FROM(), ...opts });
  return { queued: true };
}

/* ---------- shared email shell ---------- */
function shell(title: string, inner: string) {
  return `
  <div style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#101c2e;padding:20px 28px;">
        <span style="display:inline-block;background:#ed1d26;color:#fff;font-weight:800;font-size:22px;letter-spacing:1px;padding:6px 14px;border-radius:4px;">FBL</span>
        <span style="color:#ffffff;font-weight:700;font-size:14px;letter-spacing:2px;margin-left:10px;">FLEET B LOGISTICS LLC</span>
      </div>
      <div style="height:4px;background:linear-gradient(90deg,#ed1d26,#ff4d54);"></div>
      <div style="padding:28px;color:#1a2333;font-size:14px;line-height:1.7;">
        <h1 style="font-size:20px;margin:0 0 16px;color:#101c2e;">${title}</h1>
        ${inner}
      </div>
      <div style="background:#101c2e;color:#94a3b8;padding:18px 28px;font-size:12px;line-height:1.6;">
        <strong style="color:#ffffff;">${COMPANY.name}</strong>, “${COMPANY.tagline}”<br/>
        ${COMPANY.address.full}<br/>
        ${COMPANY.phone} · ${COMPANY.email} · USDOT #${COMPANY.usdot} · MC #${COMPANY.mc}
      </div>
    </div>
  </div>`;
}

function rows(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:700;text-transform:capitalize;white-space:nowrap;">${k
          .replace(/([A-Z])/g, " $1")
          .trim()}</td><td style="padding:6px 10px;border:1px solid #e2e8f0;">${String(v)
          .replace(/</g, "&lt;")
          .replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");
}

/* ---------- internal notification of any form submission ---------- */
export async function notifyCompany(kind: string, data: Record<string, unknown>) {
  return sendMail({
    to: NOTIFY_TO(),
    subject: `🚛 New ${kind}, ${COMPANY.abbr} website`,
    replyTo: typeof data.email === "string" ? data.email : undefined,
    html: shell(
      `New ${kind} from the website`,
      `<table style="border-collapse:collapse;width:100%;font-size:13px;">${rows(data)}</table>`
    ),
  });
}

/* ---------- automated Owner-Operator welcome letter ---------- */
// Sent immediately after the apply/contact form is completed, exactly as
// requested: the welcome letter + where to find / how to sign the kit.
export async function sendWelcomeLetter(to: string, firstName: string) {
  const kitUrl = `${SITE_URL}/owner-operators#onboarding`;
  const pdfUrl = `${SITE_URL}/documents/fbl-owner-operator-onboarding-kit.pdf`;
  return sendMail({
    to,
    subject: `Welcome to Fleet B Logistics, Your Onboarding Kit Inside 🚛`,
    html: shell(
      `Welcome to Fleet B Logistics!`,
      `
      <p>Dear ${firstName || "Owner-Operator"},</p>
      <p><strong>Welcome to Fleet B Logistics LLC!</strong> We are thrilled to partner with you as an independent
      contractor. Our mission is to support your business growth by providing consistent, high-paying freight,
      operational independence, and total back-office transparency.</p>
      <p>As a valued partner on our fleet, you can count on us to keep your wheels turning and your revenue growing.
      We take pride in our rapid payment structure, processing your settlements within
      <strong>${RATES.settlementDays} business days</strong> of receiving your delivery paperwork, and you keep
      <strong>${RATES.grossRevenueSplit}% of gross freight revenue</strong> on every load.</p>
      <p>We are fully committed to long-term success together: we look forward to working with you toward your
      <strong>${RATES.revenuePool.qualifyingYears}-year milestone</strong>, where you will gain exclusive entry into our
      <strong>${RATES.revenuePool.percent}% monthly net revenue share pool</strong>.</p>

      <div style="background:#f8fafc;border:2px dashed #29689a;border-radius:8px;padding:18px 22px;margin:22px 0;">
        <p style="margin:0 0 10px;font-weight:800;color:#101c2e;font-size:15px;">📋 What happens next, your onboarding process:</p>
        <ol style="margin:0;padding-left:20px;">
          <li><strong>Complete the Onboarding Kit</strong>, fill it out and sign online here:<br/>
            <a href="${kitUrl}" style="color:#ed1d26;font-weight:700;">${kitUrl}</a><br/>
            (or download the PDF: <a href="${pdfUrl}" style="color:#29689a;">Owner-Operator Onboarding Kit</a>)</li>
          <li><strong>Gather your documents</strong>, CDL-A, DOT medical card, truck registration, Form 2290, annual inspection, and insurance certificate.</li>
          <li><strong>Schedule your truck inspection</strong> at our West Palm Beach HQ, call Safety at ${COMPANY.phone} at least 24 hours ahead.</li>
          <li><strong>First dispatch</strong>, once Safety clears your file, you're rolling.</li>
        </ol>
      </div>

      <p style="text-align:center;margin:26px 0;">
        <a href="${kitUrl}" style="background:#ed1d26;color:#ffffff;font-weight:800;text-decoration:none;padding:14px 30px;border-radius:6px;display:inline-block;">FILL OUT & SIGN THE KIT ONLINE →</a>
      </p>

      <p>Welcome aboard, let's achieve massive success together!</p>
      <p>Sincerely,<br/><strong>${COMPANY.owner.name}</strong><br/>${COMPANY.owner.title}<br/>${COMPANY.name}</p>
      `
    ),
  });
}
