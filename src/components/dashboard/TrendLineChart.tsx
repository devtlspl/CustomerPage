import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot
} from "recharts";

type TrendLineChartProps = {
  data: Array<{ month: string; value: number; projection?: number }>;
};

const TrendLineChart = ({ data }: TrendLineChartProps) => (
  <ResponsiveContainer width="100%" height={280}>
    <LineChart data={data}>
      <defs>
        <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2F7BFE" />
          <stop offset="100%" stopColor="#7B46FF" />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="rgba(44,63,146,0.08)" vertical={false} />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#5B6380", fontSize: 12 }}
        padding={{ left: 10, right: 10 }}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#5B6380", fontSize: 12 }}
        tickFormatter={(value) => `$${value / 1000}k`}
      />
      <Tooltip
        cursor={{ strokeDasharray: "4 4", stroke: "#2F7BFE" }}
        contentStyle={{
          background: "rgba(255,255,255,0.92)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 20px 40px -25px rgba(44,63,146,0.35)"
        }}
        labelStyle={{ color: "#1C2340", fontWeight: 600 }}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke="url(#trendGradient)"
        strokeWidth={3}
        dot={{ r: 6, fill: "#fff", strokeWidth: 2, stroke: "#2F7BFE" }}
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="projection"
        stroke="#38D7CF"
        strokeDasharray="6 6"
        strokeWidth={2}
        dot={false}
      />
      <ReferenceDot
        x={data[data.length - 1]?.month}
        y={data[data.length - 1]?.value}
        r={6}
        fill="#7B46FF"
        stroke="#fff"
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default TrendLineChart;
