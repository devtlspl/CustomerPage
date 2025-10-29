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
  { name: "Documents", to: "/documents", Icon: DocumentDuplicateIcon },
  { name: "Payments", to: "/payments", Icon: WalletIcon },
  { name: "Support", to: "/support", Icon: LifebuoyIcon }
];

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
          <div className="fixed inset-0 bg-slate-900/45" />
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
            <Dialog.Panel className="relative flex w-64 flex-col bg-white shadow-2xl">
              <SidebarContent onLinkClick={onClose} />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    <aside
      className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white"
      aria-label="Sidebar"
    >
      <SidebarContent />
    </aside>
  </>
);

type SidebarContentProps = {
  onLinkClick?: () => void;
};

const SidebarContent = ({ onLinkClick }: SidebarContentProps) => (
  <div className="flex h-full flex-col">
    <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
      <div className="rounded-md bg-slate-900 p-2 text-white">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 5h7l-2 6h6l-4 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Aurora</p>
        <p className="text-lg font-semibold text-slate-900">Customer Hub</p>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-4 py-6">
      <nav className="space-y-1">
        {navigation.map((item) => (
          <SidebarLink key={item.name} item={item} onLinkClick={onLinkClick} />
        ))}
      </nav>

    </div>

    <div className="border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
      <p className="font-semibold text-slate-700">Aurora support</p>
      <p className="mt-1">support@aurora.com</p>
      <p>+1 (800) 555-2199</p>
    </div>
  </div>
);

const SidebarLink = ({
  item,
  onLinkClick
}: {
  item: (typeof navigation)[number];
  onLinkClick?: () => void;
}) => (
  <NavLink
    to={item.to}
    className={({ isActive }) =>
      clsx(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )
    }
    onClick={onLinkClick}
  >
    {({ isActive }) => (
      <>
        <span
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors",
            isActive ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-600"
          )}
        >
          <item.Icon className="h-5 w-5" />
        </span>
        <span>{item.name}</span>
      </>
    )}
  </NavLink>
);

export default SidebarNav;
