import { CSSProperties, PropsWithChildren } from "react";
import clsx from "clsx";

type GlassCardProps = PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
}>;

const GlassCard = ({ className, children, as: Component = "div", style }: GlassCardProps) => (
  <Component className={clsx("glass-panel transition-shadow", className)} style={style}>
    {children}
  </Component>
);

export default GlassCard;
