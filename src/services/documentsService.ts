import { apiClient } from "./apiClient";

export type DocumentStatus = "Paid" | "Pending" | "Overdue";

export type BusinessDocument = {
  id: string;
  date: string;
  amount: string;
  status: DocumentStatus;
  reference: string;
  description: string;
};

export type DocumentsResponse = {
  invoices: BusinessDocument[];
  deliveryChallans: BusinessDocument[];
};

export const fetchDocuments = async () =>
  apiClient.get<DocumentsResponse>("/api/customer/self/documents");

export const fetchInvoices = async () =>
  apiClient.get<BusinessDocument[]>("/api/customer/self/invoices");

export const fetchDeliveryChallans = async () =>
  apiClient.get<BusinessDocument[]>("/api/customer/self/delivery-challans");
