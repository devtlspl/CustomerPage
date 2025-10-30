import { apiClient } from "./apiClient";

export type PaymentSummaryCard = {
  label: string;
  value: string;
  descriptor: string;
};

export type PaymentFlowPoint = {
  month: string;
  paid: number;
  pending: number;
  overdue: number;
};

export type PaymentChannel = {
  label: string;
  value: number;
  color: string;
};

export type PaymentTrackerItem = {
  id: string;
  name: string;
  amount: string;
  due: string;
  status: "Paid" | "Pending" | "Upcoming";
};

export type PaymentsOverviewResponse = {
  summaryCards: PaymentSummaryCard[];
  monthlyFlow: PaymentFlowPoint[];
  channels: PaymentChannel[];
  tracker: PaymentTrackerItem[];
};

export const fetchPaymentsOverview = async () =>
  apiClient.get<PaymentsOverviewResponse>("/api/customer/self/payments");
