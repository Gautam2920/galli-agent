import { ComponentType } from 'react';
import { Database } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ComponentType<{ className?: string }>;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Database,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl bg-bg-base border border-border-subtle shadow-flat">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-surface border border-border-subtle shadow-flat">
        <Icon className="h-5 w-5 text-text-muted" />
      </div>
      <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mt-4">{title}</h4>
      <p className="text-[11px] text-text-secondary mt-1 max-w-xs leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-lg text-[10px] font-bold text-button-primary-text bg-accent-indigo hover:bg-accent-purple active:scale-98 transition-all duration-200 shadow-flat"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
