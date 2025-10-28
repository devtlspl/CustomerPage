import { MenuIcon, BellIcon, SearchIcon } from "../ui/Icons";

type TopbarProps = {
  onMenuToggle: () => void;
};

const Topbar = ({ onMenuToggle }: TopbarProps) => (
  <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-4 bg-white/40 px-6 py-4 backdrop-blur-22 sm:px-10 lg:px-12 xl:px-16">
    <button
      type="button"
      onClick={onMenuToggle}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/40 shadow-glass-sm backdrop-blur-22 hover:bg-white/60 lg:hidden"
      aria-label="Toggle navigation"
    >
      <MenuIcon className="h-5 w-5 text-text-primary" />
    </button>
    <div className="flex flex-1 items-center justify-between gap-4">
      <div className="relative hidden max-w-md flex-1 items-center sm:flex">
        <SearchIcon className="pointer-events-none absolute left-4 h-5 w-5 text-text-secondary/70" />
        <input
          type="search"
          placeholder="Search assets, invoices or support..."
          className="w-full rounded-full bg-white/60 py-3 pl-12 pr-4 text-sm text-text-primary shadow-inner shadow-white/40 outline-none ring-1 ring-white/40 placeholder:text-text-secondary/70 focus:bg-white focus:ring-2 focus:ring-accent-primary/60"
        />
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/60 shadow-glass-sm transition hover:bg-white">
          <BellIcon className="h-5 w-5 text-text-primary" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-accent-secondary shadow-[0_0_0_3px_rgba(255,255,255,0.7)]" />
        </button>
        <div className="flex items-center gap-3 rounded-full bg-white/60 px-3 py-1 shadow-glass-sm">
          <div className="relative h-11 w-11">
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-secondary/60 to-accent-tertiary/60 blur-md" />
            <img
              className="relative h-full w-full rounded-full object-cover"
              src="https://i.pravatar.cc/100?img=13"
              alt="Alex"
            />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Welcome back</p>
            <p className="text-sm font-semibold text-text-primary">Alex Morgan</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Topbar;
