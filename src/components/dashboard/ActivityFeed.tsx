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
  info: "from-accent-primary to-accent-tertiary",
  success: "from-success to-accent-secondary",
  warning: "from-warning to-danger"
};

type ActivityFeedProps = {
  activities: Activity[];
};

const ActivityFeed = ({ activities }: ActivityFeedProps) => (
  <GlassCard className="rounded-2xl p-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
      <button className="text-sm font-medium text-accent-primary hover:text-accent-tertiary">
        View all
      </button>
    </div>
    <div className="mt-6 space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-4">
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${toneMap[activity.tone]} text-white shadow-glass-sm`}
          >
            <span className="text-sm font-semibold">{activity.tag}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">{activity.title}</p>
              <time className="text-xs uppercase tracking-wide text-text-secondary/80">
                {activity.time}
              </time>
            </div>
            <p className="mt-1 text-sm text-text-secondary">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default ActivityFeed;
