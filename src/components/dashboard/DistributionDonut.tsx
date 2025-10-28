import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type DistributionDonutProps = {
  data: Array<{ label: string; value: number; color: string }>;
};

const DistributionDonut = ({ data }: DistributionDonutProps) => (
  <ResponsiveContainer width="100%" height={280}>
    <PieChart>
      <defs>
        {data.map((item) => (
          <linearGradient key={item.label} id={`gradient-${item.label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={item.color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={item.color} stopOpacity={0.4} />
          </linearGradient>
        ))}
      </defs>
      <Pie
        data={data}
        dataKey="value"
        nameKey="label"
        innerRadius="55%"
        outerRadius="85%"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth={4}
      >
        {data.map((entry) => (
          <Cell key={entry.label} fill={`url(#gradient-${entry.label})`} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 10px 30px -15px rgba(44,63,146,0.3)"
        }}
        formatter={(value: number, name: string) => [`${value}%`, name]}
      />
    </PieChart>
  </ResponsiveContainer>
);

export default DistributionDonut;
