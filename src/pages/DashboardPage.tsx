import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/dashboard/StatCard";
import TrendLineChart from "../components/dashboard/TrendLineChart";

const metricCards = [
  { label: "Rental assets live", value: "1,248", change: "Up 7% vs last month", trend: "up" as const },
  { label: "Sale assets serviced", value: "312", change: "5 completed this week", trend: "steady" as const },
  { label: "Pending tickets", value: "14", change: "Resolve within 2 days", trend: "down" as const }
];

const trendData = [
  { month: "Apr", value: 38000 },
  { month: "May", value: 41200 },
  { month: "Jun", value: 44600 },
  { month: "Jul", value: 47200 },
  { month: "Aug", value: 50500 },
  { month: "Sep", value: 53800 }
];

const focusItems = [
  {
    title: "Schedule September rental audits",
    detail: "Audit the top 25 rental assets to confirm on-site condition before renewals."
  },
  {
    title: "Review three expiring SLAs",
    detail: "Network and security SLAs expire in 14 days—confirm extension or replacement."
  },
  {
    title: "Sync with finance on invoices",
    detail: "Match the latest delivery challans with invoices prior to month-end close."
  }
];

const recentUpdates = [
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
];

const DashboardPage = () => (
  <div className="space-y-8">
    <header className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <p className="text-sm text-slate-600">
        A concise view of rental and sale assets so you can prioritise today’s work without noise.
      </p>
    </header>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metricCards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </section>

    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <GlassCard className="rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Asset spend trend</h2>
          <span className="text-xs text-slate-500">Rolling 6 months</span>
        </div>
        <TrendLineChart data={trendData} />
      </GlassCard>

      <GlassCard className="rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900">Today’s focus</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {focusItems.map((item) => (
            <li key={item.title} className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
            </li>
          ))}
        </ul>
      </GlassCard>
    </section>

    <GlassCard className="rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Recent updates</h2>
        <button className="text-sm font-medium text-slate-600 hover:text-slate-900">View all</button>
      </div>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {recentUpdates.map((update) => (
          <li key={update.title} className="flex flex-col gap-1 rounded-md border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-900">{update.title}</p>
              <p className="text-sm text-slate-600">{update.detail}</p>
            </div>
            <span className="text-xs uppercase tracking-wide text-slate-400">{update.time}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  </div>
);

export default DashboardPage;
