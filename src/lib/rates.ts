// ================================================================
// ⭐ RATES & PROGRAM NUMBERS, THE ONLY FILE YOU EDIT TO CHANGE A PRICE
// ================================================================
// Every rate, fee, percentage, and timeline shown anywhere on the
// website OR inside the online onboarding forms comes from this file.
// Change a value here → the whole site + forms update automatically.
// ================================================================

export const RATES = {
  // Owner-operator compensation
  grossRevenueSplit: 89.5, // % of gross freight revenue paid to the owner-operator
  settlementDays: 4, // business days to settlement after paperwork submission

  // 20% Revenue Share Pool program
  revenuePool: {
    percent: 20, // % of company net revenue shared
    qualifyingYears: 5, // years of continuous service to qualify
    maxServiceGapMonths: 2, // max cumulative service gap in any rolling 24-month window
    payoutDaysAfterMonthClose: 15, // days after month close for pool payouts
    maintenanceGraceMonths: 3, // grace period for mechanical repairs
    invoiceSubmitBusinessDays: 10, // days to submit repair invoice for grace period
  },

  // Escrow (49 CFR § 376.12(k))
  escrow: {
    weeklyDeduction: 250, // $ per week deducted until cap
    maxCap: 2500, // $ escrow cap
    refundDays: 45, // days to return escrow after lease termination
  },

  // Invoice factoring (Addendum C)
  factoringPercent: 3, // % of gross freight revenue per load

  // Hardware (Addendum A), set the $ amounts when finalized
  eld: {
    subscriptionFee: null as number | null, // $ per month (null = "per current schedule")
    dashcamFee: null as number | null, // $ per month
    hardwareDeposit: null as number | null, // one-time $
    returnDays: 14, // days to return hardware after termination
  },

  // Paperwork
  bolSubmitHours: 24, // hours to submit BOL/POD after load completion

  // Lease terms
  terminationNoticeDays: 30, // written notice days
  ndaSurvivalYears: 2, // NDA survival after lease termination
} as const;

// Convenience formatted strings used across the site
export const FMT = {
  split: `${RATES.grossRevenueSplit}%`,
  pool: `${RATES.revenuePool.percent}%`,
  poolYears: `${RATES.revenuePool.qualifyingYears} years`,
  settlement: `${RATES.settlementDays} business days`,
  escrowWeekly: `$${RATES.escrow.weeklyDeduction}/week`,
  escrowCap: `$${RATES.escrow.maxCap.toLocaleString()}`,
  factoring: `${RATES.factoringPercent}%`,
} as const;
