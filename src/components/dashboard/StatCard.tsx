import clsx from "clsx";
import GlassCard from "../ui/GlassCard";

export type StatCardProps = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "steady";
};

const StatCard = ({ label, value, change, trend }: StatCardProps) => (
  <GlassCard className="flex flex-col gap-3 rounded-lg border-slate-200 p-5">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-3xl font-semibold text-slate-900">{value}</p>
    <p
      className={clsx(
        "text-sm",
        trend === "up"
          ? "text-emerald-600"
          : trend === "down"
          ? "text-red-600"
          : "text-slate-500"
      )}
    >
      {change}
    </p>
  </GlassCard>
);

export default StatCard;
