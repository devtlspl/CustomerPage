import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/dashboard/StatCard";
import TrendLineChart from "../components/dashboard/TrendLineChart";
import DistributionDonut from "../components/dashboard/DistributionDonut";
import ActivityFeed from "../components/dashboard/ActivityFeed";

const statCards = [
  {
    label: "Running Assets",
    value: "128",
    change: "+12% vs last month",
    trend: "up" as const,
    accent: "primary" as const,
    sparkline: [40, 42, 38, 44, 46, 49, 52]
  },
  {
    label: "Open Tickets",
    value: "9",
    change: "-2 since last week",
    trend: "down" as const,
    accent: "secondary" as const,
    sparkline: [12, 14, 13, 11, 10, 9, 8]
  },
  {
    label: "Pending Invoices",
    value: "$42.8k",
    change: "+$4.2k pending",
    trend: "steady" as const,
    accent: "tertiary" as const,
    sparkline: [30, 32, 35, 38, 37, 41, 42]
  },
  {
    label: "Payments Due",
    value: "4",
    change: "Due this week",
    trend: "steady" as const,
    accent: "primary" as const,
    sparkline: [5, 6, 4, 5, 4, 4, 4]
  }
];

const trendData = [
  { month: "Mar", value: 54000 },
  { month: "Apr", value: 62000 },
  { month: "May", value: 66000 },
  { month: "Jun", value: 72000 },
  { month: "Jul", value: 78000 },
  { month: "Aug", value: 82000 },
  { month: "Sep", value: 87000, projection: 91000 }
];

const distributionData = [
  { label: "Asset Leasing", value: 45, color: "#2F7BFE" },
  { label: "Logistics", value: 27, color: "#38D7CF" },
  { label: "Maintenance", value: 18, color: "#7B46FF" },
  { label: "Other Services", value: 10, color: "#FFB444" }
];

const activities = [
  {
    id: 1,
    title: "Invoice #1042 paid",
    description: "Payment of $12,400 received via ACH.",
    time: "2h ago",
    tag: "INV",
    tone: "success" as const
  },
  {
    id: 2,
    title: "Asset returned - XR-200",
    description: "QA checks completed. Asset ready for redeployment.",
    time: "4h ago",
    tag: "AST",
    tone: "info" as const
  },
  {
    id: 3,
    title: "Ticket escalated",
    description: "Support ticket #3420 moved to Tier 2 for resolution.",
    time: "Yesterday",
    tag: "SUP",
    tone: "warning" as const
  }
];

const DashboardPage = () => (
  <div className="space-y-12">
    <GlassCard className="rounded-3xl p-8 md:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-text-secondary">Welcome back</p>
          <h1 className="mt-3 text-4xl font-semibold text-text-primary">Alex!</h1>
          <p className="mt-4 max-w-xl text-base text-text-secondary">
            Your portfolio looks strong this quarter. Review the insights below to stay ahead
            of upcoming payments, support tickets, and asset health.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary px-6 py-3 text-sm font-semibold text-white shadow-glass transition hover:shadow-xl">
              Manage Assets
            </button>
            <button className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-text-primary backdrop-blur hover:bg-white/50">
              View Payments
            </button>
          </div>
        </div>
        <div className="relative w-full max-w-sm">
          <span className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-accent-primary/40 to-accent-tertiary/40 blur-[50px]" />
          <GlassCard className="relative rounded-[36px] bg-white/50 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-text-secondary">
              Asset Utilization
            </p>
            <p className="mt-4 text-5xl font-semibold text-text-primary">86%</p>
            <p className="mt-3 text-sm text-text-secondary">
              +8% vs last quarter. Optimal usage maintained across all regions.
            </p>
          </GlassCard>
        </div>
      </div>
    </GlassCard>

    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </section>

    <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <GlassCard className="rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Asset Portfolio Trend</h2>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-primary" />
              Actual
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-secondary" />
              Projection
            </span>
          </div>
        </div>
        <TrendLineChart data={trendData} />
      </GlassCard>

      <GlassCard className="rounded-3xl p-6">
        <h2 className="text-lg font-semibold text-text-primary">Revenue Distribution</h2>
        <DistributionDonut data={distributionData} />
        <div className="mt-4 space-y-3">
          {distributionData.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                <span className="font-medium text-text-primary">{item.label}</span>
              </div>
              <span className="text-text-secondary">{item.value}%</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>

    <ActivityFeed activities={activities} />
  </div>
);

export default DashboardPage;
