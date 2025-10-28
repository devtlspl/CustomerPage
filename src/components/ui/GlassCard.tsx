import { PropsWithChildren } from "react";
import clsx from "clsx";

type GlassCardProps = PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}>;

const GlassCard = ({ className, children, as: Component = "div" }: GlassCardProps) => (
  <Component
    className={clsx(
      "glass-panel relative overflow-hidden rounded-xl border border-white/30",
      "bg-white/70 backdrop-blur-22 shadow-glass transition-all",
      className
    )}
  >
    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10" />
    <div className="relative">{children}</div>
  </Component>
);

export default GlassCard;
