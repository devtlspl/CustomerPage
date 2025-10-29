import { Fragment, ReactNode, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import GlassCard from "../components/ui/GlassCard";

type SupportAsset = {
  id: string;
  name: string;
  serial: string;
  type: string;
};

const supportAssets: SupportAsset[] = [
  { id: "AST-4010", name: "ThinkPad P14 Gen3", serial: "P14-8891", type: "Endpoint" },
  { id: "AST-4051", name: "Meraki MX105 Appliance", serial: "MX105-9932", type: "Network" },
  { id: "AST-4093", name: "MacBook Air M3", serial: "MBA3-2811", type: "Endpoint" },
  { id: "AST-4120", name: "Okta SSO Licenses", serial: "OKTA-0071", type: "SaaS" }
];

const supportActions = [
  {
    type: "contact" as const,
    title: "Contact support",
    description: "Reach the service desk through your preferred channel.",
    points: ["Start a live chat session", "Email our success engineers", "Book a callback time"],
    cta: "Open contact form"
  },
  {
    type: "ticket" as const,
    title: "Raise IT ticket",
    description: "Log incidents tied to your rental or sale assets.",
    points: ["Associate tickets with catalogued assets", "Auto-fill serial numbers", "Attach diagnostics for faster resolution"],
    cta: "Start ticket workflow"
  },
  {
    type: "return" as const,
    title: "Return IT asset",
    description: "Schedule logistics for rental returns or replacements.",
    points: ["Select the asset to collect", "Describe the return reason", "Upload inspection photos"],
    cta: "Arrange pickup"
  }
] as const;

const SupportPage = () => {
  const [activeModal, setActiveModal] = useState<"contact" | "ticket" | "return" | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const selectedAsset = useMemo(
    () => supportAssets.find((asset) => asset.id === selectedAssetId),
    [selectedAssetId]
  );

  const closeModal = () => setActiveModal(null);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">IT support</h1>
        <p className="mt-2 text-sm text-slate-600">
          Reach our team, open tickets, or arrange device returns without leaving this page.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        {supportActions.map((action) => (
          <GlassCard key={action.type} className="flex flex-col justify-between rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{action.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{action.description}</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {action.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-6 w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              onClick={() => setActiveModal(action.type)}
            >
              {action.cta}
            </button>
          </GlassCard>
        ))}
      </section>

      <GlassCard className="rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900">IT support history</h2>
        <div className="mt-6 space-y-4 border-l border-slate-200 pl-6 text-sm text-slate-600">
          {supportEvents.map((event) => (
            <div key={event.title} className="relative pl-4">
              <span className="absolute -left-8 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold uppercase tracking-wide text-white">
                {event.icon}
              </span>
              <p className="text-sm font-semibold text-slate-900">{event.title}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{event.date}</p>
              <p className="mt-2 text-sm">{event.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <SupportModal
        open={activeModal === "contact"}
        onClose={closeModal}
        title="Contact support"
        description="Choose the fastest path to reach the Aurora support desk."
      >
        <ContactSupportForm />
      </SupportModal>

      <SupportModal
        open={activeModal === "ticket"}
        onClose={closeModal}
        title="Raise IT ticket"
        description="Log an incident against your registered assets so our engineers have full context."
      >
        <RaiseTicketForm
          assets={supportAssets}
          selectedAssetId={selectedAssetId}
          onSelectAsset={setSelectedAssetId}
          selectedAsset={selectedAsset}
        />
      </SupportModal>

      <SupportModal
        open={activeModal === "return"}
        onClose={closeModal}
        title="Return IT asset"
        description="Schedule a pickup or swap for a rental asset. Logistics will confirm within 2 hours."
      >
        <ReturnAssetForm assets={supportAssets} />
      </SupportModal>
    </div>
  );
};

const supportEvents = [
  {
    title: "Ticket #8623 resolved",
    date: "Sep 1, 2024",
    description: "VPN latency investigation closed by Tier 2 Networking.",
    icon: "OK"
  },
  {
    title: "Laptop return scheduled",
    date: "Aug 25, 2024",
    description: "ThinkPad pickup confirmed for Aug 28, 2024 at 09:00 AM.",
    icon: "RT"
  },
  {
    title: "New MDM policy shared",
    date: "Aug 18, 2024",
    description: "Distributed guidance on least-privileged app access for macOS fleet.",
    icon: "IN"
  }
] as const;

export default SupportPage;

const priorityOptions = ["Low", "Normal", "High"] as const;

type SupportModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
};

const SupportModal = ({ open, onClose, title, description, children }: SupportModalProps) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-40" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
      </Transition.Child>

      <div className="fixed inset-0 z-40 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center px-4 py-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-xl font-semibold text-slate-900">{title}</Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-slate-600">
                    {description}
                  </Dialog.Description>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
              <div className="mt-6">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

const ContactSupportForm = () => (
  <form className="space-y-5 text-sm">
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Full name
        </label>
        <input
          type="text"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Alex Morgan"
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Email
        </label>
        <input
          type="email"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="alex@aurora.com"
        />
      </div>
    </div>
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Subject</label>
      <input
        type="text"
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="Quick summary"
      />
    </div>
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message</label>
      <textarea
        rows={4}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="How can we help today?"
      />
    </div>
    <div className="flex flex-wrap gap-3">
      <button className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
        Start live chat
      </button>
      <button className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
        Email support
      </button>
      <button className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
        Schedule call
      </button>
    </div>
  </form>
);

type RaiseTicketFormProps = {
  assets: SupportAsset[];
  selectedAssetId: string;
  onSelectAsset: (id: string) => void;
  selectedAsset?: SupportAsset;
};

const RaiseTicketForm = ({
  assets,
  selectedAssetId,
  onSelectAsset,
  selectedAsset
}: RaiseTicketFormProps) => {
  const [priority, setPriority] = useState<(typeof priorityOptions)[number]>("Normal");

  return (
    <form className="space-y-5 text-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Issue type
          </label>
          <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
            <option>Endpoint access</option>
            <option>Network connectivity</option>
            <option>Software licensing</option>
            <option>Billing discrepancy</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Related asset
          </label>
          <select
            value={selectedAssetId}
            onChange={(event) => onSelectAsset(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Select an asset</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} · {asset.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Priority
          </label>
          <div className="mt-2 flex gap-2">
            {priorityOptions.map((level) => {
              const active = priority === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPriority(level)}
                  className={`rounded-md border px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Asset serial (auto filled)
          </label>
          <input
            type="text"
            value={selectedAsset?.serial ?? ""}
            readOnly
            placeholder="Serial populates after you choose an asset"
            className="mt-2 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 focus:outline-none"
          />
          <p className="mt-1 text-xs text-slate-500">
            Serial numbers stay in sync with the asset catalog.
          </p>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Description
        </label>
        <textarea
          rows={4}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Provide as much detail as possible"
        />
      </div>

      <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-slate-600">
        <p>Attach logs, screenshots, or delivery challans</p>
        <p className="text-xs text-slate-400">PDF, DOCX, PNG up to 15MB</p>
      </div>

      <div className="flex justify-end gap-3">
        <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
          Save draft
        </button>
        <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Review ticket
        </button>
      </div>
    </form>
  );
};

type ReturnAssetFormProps = {
  assets: SupportAsset[];
};

const ReturnAssetForm = ({ assets }: ReturnAssetFormProps) => (
  <form className="space-y-5 text-sm">
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Asset</label>
        <select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200">
          <option value="">Select asset to return</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name} · {asset.id}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Preferred pickup date
        </label>
        <input
          type="date"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>
    </div>
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reason</label>
      <textarea
        rows={3}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="Explain the reason for return..."
      />
    </div>
    <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-slate-600">
      <p>Upload inspection photos or device diagnostics</p>
      <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
    </div>
    <div className="flex justify-end gap-3">
      <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
        Save draft
      </button>
      <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
        Schedule pickup
      </button>
    </div>
  </form>
);
