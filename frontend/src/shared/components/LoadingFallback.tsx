import { Loader2 } from 'lucide-react';

export function LoadingFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-base p-6">
      <div className="max-w-md w-full rounded-2xl border border-border-subtle bg-bg-surface p-8 shadow-card flex flex-col items-center justify-center text-center">
        <div className="relative flex items-center justify-center h-12 w-12 rounded-xl bg-bg-base border border-border-subtle shadow-flat">
          <Loader2 className="h-5 w-5 text-accent-indigo animate-spin" />
        </div>
        <h3 className="text-sm font-bold text-text-primary mt-4 tracking-tight uppercase">
          Loading Platform
        </h3>
        <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
          Retrieving agent coordinates and route configurations...
        </p>
      </div>
    </div>
  );
}
