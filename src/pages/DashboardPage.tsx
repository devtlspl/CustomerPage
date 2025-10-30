import { useEffect, useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/dashboard/StatCard";
import TrendLineChart from "../components/dashboard/TrendLineChart";
import {
  fetchDashboardSummary,
  type DashboardSummaryResponse,
  type DashboardFocusItem,
  type DashboardUpdate
} from "../services/dashboardService";

const fallbackSummary: DashboardSummaryResponse = {
  metrics: [
    { label: "Rental assets live", value: "1,248", change: "Up 7% vs last month", trend: "up" },
    { label: "Sale assets serviced", value: "312", change: "5 completed this week", trend: "steady" },
    { label: "Pending tickets", value: "14", change: "Resolve within 2 days", trend: "down" }
  ],
  spendTrend: [
    { month: "Apr", value: 38000 },
    { month: "May", value: 41200 },
    { month: "Jun", value: 44600 },
    { month: "Jul", value: 47200 },
    { month: "Aug", value: 50500 },
    { month: "Sep", value: 53800 }
  ],
  focus: [
    {
      title: "Schedule September rental audits",
      detail: "Audit high-value rental assets before renewals."
    },
    {
      title: "Review expiring SLAs",
      detail: "Network and security SLAs expire in 14 days; confirm extension or replacement."
    },
    {
      title: "Sync with finance on invoices",
      detail: "Match the latest delivery challans with invoices prior to month-end close."
    }
  ],
  updates: [
    {
      title: "Invoice #5421 paid",
      time: "2h ago",
      detail: "SaaS renewals cleared via ACH for Contoso Industries."
    },
    {
      title: "Return pickup confirmed",
      time: "Yesterday",
      detail: "ThinkPad P14 scheduled for collection at Houston hub."
    },
    {
      title: "Ticket #8635 assigned",
      time: "Mon",
      detail: "Network diagnostics escalated to Tier 2 for investigation."
    }
  ]
};

const DashboardPage = () => {
  const [summary, setSummary] = useState<DashboardSummaryResponse>(fallbackSummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadSummary = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardSummary();
        if (isMounted && data) {
          setSummary(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard summary", err);
        if (isMounted) {
          setError("Unable to load live dashboard data. Showing the latest cached snapshot.");
          setSummary(fallbackSummary);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          A concise view of rental and sale assets so you can prioritise today&apos;s work without noise.
        </p>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summary.metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <GlassCard className="rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Asset spend trend</h2>
            <span className="text-xs text-slate-500">Rolling 6 months</span>
          </div>
          <TrendLineChart data={summary.spendTrend} />
          {loading && (
            <p className="mt-3 text-xs text-slate-400">Loading fresh data from the server...</p>
          )}
        </GlassCard>

        <GlassCard className="rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900">Today&apos;s focus</h2>
          <FocusList items={summary.focus} />
        </GlassCard>
      </section>

      <GlassCard className="rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent updates</h2>
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
            View all
          </button>
        </div>
        <UpdatesList items={summary.updates} />
      </GlassCard>
    </div>
  );
};

const FocusList = ({ items }: { items: DashboardFocusItem[] }) => {
  if (!items.length) {
    return <p className="mt-4 text-sm text-slate-500">No focus items for today.</p>;
  }

  return (
    <ul className="mt-4 space-y-3 text-sm text-slate-600">
      {items.map((item) => (
        <li key={item.title} className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
};

const UpdatesList = ({ items }: { items: DashboardUpdate[] }) => {
  if (!items.length) {
    return <p className="mt-4 text-sm text-slate-500">No recent updates.</p>;
  }

  return (
    <ul className="mt-4 space-y-3 text-sm text-slate-600">
      {items.map((update) => (
        <li
          key={update.title}
          className="flex flex-col gap-1 rounded-md border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-slate-900">{update.title}</p>
            <p className="text-sm text-slate-600">{update.detail}</p>
          </div>
          <span className="text-xs uppercase tracking-wide text-slate-400">{update.time}</span>
        </li>
      ))}
    </ul>
  );
};

export default DashboardPage;




