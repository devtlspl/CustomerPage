import { useEffect, useMemo, useState, type ReactNode } from "react";
import clsx from "clsx";
import GlassCard from "../components/ui/GlassCard";
import { fetchAssets, type Asset } from "../services/assetsService";

type AssetStatus = "Active" | "Maintenance" | "Returned";

const statusStyles: Record<AssetStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Maintenance: "bg-amber-100 text-amber-700",
  Returned: "bg-red-100 text-red-700"
};

const filterOptions: Array<{ label: string; value: AssetStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Maintenance", value: "Maintenance" },
  { label: "Returned", value: "Returned" }
];

const AssetsPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filter, setFilter] = useState<AssetStatus | "All">("All");
  const [selected, setSelected] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadAssets = async () => {
      try {
        setLoading(true);
        const response = await fetchAssets();
        if (active) {
          const items = response.items ?? [];
          setAssets(items);
          setSelected(items[0] ?? null);
        }
      } catch (err) {
        console.error("Failed to load assets", err);
        if (active) {
          setError("Unable to load assets from the server right now.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAssets();

    return () => {
      active = false;
    };
  }, []);

  const filteredAssets = useMemo(
    () =>
      assets.filter((asset) => (filter === "All" ? true : asset.status === filter)),
    [assets, filter]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Assets</h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitor deployments, service timelines, and hardware allocation in one place.
          </p>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Add asset
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={clsx(
              "rounded-md px-3 py-2 text-xs font-medium transition",
              value === filter
                ? "bg-slate-900 text-white"
                : "border border-slate-300 text-slate-600 hover:bg-slate-100"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard>
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {["Asset", "Type", "Status", "Last Service", "Value", ""].map((header) => (
                    <th key={header} className="px-6 py-4 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="px-6 py-5 text-sm text-slate-500" colSpan={6}>
                      Loading assets…
                    </td>
                  </tr>
                )}
                {!loading && filteredAssets.length === 0 && (
                  <tr>
                    <td className="px-6 py-5 text-sm text-slate-500" colSpan={6}>
                      No assets found for this filter.
                    </td>
                  </tr>
                )}
                {filteredAssets.map((asset) => {
                  const isActive = selected?.id === asset.id;
                  return (
                    <tr
                      key={asset.id}
                      onClick={() => setSelected(asset)}
                      className={clsx(
                        "cursor-pointer transition",
                        isActive ? "bg-accent-primary/10" : "hover:bg-white/40"
                      )}
                    >
                      <td className="px-6 py-5">
                        <div className="font-semibold">{asset.name}</div>
                        <div className="text-xs text-slate-500">{asset.id}</div>
                      </td>
                      <td className="px-6 py-5 text-slate-500">{asset.type}</td>
                      <td className="px-6 py-5">
                        <span
                          className={clsx(
                            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
                            statusStyles[asset.status]
                          )}
                        >
                          <span className="h-2 w-2 rounded-full bg-current" />
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-slate-500">{asset.lastService}</td>
                      <td className="px-6 py-5 font-semibold">{asset.value}</td>
                      <td className="px-6 py-5 text-right text-xs text-slate-500">Details &gt;</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
        <AssetDetails asset={selected} loading={loading} />
      </div>
    </div>
  );
};

type AssetDetailsProps = {
  asset: Asset | null;
  loading: boolean;
};

const AssetDetails = ({ asset, loading }: AssetDetailsProps) => {
  if (loading) {
    return (
      <GlassCard className="flex min-h-[420px] items-center justify-center p-10 text-slate-500">
        Loading asset details…
      </GlassCard>
    );
  }

  if (!asset) {
    return (
      <GlassCard className="flex min-h-[420px] items-center justify-center p-10 text-slate-500">
        Select an asset to preview its lifecycle.
      </GlassCard>
    );
  }

  return (
    <GlassCard className="flex flex-col gap-6 p-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Asset detail</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{asset.name}</h2>
        <p className="text-sm text-slate-500">{asset.id}</p>
      </div>
      <div className="space-y-4 text-sm text-slate-600">
        <DetailRow label="Status">
          <span
            className={clsx(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
              statusStyles[asset.status]
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {asset.status}
          </span>
        </DetailRow>
        <DetailRow label="Type">{asset.type}</DetailRow>
        <DetailRow label="Location">{asset.location}</DetailRow>
        <DetailRow label="Serial">{asset.serial}</DetailRow>
        <DetailRow label="Last Service">{asset.lastService}</DetailRow>
        <DetailRow label="Asset Value">{asset.value}</DetailRow>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Health score</p>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{asset.health}%</p>
        <div className="mt-3 h-2 rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900"
            style={{ width: `${asset.health}%` }}
          />
        </div>
      </div>
      <button className="mt-auto rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
        View lifecycle timeline
      </button>
    </GlassCard>
  );
};

const DetailRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
    <span className="font-medium text-slate-900">{children}</span>
  </div>
);

export default AssetsPage;
