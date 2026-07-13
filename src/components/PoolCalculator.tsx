"use client";

import { useState } from "react";
import { RATES } from "@/lib/rates";

// Interactive earnings estimator for the owner-operator funnel.
// Illustrative math only, all program values come from lib/rates.ts.
export default function PoolCalculator() {
  const [grossPerWeek, setGrossPerWeek] = useState(6000);

  const split = RATES.grossRevenueSplit / 100;
  const factoring = RATES.factoringPercent / 100;

  const afterFactoring = grossPerWeek * (1 - factoring);
  const weekly = afterFactoring * split;
  const yearly = weekly * 50; // ~50 working weeks

  return (
    <div className="rounded-xl bg-white p-6 shadow-card md:p-8">
      <h3 className="font-heading text-xl font-extrabold uppercase text-brand-navy">
        Estimate Your Settlement
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Drag to your average weekly gross, see what the {RATES.grossRevenueSplit}% split means in real money.
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Your weekly settlement*</p>
          <p className="mt-1 font-heading text-3xl font-extrabold text-brand-red">
            ${Math.round(weekly).toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            paid within {RATES.settlementDays} business days
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">≈ Annual (50 weeks)*</p>
          <p className="mt-1 font-heading text-3xl font-extrabold text-brand-navy">
            ${Math.round(yearly).toLocaleString()}
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
        *Illustration only: gross × {100 - RATES.factoringPercent}% (after {RATES.factoringPercent}% factoring) ×{" "}
        {RATES.grossRevenueSplit}% split, before fuel, insurance, escrow, and hardware deductions itemized on your
        settlement sheet. Program details and five-year service eligibility subject to terms and conditions.
      </p>
    </div>
  );
}
