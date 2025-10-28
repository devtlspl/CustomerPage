import { useMemo, useState } from "react";
import clsx from "clsx";
import GlassCard from "../components/ui/GlassCard";

type DocStatus = "Paid" | "Pending" | "Overdue";

type DocumentItem = {
  id: string;
  date: string;
  amount: string;
  status: DocStatus;
  reference: string;
  description: string;
};

const invoices: DocumentItem[] = [
  {
    id: "INV-1048",
    date: "Aug 22, 2024",
    amount: "$18,240",
    status: "Paid",
    reference: "Asset leasing - Q3",
    description: "Settled via ACH - Ref #ACH-2213"
  },
  {
    id: "INV-1049",
    date: "Aug 28, 2024",
    amount: "$12,890",
    status: "Pending",
    reference: "Maintenance package",
    description: "Awaiting approval - Due in 5 days"
  },
  {
    id: "INV-1053",
    date: "Sep 2, 2024",
    amount: "$26,400",
    status: "Overdue",
    reference: "Field deployment rollout",
    description: "3 days past due - Late fee applies Sep 7"
  }
];

const challans: DocumentItem[] = [
  {
    id: "DC-2201",
    date: "Aug 18, 2024",
    amount: "6 pallets",
    status: "Paid",
    reference: "Vision Fleet delivery",
    description: "Signed by Alex Morgan - Received 10:30 AM"
  },
  {
    id: "DC-2202",
    date: "Aug 29, 2024",
    amount: "12 units",
    status: "Pending",
    reference: "Nimbus drone replenishment",
    description: "Awaiting confirmation at Houston Hub"
  }
];

const statusStyles: Record<DocStatus, string> = {
  Paid: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
  Overdue: "bg-danger/15 text-danger"
};

const tabOptions = [
  { label: "Invoices", value: "invoices" },
  { label: "Delivery Challans", value: "challans" }
] as const;

const filterOptions = ["All", "Paid", "Pending", "Overdue"] as const;

const InvoicesPage = () => {
  const [tab, setTab] = useState<(typeof tabOptions)[number]["value"]>("invoices");
  const [filter, setFilter] = useState<(typeof filterOptions)[number]>("All");

  const data = tab === "invoices" ? invoices : challans;
  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        filter === "All" ? true : item.status.toLowerCase() === filter.toLowerCase()
      ),
    [data, filter]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Invoices & Delivery Challans</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Track billing documents, their statuses, and historical delivery milestones.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-full bg-white/60 px-3 py-2 shadow-glass-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-text-secondary">Timeline View</p>
          <button className="rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-xs font-semibold text-white">
            Export
          </button>
        </div>
      </div>

      <GlassCard className="rounded-3xl">
        <div className="flex flex-wrap justify-between gap-4 border-b border-white/40 px-8 pb-5 pt-6">
          <div className="inline-flex items-center rounded-full bg-white/60 p-1">
            {tabOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTab(option.value)}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  tab === option.value
                    ? "bg-gradient-to-r from-accent-primary to-accent-tertiary text-white shadow-glass-sm"
                    : "text-text-secondary"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={clsx(
                  "rounded-full px-3 py-2 text-xs font-semibold transition",
                  filter === option
                    ? "bg-gradient-to-r from-accent-secondary to-accent-primary text-white"
                    : "bg-white/50 text-text-secondary"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 p-8 lg:grid-cols-2">
          {filteredData.map((item) => (
            <DocumentCard key={item.id} item={item} />
          ))}
        </div>
      </GlassCard>

      <TimelineSection />
    </div>
  );
};

const DocumentCard = ({ item }: { item: DocumentItem }) => (
  <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-glass-sm backdrop-blur-22 transition hover:-translate-y-1 hover:shadow-xl">
    <span className="absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b from-accent-primary to-accent-tertiary" />
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xl font-semibold text-text-primary">{item.id}</p>
        <p className="mt-1 text-sm text-text-secondary">{item.reference}</p>
      </div>
      <span className={clsx("rounded-full px-3 py-1 text-xs font-semibold", statusStyles[item.status])}>
        {item.status}
      </span>
    </div>
    <div className="mt-5 flex items-center justify-between text-sm text-text-secondary">
      <p>{item.date}</p>
      <p className="text-lg font-semibold text-text-primary">{item.amount}</p>
    </div>
    <p className="mt-4 text-sm text-text-secondary/90">{item.description}</p>
    <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-accent-primary">
      <button className="rounded-full border border-white/60 px-4 py-2 hover:bg-white/60">
        View document
      </button>
      <button className="rounded-full border border-transparent px-4 py-2 hover:text-accent-tertiary">
        Download
      </button>
    </div>
  </div>
);

const timelineEvents = [
  {
    title: "Invoice #1048 settled",
    date: "Aug 22, 2024",
    description: "Payment confirmed via Aurora Treasury.",
    tone: "success"
  },
  {
    title: "Delivery challan #2201 signed",
    date: "Aug 18, 2024",
    description: "Asset deployment completed at Austin DC.",
    tone: "info"
  },
  {
    title: "Reminder issued for invoice #1053",
    date: "Sep 4, 2024",
    description: "Automated reminder sent to finance contact.",
    tone: "warning"
  }
] as const;

const toneColor = {
  success: "from-success to-accent-secondary",
  info: "from-accent-primary to-accent-tertiary",
  warning: "from-warning to-danger"
};

const TimelineSection = () => (
  <GlassCard className="rounded-3xl p-8">
    <h2 className="text-lg font-semibold text-text-primary">Document Timeline</h2>
    <div className="mt-6 space-y-6 border-l border-white/40 pl-6">
      {timelineEvents.map((event) => (
        <div key={event.title} className="relative pl-4">
            <span
              className={clsx(
                "absolute -left-8 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-glass-sm",
                toneColor[event.tone]
              )}
          >
            o
          </span>
          <p className="text-sm font-semibold text-text-primary">{event.title}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-text-secondary/80">{event.date}</p>
          <p className="mt-2 text-sm text-text-secondary">{event.description}</p>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default InvoicesPage;
