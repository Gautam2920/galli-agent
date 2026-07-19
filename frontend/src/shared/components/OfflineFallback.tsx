import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineFallbackProps {
  onRetry?: () => void;
}

export function OfflineFallback({ onRetry }: OfflineFallbackProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 lg:p-12 min-h-[50vh]">
      <div className="max-w-md w-full rounded-2xl border border-border-subtle bg-bg-surface p-8 shadow-overlay text-center flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-rose/10 border border-accent-rose/25 text-accent-rose shadow-flat animate-pulse">
          <WifiOff className="h-6 w-6" />
        </div>

        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mt-6">
          Intelligence Engine Offline
        </h3>
        <p className="text-xs text-text-secondary mt-3 leading-relaxed">
          Galli Agent requires an active network connection to compile live routes, evaluate weather
          hazards, and coordinate telemetry with backend partner nodes.
        </p>

        <button
          onClick={handleRetry}
          className="mt-8 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-button-primary-text bg-accent-indigo hover:bg-accent-purple active:scale-97 transition-all duration-200 shadow-card border border-accent-indigo/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
}
export default OfflineFallback;
