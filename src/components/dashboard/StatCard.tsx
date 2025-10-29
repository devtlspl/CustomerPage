import clsx from "clsx";
import GlassCard from "../ui/GlassCard";

export type StatCardProps = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "steady";
  accent: "primary" | "secondary" | "tertiary";
  sparkline: number[];
};

const accentMap: Record<StatCardProps["accent"], string> = {
  primary: "text-blue-600",
  secondary: "text-emerald-600",
  tertiary: "text-purple-600"
};

const StatCard = ({ label, value, change, trend, accent, sparkline }: StatCardProps) => (
  <GlassCard className="flex flex-col gap-5 rounded-lg border-slate-200 p-5 hover:shadow-md">
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <div
        className={clsx(
          "flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold",
          accentMap[accent]
        )}
      >
        *
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        <p
          className={clsx(
            "mt-1 text-xs font-medium",
            trend === "up"
              ? "text-emerald-600"
              : trend === "down"
              ? "text-red-600"
              : "text-slate-500"
          )}
        >
          {change}
        </p>
      </div>
      <Sparkline data={sparkline} accent={accent} />
    </div>
  </GlassCard>
);

type SparklineProps = {
  data: number[];
  accent: StatCardProps["accent"];
};

const Sparkline = ({ data, accent }: SparklineProps) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const accentColor = {
    primary: { start: "#2563eb", end: "#3b82f6" },
    secondary: { start: "#059669", end: "#34d399" },
    tertiary: { start: "#7c3aed", end: "#a855f7" }
  }[accent];
  const points = data
    .map((value: number, index: number) => {
      const x = data.length <= 1 ? 0 : (index / (data.length - 1)) * 70;
      const y = max === min ? 12 : ((value - min) / (max - min)) * 24;
      return `${x},${24 - y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 70 24" className="h-16 w-20 overflow-visible">
      <defs>
        <linearGradient id={`spark-${accent}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accentColor.start} stopOpacity={0.7} />
          <stop offset="100%" stopColor={accentColor.end} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        strokeWidth={2.5}
        fill="none"
        stroke={accentColor.start}
        strokeLinecap="round"
      />
      <polygon points={`${points} 70,24 0,24`} fill={`url(#spark-${accent})`} />
    </svg>
  );
};

export default StatCard;
