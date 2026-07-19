import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-bg-base p-6">
          <div className="max-w-xl w-full rounded-2xl border border-border-subtle bg-bg-surface p-8 shadow-overlay">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-rose/10 border border-accent-rose/25 text-accent-rose shadow-flat">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <h2 className="text-xl font-bold text-text-primary tracking-tight uppercase mt-6">
              Application Failure
            </h2>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">
              An unexpected runtime error occurred inside the layout client engine.
            </p>

            {this.state.error && (
              <div className="mt-6 rounded-xl border border-border-subtle bg-bg-base p-4 overflow-hidden">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mb-2 font-mono">
                  Error Diagnostics
                </span>
                <pre className="text-[11px] text-accent-rose font-mono overflow-x-auto whitespace-pre-wrap">
                  {this.state.error.stack || this.state.error.message}
                </pre>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="mt-8 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-button-primary-text bg-accent-rose hover:bg-accent-rose/90 active:scale-97 transition-all duration-200 shadow-card border border-accent-rose/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            >
              <RefreshCw className="h-4 w-4 animate-spin-hover" />
              <span>Reset & Reload Engine</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
