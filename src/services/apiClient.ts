const DEFAULT_API_BASE_URL = "http://localhost:7244";
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = RequestInit & {
  skipAuth?: boolean;
};

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json"
};

const buildUrl = (endpoint: string) => {
  if (endpoint.startsWith("http")) {
    return endpoint;
  }

  if (!API_BASE_URL) {
    throw new Error(
      "API base URL is not configured. Set VITE_API_BASE_URL in your environment or .env file."
    );
  }

  return `${API_BASE_URL.replace(/\/$/, "")}${endpoint}`;
};

async function request<T>(endpoint: string, method: HttpMethod, options: RequestOptions = {}) {
  const { skipAuth, headers, ...rest } = options;
  const response = await fetch(buildUrl(endpoint), {
    method,
    credentials: skipAuth ? "omit" : "include",
    headers: {
      ...defaultHeaders,
      ...headers
    },
    ...rest
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, "GET", options),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, "POST", {
      body: body ? JSON.stringify(body) : undefined,
      ...options
    }),
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, "PUT", {
      body: body ? JSON.stringify(body) : undefined,
      ...options
    }),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, "PATCH", {
      body: body ? JSON.stringify(body) : undefined,
      ...options
    }),
  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, "DELETE", options)
};

export type ApiClient = typeof apiClient;
