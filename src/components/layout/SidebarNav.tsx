import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  DocumentDuplicateIcon,
  LifebuoyIcon,
  Squares2X2Icon,
  WalletIcon
} from "../ui/Icons";
import clsx from "clsx";

type SidebarNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigation = [
  { name: "Dashboard", to: "/dashboard", Icon: ChartBarIcon },
  { name: "Assets", to: "/assets", Icon: Squares2X2Icon },
  { name: "Invoices & DC", to: "/documents", Icon: DocumentDuplicateIcon },
  { name: "Payments", to: "/payments", Icon: WalletIcon },
  { name: "Support", to: "/support", Icon: LifebuoyIcon }
];

const SidebarLink = ({ name, to, Icon }: (typeof navigation)[number]) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        "group flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-all",
        "hover:bg-white/20 hover:shadow-glass-sm",
        isActive
          ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-glass"
          : "text-text-secondary"
      )
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-full transition-all",
            isActive
              ? "bg-white/20 text-white"
              : "bg-white/30 text-accent-primary group-hover:bg-white/50"
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span>{name}</span>
      </>
    )}
  </NavLink>
);

const SidebarNav = ({ isOpen, onClose }: SidebarNavProps) => (
  <>
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-200 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="glass-panel relative m-4 flex w-72 flex-col gap-6 rounded-2xl p-6">
              <Logo />
              <nav className="flex flex-1 flex-col gap-2">
                {navigation.map((item) => (
                  <SidebarLink key={item.name} {...item} />
                ))}
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    <aside
      className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:gap-8 lg:bg-transparent"
      aria-label="Sidebar"
    >
      <div className="glass-panel m-6 flex flex-1 flex-col gap-8 rounded-2xl p-6">
        <Logo />
        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map((item) => (
            <SidebarLink key={item.name} {...item} />
          ))}
        </nav>
        <div className="rounded-2xl bg-gradient-to-br from-accent-secondary/20 to-accent-tertiary/30 p-4 text-xs text-text-secondary">
          <p className="font-semibold text-text-primary">Need help?</p>
          <p className="mt-1 leading-5">
            Our success team is available 24/7 to assist with onboarding and custom
            integrations.
          </p>
          <button className="mt-4 inline-flex items-center justify-center rounded-full bg-white/30 px-4 py-2 text-xs font-semibold text-accent-primary hover:bg-white/40">
            Contact us
          </button>
        </div>
      </div>
    </aside>
  </>
);

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative flex h-11 w-11 items-center justify-center">
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-primary/70 to-accent-tertiary/70 blur-md" />
      <span className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white/50 backdrop-blur-22">
        <svg
          className="h-6 w-6 text-accent-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M5 5h7l-2 6h6l-4 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-text-secondary">Aurora</p>
      <p className="text-lg font-semibold text-text-primary">Client Portal</p>
    </div>
  </div>
);

export default SidebarNav;
