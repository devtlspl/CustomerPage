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
  primary: "from-accent-primary to-accent-tertiary",
  secondary: "from-accent-secondary to-accent-primary",
  tertiary: "from-accent-tertiary to-accent-secondary"
};

const StatCard = ({ label, value, change, trend, accent, sparkline }: StatCardProps) => (
  <GlassCard className="group flex flex-col gap-6 rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-text-secondary">{label}</p>
      <div
        className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md",
          accentMap[accent]
        )}
      >
        <span className="text-lg font-semibold">*</span>
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-3xl font-semibold text-text-primary">{value}</p>
        <p
          className={clsx(
            "mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
            trend === "up"
              ? "bg-success/10 text-success"
              : trend === "down"
              ? "bg-danger/10 text-danger"
              : "bg-text-secondary/10 text-text-secondary"
          )}
        >
          <span>{change}</span>
        </p>
      </div>
      <Sparkline data={sparkline} accent={accent} />
    </div>
  </GlassCard>
);

type SparklineProps = Pick<StatCardProps, "sparkline" | "accent">;

const Sparkline = ({ data, accent }: SparklineProps) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const accentColor = {
    primary: { start: "#2F7BFE", end: "#7B46FF" },
    secondary: { start: "#38D7CF", end: "#2F7BFE" },
    tertiary: { start: "#7B46FF", end: "#38D7CF" }
  }[accent];
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 70;
      const y = ((value - min) / (max - min || 1)) * 24;
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
        className={clsx(
          accent === "primary" && "stroke-accent-primary",
          accent === "secondary" && "stroke-accent-secondary",
          accent === "tertiary" && "stroke-accent-tertiary"
        )}
        strokeLinecap="round"
      />
      <polygon points={`${points} 70,24 0,24`} fill={`url(#spark-${accent})`} />
    </svg>
  );
};

export default StatCard;
