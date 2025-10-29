import clsx from "clsx";
import GlassCard from "../ui/GlassCard";

type Activity = {
  id: number;
  title: string;
  description: string;
  time: string;
  tag: string;
  tone: "info" | "success" | "warning";
};

const toneMap: Record<Activity["tone"], string> = {
  info: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700"
};

type ActivityFeedProps = {
  activities: Activity[];
};

const ActivityFeed = ({ activities }: ActivityFeedProps) => (
  <GlassCard className="rounded-lg p-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
      <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
        View all
      </button>
    </div>
    <div className="mt-6 space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-slate-200 text-sm font-semibold text-slate-600">
            {activity.tag}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
              <time className="text-xs uppercase tracking-wide text-slate-400">{activity.time}</time>
            </div>
            <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
            <div className="mt-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
              <span className={clsx("rounded-full px-2 py-0.5", toneMap[activity.tone])}>
                {activity.tone === "info"
                  ? "Update"
                  : activity.tone === "success"
                  ? "Completed"
                  : "Attention"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default ActivityFeed;
