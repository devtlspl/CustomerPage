import GlassCard from "../components/ui/GlassCard";

const SupportPage = () => (
  <div className="space-y-10">
    <div>
      <h1 className="text-3xl font-semibold text-text-primary">Support</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Reach the Aurora support team, raise tickets, and manage asset return workflows from a
        single, elegant workspace.
      </p>
    </div>

    <section className="grid gap-6 xl:grid-cols-3">
      <GlassCard className="rounded-3xl p-8">
        <h2 className="text-lg font-semibold text-text-primary">Contact Support</h2>
        <p className="mt-3 text-sm text-text-secondary">
          Connect instantly via chat or schedule a callback with a success specialist.
        </p>
        <div className="mt-6 grid gap-3">
          <button className="rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-3 text-sm font-semibold text-white shadow-glass-sm hover:shadow-xl">
            Live chat now
          </button>
          <button className="rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-text-primary hover:bg-white/60">
            Email support
          </button>
          <button className="rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-text-primary hover:bg-white/60">
            Schedule a call
          </button>
        </div>
        <form className="mt-8 space-y-4 text-sm">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">Subject</label>
            <input
              type="text"
              className="mt-2 w-full rounded-2xl bg-white/60 px-4 py-3 text-text-primary shadow-inner shadow-white/50 outline-none ring-1 ring-white/50 focus:ring-2 focus:ring-accent-primary/60"
              placeholder="Quick summary"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">Message</label>
            <textarea
              rows={4}
              className="mt-2 w-full rounded-2xl bg-white/60 px-4 py-3 text-text-primary shadow-inner shadow-white/50 outline-none ring-1 ring-white/50 focus:ring-2 focus:ring-accent-primary/60"
              placeholder="How can we help today?"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary px-5 py-3 text-sm font-semibold text-white shadow-glass-sm"
          >
            Send
          </button>
        </form>
      </GlassCard>

      <GlassCard className="rounded-3xl p-8">
        <h2 className="text-lg font-semibold text-text-primary">Raise Ticket</h2>
        <p className="mt-3 text-sm text-text-secondary">
          Follow the guided flow to submit a case with relevant context and attachments.
        </p>
        <div className="mt-6 flex items-center gap-3">
          {["Issue", "Details", "Confirm"].map((step, index) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-secondary to-accent-primary text-sm font-semibold text-white">
                {index + 1}
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">{step}</p>
            </div>
          ))}
        </div>
        <form className="mt-8 space-y-5 text-sm">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">Issue type</label>
            <select className="mt-2 w-full rounded-2xl bg-white/60 px-4 py-3 text-text-primary shadow-inner shadow-white/50 outline-none ring-1 ring-white/50 focus:ring-2 focus:ring-accent-primary/60">
              <option>Platform access</option>
              <option>Payment & billing</option>
              <option>Asset maintenance</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">Priority</label>
            <div className="mt-3 flex gap-2">
              {["Low", "Normal", "High"].map((level) => (
                <button
                  key={level}
                  type="button"
                  className="rounded-full border border-white/70 px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-white/60"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">Description</label>
            <textarea
              rows={3}
              className="mt-2 w-full rounded-2xl bg-white/60 px-4 py-3 text-text-primary shadow-inner shadow-white/50 outline-none ring-1 ring-white/50 focus:ring-2 focus:ring-accent-primary/60"
              placeholder="Provide as much detail as possible"
            />
          </div>
          <div className="rounded-2xl border border-dashed border-white/70 bg-white/40 px-4 py-6 text-center text-text-secondary">
            <p>Drag & drop files or browse</p>
            <p className="text-xs text-text-secondary/70">PDF, DOCX, PNG up to 15MB</p>
          </div>
          <button className="w-full rounded-full bg-gradient-to-r from-accent-secondary to-accent-primary px-5 py-3 text-sm font-semibold text-white shadow-glass-sm">
            Review ticket
          </button>
        </form>
      </GlassCard>

      <GlassCard className="rounded-3xl p-8">
        <h2 className="text-lg font-semibold text-text-primary">Return Asset</h2>
        <p className="mt-3 text-sm text-text-secondary">
          Initiate asset collection with integrated logistics scheduling.
        </p>
        <form className="mt-6 space-y-5 text-sm">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">Asset</label>
            <select className="mt-2 w-full rounded-2xl bg-white/60 px-4 py-3 text-text-primary shadow-inner shadow-white/50 outline-none ring-1 ring-white/50 focus:ring-2 focus:ring-accent-primary/60">
              <option>XR-200 Conveyor</option>
              <option>Spectra Scanner</option>
              <option>Nimbus Drone</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">Reason</label>
            <textarea
              rows={3}
              className="mt-2 w-full rounded-2xl bg-white/60 px-4 py-3 text-text-primary shadow-inner shadow-white/50 outline-none ring-1 ring-white/50 focus:ring-2 focus:ring-accent-primary/60"
              placeholder="Explain the reason for return..."
            />
          </div>
          <div className="rounded-2xl border border-dashed border-white/70 bg-white/40 px-4 py-6 text-center text-text-secondary">
            <p>Upload inspection photos</p>
            <p className="text-xs text-text-secondary/70">PNG, JPG up to 10MB</p>
          </div>
          <button className="w-full rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary px-5 py-3 text-sm font-semibold text-white shadow-glass-sm">
            Schedule pickup
          </button>
        </form>
      </GlassCard>
    </section>

    <GlassCard className="rounded-3xl p-8">
      <h2 className="text-lg font-semibold text-text-primary">Support History</h2>
      <div className="mt-6 space-y-6 border-l border-white/40 pl-6 text-sm text-text-secondary">
        {supportEvents.map((event) => (
          <div key={event.title} className="relative pl-4">
            <span
              className="absolute -left-8 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-glass-sm"
            >
              {event.icon}
            </span>
            <p className="text-sm font-semibold text-text-primary">{event.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text-secondary/80">
              {event.date}
            </p>
            <p className="mt-2 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

const supportEvents = [
  {
    title: "Ticket #3420 resolved",
    date: "Sep 1, 2024",
    description: "Response time 1h 24m - Resolved by Maya (Tier 2)",
    icon: "OK"
  },
  {
    title: "Asset return scheduled",
    date: "Aug 25, 2024",
    description: "XR-200 pick-up confirmed for Aug 28, 2024 at 09:00 AM.",
    icon: "RT"
  },
  {
    title: "New guidance shared",
    date: "Aug 18, 2024",
    description: "Sent documentation on API access scopes and audit logging.",
    icon: "IN"
  }
] as const;

export default SupportPage;
