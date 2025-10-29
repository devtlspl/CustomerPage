import { MenuIcon, BellIcon, SearchIcon } from "../ui/Icons";
import { useLocation } from "react-router-dom";

type TopbarProps = {
  onMenuToggle: () => void;
  userEmail?: string;
  onLogout?: () => void;
};

const ROUTE_METADATA: Record<
  string,
  { label: string; description: string; section: string }
> = {
  "/dashboard": {
    label: "Dashboard",
    description: "Monitor rental and sale asset health at a glance.",
    section: "Overview"
  },
  "/assets": {
    label: "Assets",
    description: "Track asset allocation, service timelines, and readiness.",
    section: "Operations"
  },
  "/documents": {
    label: "Invoices & Delivery Challans",
    description: "Review billing documents tied to customer deliveries.",
    section: "Finance"
  },
  "/payments": {
    label: "Payments",
    description: "Stay ahead of disbursements, approvals, and renewals.",
    section: "Finance"
  },
  "/support": {
    label: "Support",
    description: "Coordinate ticket workflows and asset returns.",
    section: "Service Desk"
  }
};

const Topbar = ({ onMenuToggle, userEmail, onLogout }: TopbarProps) => {
  const location = useLocation();
  const metadata =
    ROUTE_METADATA[location.pathname] ??
    ROUTE_METADATA[location.pathname.replace(/\/$/, "")] ??
    {
      label: "Aurora Customer Hub",
      description: "Manage your estate of rental and sale assets.",
      section: "Aurora"
    };

  const baseName = userEmail?.split("@")[0];
  const displayName = baseName
    ? baseName.replace(/\./g, " ").replace(/(^|\s)\S/g, (char) => char.toUpperCase())
    : "Aurora customer";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            {metadata.section}
          </p>
          <div className="mt-1 flex flex-wrap items-end gap-2">
            <h1 className="text-lg font-semibold text-slate-900">{metadata.label}</h1>
            <p className="text-sm text-slate-500">{metadata.description}</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search…"
              className="w-48 rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
          </button>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {userEmail ? userEmail.charAt(0).toUpperCase() : "A"}
            </span>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-medium text-slate-500">{displayName}</p>
              {userEmail && <p className="text-xs text-slate-400">{userEmail}</p>}
            </div>
          </div>
          {onLogout && (
            <button
              className="hidden rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 sm:block"
              onClick={onLogout}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
