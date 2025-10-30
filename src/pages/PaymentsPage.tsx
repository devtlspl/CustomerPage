import { useEffect, useMemo, useState } from "react";
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
import {
  fetchPaymentsOverview,
  type PaymentChannel,
  type PaymentFlowPoint,
  type PaymentSummaryCard,
  type PaymentTrackerItem
} from "../services/paymentsService";

const listSegments = ["All", "Paid", "Pending", "Upcoming"] as const;

const statusTone: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Upcoming: "bg-blue-100 text-blue-700"
};

const PaymentsPage = () => {
  const [segment, setSegment] = useState<(typeof listSegments)[number]>("All");
  const [summaryCards, setSummaryCards] = useState<PaymentSummaryCard[]>([]);
  const [monthlyFlow, setMonthlyFlow] = useState<PaymentFlowPoint[]>([]);
  const [paymentSegments, setPaymentSegments] = useState<PaymentChannel[]>([]);
  const [paymentList, setPaymentList] = useState<PaymentTrackerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadPayments = async () => {
      try {
        setLoading(true);
        const response = await fetchPaymentsOverview();
        if (active) {
          setSummaryCards(response.summaryCards ?? []);
          setMonthlyFlow(response.monthlyFlow ?? []);
          setPaymentSegments(response.channels ?? []);
          setPaymentList(response.tracker ?? []);
        }
      } catch (err) {
        console.error("Failed to load payments overview", err);
        if (active) {
          setError("Unable to load payment analytics.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPayments();

    return () => {
      active = false;
    };
  }, []);

  const filteredPayments = useMemo(
    () =>
      paymentList.filter((item) => (segment === "All" ? true : item.status === segment)),
    [paymentList, segment]
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Payments</h1>
        <p className="mt-2 text-sm text-slate-600">
          Track payment performance, upcoming renewals, and channel mix at a glance.
        </p>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <GlassCard key={card.label} className="rounded-lg p-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className="mt-4 text-2xl font-semibold text-slate-900">{card.value}</p>
            <p className="mt-2 text-sm text-slate-600">{card.descriptor}</p>
          </GlassCard>
        ))}
        {!loading && summaryCards.length === 0 && (
          <GlassCard className="rounded-lg p-6 text-sm text-slate-500">
            No payment summary data available.
          </GlassCard>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard className="rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Monthly payment flow</h2>
            <p className="text-xs uppercase tracking-wide text-slate-400">USD (x1k)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyFlow} barSize={16} barGap={8}>
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
            {!loading && paymentSegments.length === 0 && (
              <p className="text-sm text-slate-500">No payment channel data available.</p>
            )}
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
          {loading && (
            <div className="rounded-md border border-slate-200 px-4 py-4 text-sm text-slate-500">
              Loading payment tracker…
            </div>
          )}
          {!loading && filteredPayments.length === 0 && (
            <div className="rounded-md border border-slate-200 px-4 py-4 text-sm text-slate-500">
              No payments match this filter.
            </div>
          )}
          {filteredPayments.map((item) => (
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
