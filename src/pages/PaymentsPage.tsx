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
    descriptor: "27 disbursements"
  },
  {
    label: "Pending approvals",
    value: "$38,920",
    descriptor: "6 invoices"
  },
  {
    label: "Upcoming renewals (14d)",
    value: "$24,300",
    descriptor: "4 renewals"
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
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Upcoming: "bg-blue-100 text-blue-700"
};

const PaymentsPage = () => {
  const [segment, setSegment] = useState<(typeof listSegments)[number]>("All");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Payments</h1>
        <p className="mt-2 text-sm text-slate-600">
          Track payment performance, upcoming renewals, and channel mix at a glance.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <GlassCard key={card.label} className="rounded-lg p-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className="mt-4 text-2xl font-semibold text-slate-900">{card.value}</p>
            <p className="mt-2 text-sm text-slate-600">{card.descriptor}</p>
          </GlassCard>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard className="rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Monthly payment flow</h2>
            <p className="text-xs uppercase tracking-wide text-slate-400">USD (x1k)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} barSize={16} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(148, 163, 184, 0.15)" }}
                contentStyle={{
                  background: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #cbd5f5",
                  boxShadow: "0 10px 30px -20px rgba(15,23,42,0.3)"
                }}
              />
              <Legend />
              <Bar dataKey="paid" name="Paid" fill="#2563eb" radius={[6, 6, 6, 6]} />
              <Bar dataKey="pending" name="Pending" fill="#0ea5e9" radius={[6, 6, 6, 6]} />
              <Bar dataKey="overdue" name="Overdue" fill="#f97316" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-900">Payment channels</h2>
          <DistributionDonut data={paymentSegments} />
          <div className="space-y-3 text-sm text-slate-600">
            {paymentSegments.map((segmentItem) => (
              <div key={segmentItem.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: segmentItem.color }}
                  />
                  <span className="font-medium text-slate-900">{segmentItem.label}</span>
                </div>
                <span>{segmentItem.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <GlassCard className="rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">Payment tracker</h2>
          <div className="flex gap-2">
            {listSegments.map((seg) => (
              <button
                key={seg}
                onClick={() => setSegment(seg)}
                className={clsx(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                  segment === seg
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 text-slate-600 hover:bg-slate-100"
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
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600"
              >
                <div>
                  <p className="text-base font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.id}</p>
                </div>
                <p className="text-lg font-semibold text-slate-900">{item.amount}</p>
                <p>Due {item.due}</p>
                <span
                  className={clsx(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    statusTone[item.status]
                  )}
                >
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
