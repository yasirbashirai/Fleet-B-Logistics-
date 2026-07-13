// Lightweight inline SVG icon set (stroke style, logistics-grade)
export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
  switch (name) {
    case "truck":
      return (
        <svg {...common}>
          <path d="M1 8h13v8H1zM14 11h4l4 3v2h-8z" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="19" r="3" />
          <circle cx="18" cy="5" r="3" />
          <path d="M9 19h6a3.5 3.5 0 0 0 0-7h-6a3.5 3.5 0 0 1 0-7h6" />
        </svg>
      );
    case "box":
      return (
        <svg {...common}>
          <path d="M21 8v10a1 1 0 0 1-.6.9l-8 3.5a1 1 0 0 1-.8 0l-8-3.5A1 1 0 0 1 3 18V8" />
          <path d="M3 8l9-4.5L21 8l-9 4.5z" />
          <path d="M12 12.5V22" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 22s7-5.3 7-12a7 7 0 1 0-14 0c0 6.7 7 12 7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "dollar":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v12M15.5 9a3 3 0 0 0-3.5-1.5c-1.7 0-3 .9-3 2.25S10.3 12 12 12s3 .9 3 2.25-1.3 2.25-3 2.25A3 3 0 0 1 8.5 15" />
        </svg>
      );
    case "fuel":
      return (
        <svg {...common}>
          <path d="M4 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" />
          <path d="M2 22h14M14 10h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9l-3-3" />
          <path d="M7 7h4v4H7z" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h6" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
      );
    case "star":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "wheel":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      );
    case "badge":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="6" />
          <path d="m8.5 14-2 8 5.5-3 5.5 3-2-8" />
        </svg>
      );
    default:
      return null;
  }
}
