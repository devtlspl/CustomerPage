type IconProps = {
  className?: string;
};

export const ChartBarIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M5 20V10M12 20V4M19 20v-8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Squares2X2Icon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="4" y="4" width="7" height="7" rx="1.5" strokeWidth="1.8" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" strokeWidth="1.8" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" strokeWidth="1.8" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" strokeWidth="1.8" />
  </svg>
);

export const DocumentDuplicateIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M9 4h7l4 4v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 8v10a2 2 0 0 0 2 2h9" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const WalletIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="5" width="18" height="14" rx="3" strokeWidth="1.8" />
    <path d="M17 12.5h1.5" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const LifebuoyIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
    <path d="M5.6 5.6 9 9m6 6 3.4 3.4M15 9l3.4-3.4M9 15 5.6 18.4" strokeWidth="1.8" />
  </svg>
);

export const BellIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M18 13V9a6 6 0 1 0-12 0v4l-1.5 2.5h15L18 13z"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 18a2 2 0 0 0 4 0" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const SearchIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="6" strokeWidth="1.8" />
    <path d="m20 20-3-3" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
