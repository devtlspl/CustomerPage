import { PropsWithChildren, useState } from "react";
import SidebarNav from "./SidebarNav";
import Topbar from "./Topbar";

type LayoutShellProps = PropsWithChildren<{
  userEmail?: string;
  onLogout?: () => void;
}>;

const LayoutShell = ({ children, userEmail, onLogout }: LayoutShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col lg:ml-64">
        <Topbar
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          userEmail={userEmail}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-y-auto px-6 pb-12 pt-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutShell;
