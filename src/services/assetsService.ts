import { apiClient } from "./apiClient";

export type Asset = {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Maintenance" | "Returned";
  lastService: string;
  value: string;
  location: string;
  serial: string;
  health: number;
};

export type AssetResponse = {
  items: Asset[];
};

export const fetchAssets = async () =>
  apiClient.get<AssetResponse>("/api/customer/self/assets");

export const fetchAssetById = async (id: string) =>
  apiClient.get<Asset>(`/api/customer/self/assets/${id}`);
