import { Compass, Home } from 'lucide-react';

export function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-base p-6">
      <div className="max-w-md w-full rounded-2xl border border-border-subtle bg-bg-surface p-8 shadow-overlay text-center flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-indigo/10 border border-accent-indigo/25 text-accent-indigo shadow-flat">
          <Compass className="h-6 w-6" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary mt-6">404</h1>
        <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mt-2">
          Resource Not Found
        </h2>
        <p className="text-xs text-text-secondary mt-3 leading-relaxed max-w-xs">
          The routing coordinates you specified do not map to any active telemetry dashboard page.
        </p>

        <button
          onClick={handleGoHome}
          className="mt-8 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-button-primary-text bg-accent-indigo hover:bg-accent-purple active:scale-97 transition-all duration-200 shadow-card border border-accent-indigo/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        >
          <Home className="h-4 w-4" />
          <span>Return to Terminal</span>
        </button>
      </div>
    </div>
  );
}
export default NotFoundPage;
