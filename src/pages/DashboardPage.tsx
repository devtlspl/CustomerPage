import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/dashboard/StatCard";
import TrendLineChart from "../components/dashboard/TrendLineChart";
import DistributionDonut from "../components/dashboard/DistributionDonut";
import ActivityFeed from "../components/dashboard/ActivityFeed";

const statCards = [
  {
    label: "Active Devices",
    value: "1,248",
    change: "+7% vs last month",
    trend: "up" as const,
    accent: "primary" as const,
    sparkline: [900, 920, 940, 980, 1020, 1100, 1248]
  },
  {
    label: "Open Support Tickets",
    value: "14",
    change: "-3 since last week",
    trend: "down" as const,
    accent: "secondary" as const,
    sparkline: [22, 20, 19, 18, 16, 15, 14]
  },
  {
    label: "Pending Renewal Spend",
    value: "$58.4k",
    change: "+$6.8k this quarter",
    trend: "steady" as const,
    accent: "tertiary" as const,
    sparkline: [34, 36, 37, 41, 44, 52, 58]
  },
  {
    label: "Devices Due Refresh",
    value: "26",
    change: "Next 30 days",
    trend: "steady" as const,
    accent: "primary" as const,
    sparkline: [18, 19, 21, 23, 24, 25, 26]
  }
];

const trendData = [
  { month: "Mar", value: 42000 },
  { month: "Apr", value: 48500 },
  { month: "May", value: 51200 },
  { month: "Jun", value: 56000 },
  { month: "Jul", value: 60500 },
  { month: "Aug", value: 64800 },
  { month: "Sep", value: 69200, projection: 73500 }
];

const distributionData = [
  { label: "Endpoints", value: 40, color: "#2F7BFE" },
  { label: "Network", value: 25, color: "#38D7CF" },
  { label: "SaaS Licenses", value: 20, color: "#7B46FF" },
  { label: "Infrastructure", value: 15, color: "#FFB444" }
];

const activities = [
  {
    id: 1,
    title: "Invoice #5421 paid",
    description: "Payment of $14,200 for SaaS renewals cleared via ACH.",
    time: "2h ago",
    tag: "INV",
    tone: "success" as const
  },
  {
    id: 2,
    title: "Device swap completed",
    description: "Laptop P14-221 reassigned to Engineering after diagnostics.",
    time: "4h ago",
    tag: "AST",
    tone: "info" as const
  },
  {
    id: 3,
    title: "Ticket escalated",
    description: "Support ticket #8623 (VPN latency) moved to Tier 2 networking.",
    time: "Yesterday",
    tag: "SUP",
    tone: "warning" as const
  }
];

const DashboardPage = () => (
  <div className="space-y-12">
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Alex</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Review the latest device usage, renewal spend, and support activity to keep your teams
            on track. These quick insights highlight what needs attention first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
              Manage assets
            </button>
            <button className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              View payments
            </button>
          </div>
        </div>
        <GlassCard className="w-full max-w-sm border-slate-200 p-6 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">Asset utilization</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">86%</p>
          <p className="mt-2 text-sm text-slate-600">
            Up 8% since last quarter across all regions.
          </p>
        </GlassCard>
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
