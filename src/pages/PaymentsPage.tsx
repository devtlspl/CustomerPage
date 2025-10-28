import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import clsx from "clsx";
import GlassCard from "../components/ui/GlassCard";
import DistributionDonut from "../components/dashboard/DistributionDonut";

const summaryCards = [
  {
    label: "Paid IT spend (Q3)",
    value: "$162,400",
    descriptor: "27 disbursements",
    accent: "from-accent-primary to-accent-tertiary"
  },
  {
    label: "Pending approvals",
    value: "$38,920",
    descriptor: "6 invoices",
    accent: "from-accent-secondary to-accent-primary"
  },
  {
    label: "Upcoming renewals (14d)",
    value: "$24,300",
    descriptor: "4 renewals",
    accent: "from-warning to-danger"
  }
];

const barData = [
  { month: "Apr", paid: 28, pending: 9, overdue: 3 },
  { month: "May", paid: 34, pending: 6, overdue: 2 },
  { month: "Jun", paid: 29, pending: 11, overdue: 4 },
  { month: "Jul", paid: 41, pending: 6, overdue: 2 },
  { month: "Aug", paid: 36, pending: 10, overdue: 3 },
  { month: "Sep", paid: 22, pending: 8, overdue: 2 }
];

const paymentSegments = [
  { label: "ACH", value: 52, color: "#2F7BFE" },
  { label: "Virtual card", value: 24, color: "#38D7CF" },
  { label: "Wire", value: 16, color: "#7B46FF" },
  { label: "Other", value: 8, color: "#FFB444" }
];

const listSegments = ["All", "Paid", "Pending", "Upcoming"] as const;

const paymentList = [
  {
    id: "PAY-4810",
    name: "Okta Enterprise",
    amount: "$14,200",
    due: "Sep 6, 2024",
    status: "Pending"
  },
  {
    id: "PAY-4809",
    name: "Jamf Pro licenses",
    amount: "$6,420",
    due: "Sep 2, 2024",
    status: "Upcoming"
  },
  {
    id: "PAY-4805",
    name: "Cisco SmartNet",
    amount: "$18,600",
    due: "Aug 31, 2024",
    status: "Paid"
  },
  {
    id: "PAY-4802",
    name: "Azure consumption",
    amount: "$31,180",
    due: "Aug 22, 2024",
    status: "Paid"
  }
] as const;

const statusTone: Record<string, string> = {
  Paid: "bg-success/15 text-success",
  Pending: "bg-warning/15 text-warning",
  Upcoming: "bg-accent-primary/15 text-accent-primary"
};

const PaymentsPage = () => {
  const [segment, setSegment] = useState<(typeof listSegments)[number]>("All");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Payments</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Visualize IT payment performance, cash flow balance, and upcoming renewals.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <GlassCard
            key={card.label}
            className="rounded-3xl p-6 text-white"
            style={{
              background:
                card.accent === "from-warning to-danger"
                  ? "linear-gradient(135deg,#FFB444,#FF5C7A)"
                  : card.accent.includes("accent-secondary")
                  ? "linear-gradient(135deg,#38D7CF,#2F7BFE)"
                  : "linear-gradient(135deg,#2F7BFE,#7B46FF)"
            }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold">{card.value}</p>
            <p className="mt-2 text-sm text-white/70">{card.descriptor}</p>
          </GlassCard>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard className="rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Monthly Payment Flow</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">USD (x1k)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} barSize={16} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(44,63,146,0.08)" />
              <XAxis dataKey="month" stroke="#5B6380" tickLine={false} />
              <YAxis stroke="#5B6380" tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(47,123,254,0.08)" }}
                contentStyle={{
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 10px 30px -15px rgba(44,63,146,0.3)"
                }}
              />
              <Legend />
              <Bar dataKey="paid" name="Paid" fill="#2F7BFE" radius={[8, 8, 8, 8]} />
              <Bar dataKey="pending" name="Pending" fill="#38D7CF" radius={[8, 8, 8, 8]} />
              <Bar dataKey="overdue" name="Overdue" fill="#FF5C7A" radius={[8, 8, 8, 8]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-text-primary">Payment Channels</h2>
          <DistributionDonut data={paymentSegments} />
          <div className="space-y-3 text-sm text-text-secondary">
            {paymentSegments.map((segmentItem) => (
              <div key={segmentItem.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: segmentItem.color }}
                  />
                  <span className="font-medium text-text-primary">{segmentItem.label}</span>
                </div>
                <span>{segmentItem.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <GlassCard className="rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-text-primary">Payment Tracker</h2>
          <div className="rounded-full bg-white/60 p-1">
            {listSegments.map((seg) => (
              <button
                key={seg}
                onClick={() => setSegment(seg)}
                className={clsx(
                  "rounded-full px-4 py-2 text-xs font-semibold transition",
                  segment === seg
                    ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-glass-sm"
                    : "text-text-secondary"
                )}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {paymentList
            .filter((item) => (segment === "All" ? true : item.status === segment))
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/60 px-4 py-4 text-sm text-text-secondary shadow-glass-sm transition hover:bg-white"
              >
                <div>
                  <p className="text-base font-semibold text-text-primary">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/80">
                    {item.id}
                  </p>
                </div>
                <p className="text-lg font-semibold text-text-primary">{item.amount}</p>
                <p>Due {item.due}</p>
                <span className={clsx("rounded-full px-3 py-1 text-xs font-semibold", statusTone[item.status])}>
                  {item.status}
                </span>
              </div>
            ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default PaymentsPage;
