import { useMemo, useState, type ReactNode } from "react";
import clsx from "clsx";
import GlassCard from "../components/ui/GlassCard";

type AssetStatus = "Active" | "Maintenance" | "Returned";

type Asset = {
  id: string;
  name: string;
  type: string;
  status: AssetStatus;
  lastService: string;
  value: string;
  location: string;
  serial: string;
  health: number;
};

const assets: Asset[] = [
  {
    id: "AST-1001",
    name: "XR-200 Conveyor",
    type: "Logistics",
    status: "Active",
    lastService: "Aug 21, 2024",
    value: "$34,500",
    location: "Austin DC",
    serial: "XR200-8891",
    health: 92
  },
  {
    id: "AST-1005",
    name: "Spectra Scanner",
    type: "Quality Assurance",
    status: "Maintenance",
    lastService: "Aug 5, 2024",
    value: "$18,900",
    location: "Denver QA Lab",
    serial: "SCN-5124",
    health: 68
  },
  {
    id: "AST-1014",
    name: "Aurora Pods",
    type: "Field Device",
    status: "Active",
    lastService: "Jul 30, 2024",
    value: "$12,400",
    location: "Remote Teams",
    serial: "AP-9932",
    health: 86
  },
  {
    id: "AST-1021",
    name: "Vision Fleet",
    type: "Fleet Services",
    status: "Returned",
    lastService: "Jun 11, 2024",
    value: "$56,200",
    location: "Houston Hub",
    serial: "VF-2811",
    health: 74
  },
  {
    id: "AST-1025",
    name: "Nimbus Drone",
    type: "Inspection",
    status: "Active",
    lastService: "Aug 16, 2024",
    value: "$21,750",
    location: "NYC Ops",
    serial: "ND-0071",
    health: 95
  }
];

const statusStyles: Record<AssetStatus, string> = {
  Active: "bg-success/15 text-success",
  Maintenance: "bg-warning/15 text-warning",
  Returned: "bg-danger/15 text-danger"
};

const filterOptions: Array<{ label: string; value: AssetStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Maintenance", value: "Maintenance" },
  { label: "Returned", value: "Returned" }
];

const AssetsPage = () => {
  const [filter, setFilter] = useState<AssetStatus | "All">("All");
  const [selected, setSelected] = useState<Asset | null>(assets[0]);

  const filteredAssets = useMemo(
    () => assets.filter((asset) => (filter === "All" ? true : asset.status === filter)),
    [filter]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Assets</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Monitor asset performance, deployment locations, and service timelines.
          </p>
        </div>
        <button className="rounded-full bg-gradient-to-r from-accent-secondary to-accent-primary px-6 py-3 text-sm font-semibold text-white shadow-glass transition hover:shadow-xl">
          + Add Asset
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {filterOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              value === filter
                ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                : "bg-white/60 text-text-secondary shadow-glass-sm hover:bg-white"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassCard className="rounded-3xl">
          <div className="overflow-hidden rounded-3xl">
            <table className="min-w-full text-left text-sm text-text-primary">
              <thead className="bg-white/50 text-xs uppercase tracking-wide text-text-secondary/80">
                <tr>
                  {["Asset", "Type", "Status", "Last Service", "Value", ""].map((header) => (
                    <th key={header} className="px-6 py-4 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
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
                        <div className="text-xs text-text-secondary">{asset.id}</div>
                      </td>
                      <td className="px-6 py-5 text-text-secondary">{asset.type}</td>
                      <td className="px-6 py-5">
                        <span
                          className={clsx(
                            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                            statusStyles[asset.status]
                          )}
                        >
                          <span className="h-2 w-2 rounded-full bg-current" />
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-text-secondary">{asset.lastService}</td>
                      <td className="px-6 py-5 font-semibold">{asset.value}</td>
                      <td className="px-6 py-5 text-right text-xs text-accent-primary">Details &gt;</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
        <AssetDetails asset={selected} />
      </div>
    </div>
  );
};

type AssetDetailsProps = {
  asset: Asset | null;
};

const AssetDetails = ({ asset }: AssetDetailsProps) => {
  if (!asset) {
    return (
      <GlassCard className="flex min-h-[420px] items-center justify-center rounded-3xl p-10 text-text-secondary">
        Select an asset to preview its lifecycle.
      </GlassCard>
    );
  }

  return (
    <GlassCard className="flex flex-col gap-6 rounded-3xl p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">Asset Detail</p>
        <h2 className="mt-3 text-2xl font-semibold text-text-primary">{asset.name}</h2>
        <p className="text-sm text-text-secondary">{asset.id}</p>
      </div>
      <div className="space-y-4 text-sm text-text-secondary">
        <DetailRow label="Status">
          <span
            className={clsx(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
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
        <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">Health Score</p>
        <p className="mt-3 text-4xl font-semibold text-text-primary">{asset.health}%</p>
        <div className="mt-4 h-3 rounded-full bg-white/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-secondary to-accent-tertiary shadow-glass"
            style={{ width: `${asset.health}%` }}
          />
        </div>
      </div>
      <button className="mt-auto rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-text-primary hover:bg-white/60">
        View lifecycle timeline
      </button>
    </GlassCard>
  );
};

const DetailRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-xs uppercase tracking-[0.3em] text-text-secondary/80">{label}</span>
    <span className="font-medium text-text-primary">{children}</span>
  </div>
);

export default AssetsPage;
