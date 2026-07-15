"use client";

import { useState } from "react";
import { RATES } from "@/lib/rates";

// Interactive earnings estimator for the owner-operator funnel.
// Mirrors the real settlement math line by line, all program values
// come from lib/rates.ts so a rate change updates this automatically.
export default function PoolCalculator() {
  const [grossPerWeek, setGrossPerWeek] = useState(6000);
  const [includeEscrow, setIncludeEscrow] = useState(false);

  const split = RATES.grossRevenueSplit / 100;
  const factoring = RATES.factoringPercent / 100;
  const escrowWeekly = RATES.escrow.weeklyDeduction;
  const escrowWeeks = Math.ceil(RATES.escrow.maxCap / escrowWeekly);

  // Same order as the settlement sheet: factoring comes off gross first,
  // then the split; escrow is withheld only until the cap is reached.
  const factoringFee = grossPerWeek * factoring;
  const basis = grossPerWeek - factoringFee;
  const splitWeekly = basis * split;
  const weekly = splitWeekly - (includeEscrow ? escrowWeekly : 0);
  // Annual: escrow stops at the cap, so at most the cap comes out of a full year.
  const yearly = splitWeekly * 50 - (includeEscrow ? RATES.escrow.maxCap : 0);

  const usd = (n: number) =>
    `$${Math.round(n).toLocaleString("en-US")}`;

  return (
    <div className="rounded-xl bg-white p-6 shadow-card md:p-8">
      <h3 className="font-heading text-xl font-extrabold uppercase text-brand-navy">
        Estimate Your Settlement
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Drag to your average weekly gross, then follow the same line items you&apos;ll see on your settlement sheet.
      </p>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <span className="field-label !mb-0">Weekly gross freight revenue</span>
          <span className="font-heading text-2xl font-extrabold text-brand-blue">
            ${grossPerWeek.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={3000}
          max={12000}
          step={250}
          value={grossPerWeek}
          onChange={(e) => setGrossPerWeek(Number(e.target.value))}
          className="mt-3 w-full accent-brand-red"
          aria-label="Weekly gross freight revenue"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>$3,000</span>
          <span>$12,000</span>
        </div>
      </div>

      {/* Line-by-line settlement math */}
      <div className="mt-6 divide-y divide-slate-100 rounded-lg border border-slate-200 text-sm">
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="text-slate-600">Gross freight revenue</span>
          <span className="font-bold text-brand-navy">{usd(grossPerWeek)}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="text-slate-600">− Factoring fee ({RATES.factoringPercent}%, Addendum C)</span>
          <span className="font-bold text-brand-red">−{usd(factoringFee)}</span>
        </div>
        <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5">
          <span className="text-slate-600">= Rated revenue basis</span>
          <span className="font-bold text-brand-navy">{usd(basis)}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="text-slate-600">× Your split ({RATES.grossRevenueSplit}%)</span>
          <span className="font-bold text-emerald-600">{usd(splitWeekly)}</span>
        </div>
        {includeEscrow && (
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-slate-600">
              − Escrow (${escrowWeekly}/week, first {escrowWeeks} weeks only)
            </span>
            <span className="font-bold text-brand-red">−{usd(escrowWeekly)}</span>
          </div>
        )}
      </div>

      <label className="mt-3 flex items-center gap-2.5 text-xs font-semibold text-slate-600">
        <input
          type="checkbox"
          checked={includeEscrow}
          onChange={(e) => setIncludeEscrow(e.target.checked)}
          className="h-4 w-4 accent-brand-red"
        />
        Include the ${escrowWeekly}/week escrow withholding (stops at the ${RATES.escrow.maxCap.toLocaleString()} cap,
        returned with interest when your lease ends)
      </label>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Your weekly settlement*</p>
          <p className="mt-1 font-heading text-3xl font-extrabold text-brand-red">
            {usd(weekly)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            paid within {RATES.settlementDays} business days
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">≈ Annual (50 weeks)*</p>
          <p className="mt-1 font-heading text-3xl font-extrabold text-brand-navy">
            {usd(yearly)}
          </p>
          <p className="mt-1 text-xs text-slate-400">before your operating costs</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border-2 border-dashed border-brand-blue/40 bg-brand-blue/5 p-4 text-center">
        <p className="text-sm font-semibold text-brand-navy">
          <span className="font-heading font-extrabold text-brand-blue">+ Year {RATES.revenuePool.qualifyingYears}:</span>{" "}
          qualify for the {RATES.revenuePool.percent}% net revenue share pool, paid monthly, on top of everything above.
        </p>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
        *Illustration only, matching the settlement order in your lease: gross − {RATES.factoringPercent}% factoring
        (Addendum C), × {RATES.grossRevenueSplit}% split{includeEscrow ? ", − escrow withholding" : ""}. Fuel, insurance,
        and hardware deductions vary by operator and are itemized on your weekly settlement sheet. Program details and
        five-year service eligibility subject to terms and conditions.
      </p>
    </div>
  );
}
