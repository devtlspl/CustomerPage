import { apiClient } from "./apiClient";
import type { Asset } from "./assetsService";

export const fetchSupportAssets = async () =>
  apiClient.get<{ items: Asset[] }>("/api/customer/self/support-assets");
