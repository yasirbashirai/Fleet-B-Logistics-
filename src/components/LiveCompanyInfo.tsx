"use client";

// On static (Hostinger) builds, fetches the owner-editable settings from the
// PHP api and swaps any changed phone/email/address/hours into the rendered
// page — so /admin edits show live without rebuilding the site.
// On Vercel builds NEXT_PUBLIC_FORM_API is /api, so this is a no-op.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/company";

const API = process.env.NEXT_PUBLIC_FORM_API || "/api";

type LiveSettings = {
  phone?: string;
  phoneHref?: string;
  email?: string;
  emailHref?: string;
  address?: string;
  hours?: string;
};

let cached: LiveSettings | null | undefined;

async function loadSettings(): Promise<LiveSettings | null> {
  if (cached !== undefined) return cached;
  try {
    const res = await fetch(`${API}/settings`, { cache: "no-store" });
    cached = res.ok ? ((await res.json()) as LiveSettings) : null;
  } catch {
    cached = null;
  }
  return cached;
}

function applySettings(s: LiveSettings) {
  const swaps: Array<[string, string]> = [];
  if (s.phone && s.phone !== COMPANY.phone) swaps.push([COMPANY.phone, s.phone]);
  if (s.email && s.email !== COMPANY.email) swaps.push([COMPANY.email, s.email]);
  if (s.address && s.address !== COMPANY.address.full) swaps.push([COMPANY.address.full, s.address]);
  if (s.hours && s.hours !== COMPANY.hours) swaps.push([COMPANY.hours, s.hours]);

  if (s.phoneHref && s.phoneHref !== COMPANY.phoneHref) {
    document.querySelectorAll<HTMLAnchorElement>(`a[href="${COMPANY.phoneHref}"]`).forEach((a) => {
      a.href = s.phoneHref!;
    });
  }
  if (s.emailHref && s.emailHref !== COMPANY.emailHref) {
    document.querySelectorAll<HTMLAnchorElement>(`a[href="${COMPANY.emailHref}"]`).forEach((a) => {
      a.href = s.emailHref!;
    });
  }
  if (!swaps.length) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    let text = node.nodeValue || "";
    let changed = false;
    for (const [oldValue, newValue] of swaps) {
      if (text.includes(oldValue)) {
        text = text.split(oldValue).join(newValue);
        changed = true;
      }
    }
    if (changed) node.nodeValue = text;
  }
}

export default function LiveCompanyInfo() {
  const pathname = usePathname();

  useEffect(() => {
    if (!API.includes("php-api")) return;
    let cancelled = false;
    loadSettings().then((s) => {
      if (!cancelled && s) applySettings(s);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
