import { apiClient } from "./apiClient";

export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "steady";
};

export type DashboardFocusItem = {
  title: string;
  detail: string;
};

export type DashboardUpdate = {
  title: string;
  time: string;
  detail: string;
};

export type DashboardTrendPoint = {
  month: string;
  value: number;
};

export type DashboardSummaryResponse = {
  metrics: DashboardMetric[];
  spendTrend: DashboardTrendPoint[];
  focus: DashboardFocusItem[];
  updates: DashboardUpdate[];
};

export const fetchDashboardSummary = async () =>
  apiClient.get<DashboardSummaryResponse>("/api/customer/self/dashboard");
