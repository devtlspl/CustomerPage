import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginPageProps = {
  onLogin: (email: string) => void;
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Enter both your email and password to continue.");
      return;
    }

    setError("");
    onLogin(email);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-50 md:flex-row">
      <aside className="flex flex-1 flex-col justify-between px-8 py-12 md:px-14 lg:px-20">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-lg font-semibold">
              AU
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Aurora</p>
              <p className="text-2xl font-semibold text-white">Client Portal</p>
            </div>
          </div>
          <div className="mt-12 space-y-6">
            <h1 className="text-3xl font-semibold leading-snug text-white md:text-4xl">
              A single home for your enterprise IT partnerships.
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              Aurora’s customer portal keeps device lifecycles, service requests, and billing
              history in one secure space. Monitor support tickets, review compliance timelines,
              and stay on top of renewals—anytime, anywhere.
            </p>
            <div className="space-y-4 text-sm text-slate-300">
              <InfoRow
                title="Rental asset lifecycle"
                description="View contract start and end dates, pickup schedules, and utilization metrics for every leased device."
              />
              <InfoRow
                title="Sale asset portfolio"
                description="Monitor owned inventory, warranty windows, and resale readiness in one streamlined catalog."
              />
              <InfoRow
                title="Unified billing"
                description="Match rental invoices with delivery challans and sales receipts for fast reconciliation."
              />
            </div>
          </div>
        </div>
        <p className="mt-12 text-xs text-slate-500">
          © {new Date().getFullYear()} Aurora Systems. Trusted IT lifecycle partner.
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center bg-white px-8 py-12 text-slate-900 md:px-12 lg:px-20">
        <div className="w-full max-w-md space-y-8">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Customer access</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Sign in to continue</h2>
            <p className="mt-2 text-sm text-slate-600">
              Use your registered business email to unlock the analytics and support tools tailored to your account.
            </p>
          </header>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200" />
                Remember me
              </label>
              <button type="button" className="text-slate-600 hover:text-slate-900">
                Forgot password?
              </button>
            </div>

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Log in
            </button>
          </form>

          <div className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Need an account?</p>
            <p>
              Aurora customers receive login credentials during onboarding. Contact your account
              manager or{" "}
              <a href="mailto:support@aurora.com" className="text-slate-900 underline">
                support@aurora.com
              </a>{" "}
              for access assistance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoRow = ({ title, description }: { title: string; description: string }) => (
  <div>
    <p className="text-sm font-semibold text-white">{title}</p>
    <p className="mt-1 text-xs text-slate-400">{description}</p>
  </div>
);

export default LoginPage;
