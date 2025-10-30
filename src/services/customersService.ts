import { apiClient } from "./apiClient";

export type PaginationParameters = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export type ApiResult<T> = {
  success: boolean;
  data: T;
  message?: string;
  errors?: unknown;
};

export type AddressDto = {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export type ContactDto = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  isPrimary?: boolean;
};

export type CustomerDto = {
  id: string;
  email: string;
  gstinUin?: string;
  company: string;
  phone?: string;
  creditPeriod: number;
  billToAddress?: AddressDto;
  shipToAddress?: AddressDto;
  registrationDate?: string;
  pan?: string;
  contacts?: ContactDto[];
  invoices?: unknown[];
  createdAt?: string;
  modifiedAt?: string;
  [key: string]: unknown;
};

export type CustomerCollection = {
  items: CustomerDto[];
  totalCount: number;
};

export type CreateCustomerRequest = {
  email: string;
  gstinUin?: string;
  company: string;
  phone?: string;
  creditPeriod: number;
  billToAddress?: AddressDto;
  shipToAddress?: AddressDto;
  registrationDate?: string;
  pan?: string;
  contacts?: ContactDto[];
  ownerId?: string;
  [key: string]: unknown;
};

export type UpdateCustomerRequest = Partial<CreateCustomerRequest>;

const buildQuery = (parameters: PaginationParameters = {}) => {
  const params = new URLSearchParams();
  if (parameters.page) params.set("page", String(parameters.page));
  if (parameters.pageSize) params.set("pageSize", String(parameters.pageSize));
  if (parameters.search) params.set("search", parameters.search);
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

export const fetchCustomers = async (parameters?: PaginationParameters) =>
  apiClient.get<ApiResult<CustomerCollection>>(
    `/api/customer${buildQuery(parameters)}`
  );

export const fetchCustomerById = async (id: string) =>
  apiClient.get<ApiResult<CustomerDto>>(`/api/customer/${id}`);

export const createCustomer = async (payload: CreateCustomerRequest) =>
  apiClient.post<ApiResult<CustomerDto>>("/api/customer", payload);

export const updateCustomer = async (id: string, payload: UpdateCustomerRequest) =>
  apiClient.put<ApiResult<CustomerDto>>(`/api/customer/${id}`, payload);

export const deleteCustomer = async (id: string) =>
  apiClient.delete<ApiResult<boolean>>(`/api/customer/${id}`);

export type ImportSummary = {
  successfulRows: number;
  failedRows: number;
  errors?: Record<string, string[]>;
};

export const importCustomers = async (payload: CreateCustomerRequest[]) =>
  apiClient.post<ApiResult<ImportSummary>>("/api/customer/import", payload);
