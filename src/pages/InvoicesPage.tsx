import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  fetchDocuments,
  type BusinessDocument,
  type DocumentStatus
} from "../services/documentsService";
const statusStyles: Record<DocumentStatus, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-700"
};

const tabOptions = [
  { label: "Invoices", value: "invoices" },
  { label: "Delivery Challans", value: "challans" }
] as const;

const filterOptions = ["All", "Paid", "Pending", "Overdue"] as const;

const InvoicesPage = () => {
  const [tab, setTab] = useState<(typeof tabOptions)[number]["value"]>("invoices");
  const [filter, setFilter] = useState<(typeof filterOptions)[number]>("All");
  const [invoices, setInvoices] = useState<BusinessDocument[]>([]);
  const [challans, setChallans] = useState<BusinessDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const loadDocuments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchDocuments();
        if (active) {
          setInvoices(response.invoices ?? []);
          setChallans(response.deliveryChallans ?? []);
        }
      } catch (err) {
        console.error("Failed to load documents", err);
        if (active) {
          setError("Unable to load invoices and delivery challans.");
          setInvoices([]);
          setChallans([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDocuments();

    return () => {
      active = false;
    };
  }, []);

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
      <HeaderSection error={error} />
      <DocumentSection
        tab={tab}
        onChangeTab={setTab}
        filter={filter}
        onChangeFilter={setFilter}
        data={filteredData}
        loading={loading}
      />
      <TimelineSection />
    </div>
  );
};

const HeaderSection = ({ error }: { error: string | null }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Invoices & Delivery Challans</h1>
        <p className="mt-2 text-sm text-slate-600">
          Review customer billing documents, filter by status, and download what you need in seconds.
        </p>
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </div>
      <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        Export summary
      </button>
    </div>
  </div>
);

type DocumentSectionProps = {
  tab: (typeof tabOptions)[number]["value"];
  onChangeTab: (value: (typeof tabOptions)[number]["value"]) => void;
  filter: (typeof filterOptions)[number];
  onChangeFilter: (value: (typeof filterOptions)[number]) => void;
  data: BusinessDocument[];
  loading: boolean;
};

const DocumentSection = ({
  tab,
  onChangeTab,
  filter,
  onChangeFilter,
  data,
  loading
}: DocumentSectionProps) => (
  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex gap-2">
        {tabOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChangeTab(option.value)}
            className={clsx(
              "rounded-md px-4 py-2 text-sm font-medium transition",
              tab === option.value
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2 text-sm text-slate-600">
        <label htmlFor="status-filter" className="font-medium">
          Status
        </label>
        <select
          id="status-filter"
          value={filter}
          onChange={(event) => onChangeFilter(event.target.value as (typeof filterOptions)[number])}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-semibold">Document</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Notes</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {loading && (
            <tr>
              <td className="px-4 py-4 text-sm text-slate-500" colSpan={6}>
                Loading documents…
              </td>
            </tr>
          )}
          {!loading && data.length === 0 && (
            <tr>
              <td className="px-4 py-4 text-sm text-slate-500" colSpan={6}>
                No documents available for this filter.
              </td>
            </tr>
          )}
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{item.id}</p>
                <p className="text-xs text-slate-500">{item.reference}</p>
              </td>
              <td className="px-4 py-3">{item.date}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">{item.amount}</td>
              <td className="px-4 py-3">
                <span
                  className={clsx(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                    statusStyles[item.status]
                  )}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-slate-500">{item.description}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2 text-sm">
                  <button className="rounded-md border border-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-100">
                    View
                  </button>
                  <button className="rounded-md border border-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-100">
                    Download
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const timelineEvents = [
  {
    title: "Invoice #5421 settled",
    date: "Aug 22, 2024",
    description: "Payment confirmed for SaaS renewals.",
    tone: "success"
  },
  {
    title: "Delivery challan #9810 signed",
    date: "Aug 18, 2024",
    description: "Endpoint rollout completed for Sales division.",
    tone: "info"
  },
  {
    title: "Reminder issued for invoice #5436",
    date: "Sep 4, 2024",
    description: "Automated reminder sent to IT finance approver.",
    tone: "warning"
  }
] as const;

const toneColor = {
  success: "bg-green-500",
  info: "bg-blue-500",
  warning: "bg-amber-500"
};

const toneLabel = {
  success: "Completed",
  info: "Update",
  warning: "Action needed"
} as const;

const TimelineSection = () => (
  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
    <p className="mt-1 text-sm text-slate-500">
      Keep an eye on recent updates so you can follow up on pending documents quickly.
    </p>
    <div className="mt-6 space-y-4">
      {timelineEvents.map((event) => (
        <div key={event.title} className="rounded-md border border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">{event.title}</p>
            <span
              className={clsx(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white",
                toneColor[event.tone]
              )}
            >
              {toneLabel[event.tone]}
            </span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{event.date}</p>
          <p className="mt-2 text-sm text-slate-600">{event.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default InvoicesPage;



