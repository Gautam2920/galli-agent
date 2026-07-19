import { useState, useEffect, Suspense } from 'react';
import {
  Truck,
  MapPin,
  Activity,
  FileText,
  Terminal,
  Sparkles,
  Compass,
  Database,
  Layers,
  ChevronRight,
  Settings,
  Clock,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { OfflineFallback } from '@/shared/components/OfflineFallback';
import { DispatchSetupModule, useDispatchStore } from '@/features/dispatch';
import { LazyMap } from '@/features/map';

type TabType = 'setup' | 'decision' | 'telemetry' | 'map' | 'developer';

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('setup');
  const [isDevModeOpen, setIsDevModeOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { analysisResult, isAnalyzing } = useDispatchStore();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  useEffect(() => {
    if (analysisResult) {
      setActiveTab('decision');
    }
  }, [analysisResult]);
  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col font-sans selection:bg-accent-indigo/20 antialiased">
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        .animate-dash {
          stroke-dasharray: 8, 4;
          animation: dash 12s linear infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
      `}</style>

      <div className="flex flex-1">
        <aside
          className={`hidden md:flex flex-col border-r border-border-subtle bg-bg-surface transition-all duration-300 ${
            isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="h-16 flex items-center gap-3 px-6 border-b border-border-subtle bg-bg-surface/50 backdrop-blur-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-button-primary-bg text-button-primary-text shadow-card border border-border-hover transition-transform duration-250 hover:scale-105">
              <Truck className="h-4.5 w-4.5" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-wider uppercase leading-none text-text-primary">
                  Galli Agent
                </span>
                <span className="text-[8px] font-bold text-text-muted mt-1 uppercase tracking-widest">
                  Intelligence System
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 px-4 py-8 flex flex-col gap-8 overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              {!isSidebarCollapsed && (
                <span className="px-3 text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">
                  Workspace
                </span>
              )}
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 bg-bg-base text-accent-indigo border-l-2 border-accent-indigo shadow-flat hover:translate-x-0.5">
                <Activity className="h-4 w-4 text-accent-indigo" />
                {!isSidebarCollapsed && <span>Decision Terminal</span>}
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary hover:translate-x-0.5 transition-all duration-200">
                <Compass className="h-4 w-4 text-text-muted" />
                {!isSidebarCollapsed && <span>Control Center</span>}
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {!isSidebarCollapsed && (
                <span className="px-3 text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">
                  Engine Insights
                </span>
              )}
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary hover:translate-x-0.5 transition-all duration-200">
                <Database className="h-4 w-4 text-text-muted" />
                {!isSidebarCollapsed && <span>Telemetry Feeds</span>}
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary hover:translate-x-0.5 transition-all duration-200">
                <Truck className="h-4 w-4 text-text-muted" />
                {!isSidebarCollapsed && <span>Fleet Logistics</span>}
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary hover:translate-x-0.5 transition-all duration-200">
                <Layers className="h-4 w-4 text-text-muted" />
                {!isSidebarCollapsed && <span>Engine Reports</span>}
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {!isSidebarCollapsed && (
                <span className="px-3 text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">
                  Platform
                </span>
              )}
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary hover:translate-x-0.5 transition-all duration-200">
                <MapPin className="h-4 w-4 text-text-muted" />
                {!isSidebarCollapsed && <span>Geospatial view</span>}
              </button>
              <button
                onClick={() => setIsDevModeOpen(!isDevModeOpen)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary hover:translate-x-0.5 transition-all duration-200"
              >
                <Terminal className="h-4 w-4 text-text-muted" />
                {!isSidebarCollapsed && <span>Developer Access</span>}
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-bg-base hover:text-text-primary hover:translate-x-0.5 transition-all duration-200">
                <Settings className="h-4 w-4 text-text-muted" />
                {!isSidebarCollapsed && <span>Settings</span>}
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-border-subtle bg-bg-surface/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-base border border-border-subtle shadow-card">
              <div className="h-8 w-8 rounded-lg bg-button-primary-bg text-button-primary-text flex items-center justify-center font-bold text-xs shadow-flat border border-border-hover">
                G
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-xs tracking-tight truncate">User</span>
                  <span className="text-[9px] font-bold text-accent-emerald flex items-center gap-1 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald inline-block animate-pulse" />
                    Developer Mode
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold text-text-muted hover:text-text-primary hover:bg-bg-base transition-all duration-200"
            >
              <span>{isSidebarCollapsed ? 'Expand' : 'Collapse Sidebar'}</span>
              <ChevronRight
                className={`h-3.5 w-3.5 transform transition-transform duration-300 ${isSidebarCollapsed ? '' : 'rotate-180'}`}
              />
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 flex items-center justify-between px-8 bg-bg-surface/90 border-b border-border-subtle backdrop-blur-md sticky top-0 z-40">
            <div className="flex flex-col">
              <h1 className="text-sm font-bold tracking-tight uppercase text-text-primary">
                Greetings, User
              </h1>
              <p className="text-[9px] text-text-muted font-bold tracking-widest uppercase mt-0.5">
                Ready to make smart logistics decisions
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-base border border-border-subtle shadow-flat transition-all hover:bg-bg-surface ${isOnline ? 'text-accent-emerald' : 'text-accent-rose'}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full inline-block ${isOnline ? 'bg-accent-emerald animate-pulse' : 'bg-accent-rose'}`}
                />
                <span className="text-[9px] font-bold tracking-wider uppercase">
                  {isOnline ? 'Engine Active' : 'Offline'}
                </span>
              </div>

              <div className="h-8 w-8 rounded-lg bg-button-primary-bg text-button-primary-text flex items-center justify-center font-bold text-xs shadow-flat border border-border-subtle">
                G
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            {!isOnline ? (
              <OfflineFallback />
            ) : (
              <>
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 max-w-7xl mx-auto items-start">
                  <main className="lg:col-span-8 flex flex-col gap-10">
                    <div className="relative overflow-hidden rounded-2xl border border-accent-indigo/15 bg-gradient-to-br from-white via-[#FCFAF8] to-bg-base/30 p-8 shadow-overlay hover:shadow-[0_32px_80px_-16px_rgba(36,32,56,0.12)] transition-all duration-300 group">
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex-1 max-w-md">
                          <div className="flex items-center gap-2 text-text-muted">
                            <Activity className="h-4 w-4 text-accent-indigo" />
                            <span className="text-[9px] font-bold uppercase tracking-wider">
                              Decision Context
                            </span>
                          </div>
                          {isAnalyzing ? (
                            <>
                              <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mt-3 leading-tight animate-pulse">
                                Analyzing Dispatch Pipeline
                              </h2>
                              <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                                Sub-agents are evaluating routing complexity, weather risk, partner score, and congestion levels.
                              </p>
                            </>
                          ) : analysisResult ? (
                            <>
                              <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mt-3 leading-tight">
                                Decision: {analysisResult.decision}
                              </h2>
                              <p className="text-xs text-text-secondary mt-3 leading-relaxed font-semibold">
                                Confidence: {analysisResult.confidence}%
                              </p>
                              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                {analysisResult.operationalSummary.overallAssessment}
                              </p>
                            </>
                          ) : (
                            <>
                              <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mt-3 leading-tight">
                                Awaiting Dispatch Analysis
                              </h2>
                              <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                                Input delivery coordinates to execute the multi-agent decision model and verify route telemetry.
                              </p>
                            </>
                          )}
                        </div>

                        <div className="w-full md:w-60 h-28 md:h-40 rounded-xl bg-bg-base border border-border-subtle flex items-center justify-center overflow-hidden shadow-flat relative p-4">
                          <div className="absolute inset-0 opacity-15 pointer-events-none">
                            <svg
                              viewBox="0 0 200 120"
                              className="w-full h-full text-accent-indigo"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <line
                                x1="20"
                                y1="10"
                                x2="20"
                                y2="110"
                                strokeDasharray="2 2"
                                stroke="var(--color-border-hover)"
                              />
                              <line
                                x1="80"
                                y1="10"
                                x2="80"
                                y2="110"
                                strokeDasharray="2 2"
                                stroke="var(--color-border-hover)"
                              />
                              <line
                                x1="140"
                                y1="10"
                                x2="140"
                                y2="110"
                                strokeDasharray="2 2"
                                stroke="var(--color-border-hover)"
                              />
                              <path
                                d="M20,90 C80,90 140,30 180,30"
                                className="animate-dash"
                                strokeWidth="1.5"
                                stroke="var(--color-accent-indigo)"
                              />
                              <circle cx="20" cy="90" r="4" fill="var(--color-accent-indigo)" />
                              <circle cx="80" cy="90" r="3" fill="var(--color-accent-purple)" />
                              <circle cx="140" cy="30" r="3" fill="var(--color-accent-indigo)" />
                              <circle cx="180" cy="30" r="4" fill="var(--color-accent-purple)" />
                            </svg>
                          </div>
                          <div className="relative flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-bg-surface shadow-card border border-border-subtle relative">
                              <span className="absolute inset-0 rounded-full border border-accent-indigo/30 animate-pulse-ring" />
                              <Activity className={`h-5 w-5 ${isAnalyzing ? 'text-accent-purple animate-spin' : 'text-accent-indigo'}`} />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted mt-3">
                              {isAnalyzing ? 'Pipeline Processing' : analysisResult ? 'Pipeline Complete' : 'Pipeline Idle'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-8 shadow-card hover:shadow-overlay transition-all duration-300">
                      <div className="flex items-center gap-2 text-text-muted mb-4">
                        <Sparkles className="h-4 w-4 text-accent-indigo" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">
                          Gemini AI Explanation
                        </span>
                      </div>
                      {isAnalyzing ? (
                        <div className="p-10 rounded-xl bg-bg-base/50 border border-border-subtle flex flex-col items-center justify-center text-center shadow-flat">
                          <FileText className="h-7 w-7 text-text-muted mb-3 animate-bounce" />
                          <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
                            Synthesizing explanation from sub-agent analysis feeds...
                          </p>
                        </div>
                      ) : analysisResult?.aiExplanation ? (
                        <div className="p-6 rounded-xl bg-bg-base/50 border border-border-subtle shadow-flat text-left">
                          <p className="text-xs text-text-primary leading-relaxed whitespace-pre-line">
                            {analysisResult.aiExplanation}
                          </p>
                        </div>
                      ) : (
                        <div className="p-10 rounded-xl bg-bg-base/50 border border-border-subtle flex flex-col items-center justify-center text-center shadow-flat">
                          <FileText className="h-7 w-7 text-text-muted mb-3 animate-pulse" />
                          <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
                            AI-generated operational assessment paragraph will appear here after executing dispatch analysis.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-8 shadow-card hover:shadow-overlay transition-all duration-300">
                      <div className="flex items-center gap-2 text-text-muted mb-8">
                        <Activity className="h-4 w-4 text-text-muted" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">
                          Decision Timeline
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative px-4">
                        <div className="absolute top-[20px] left-[40px] right-[40px] h-0.5 border-t border-dashed border-border-subtle hidden md:block" />

                        <div className="flex items-center gap-4 md:flex-col md:text-center md:gap-3 relative z-10">
                          <div className="h-8 w-8 rounded-full bg-accent-indigo text-white flex items-center justify-center text-xs font-bold shadow-glow border border-accent-indigo/20 ring-4 ring-accent-indigo/10">
                            1
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold tracking-tight text-text-primary">
                              Input Captured
                            </span>
                            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                              Details Verified
                            </span>
                          </div>
                        </div>

                        <div className={`flex items-center gap-4 md:flex-col md:text-center md:gap-3 relative z-10 transition-all duration-300 ${isAnalyzing || analysisResult ? '' : 'opacity-40'}`}>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border ${isAnalyzing ? 'bg-accent-purple text-white animate-pulse border-accent-purple/20' : analysisResult ? 'bg-accent-indigo text-white border-accent-indigo/20' : 'bg-bg-base border-border-subtle text-text-secondary'}`}>
                            2
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold tracking-tight text-text-primary">
                              Route Planning
                            </span>
                            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                              {isAnalyzing ? 'Calculating...' : analysisResult ? 'Optimal Found' : 'Awaiting'}
                            </span>
                          </div>
                        </div>

                        <div className={`flex items-center gap-4 md:flex-col md:text-center md:gap-3 relative z-10 transition-all duration-300 ${analysisResult ? '' : 'opacity-40'}`}>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border ${isAnalyzing ? 'bg-accent-purple/50 text-white animate-pulse border-accent-purple/10' : analysisResult ? 'bg-accent-indigo text-white border-accent-indigo/20' : 'bg-bg-base border-border-subtle text-text-secondary'}`}>
                            3
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold tracking-tight text-text-primary">
                              Risk Analysis
                            </span>
                            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                              {isAnalyzing ? 'Evaluating...' : analysisResult ? 'Factors Assessed' : 'Awaiting'}
                            </span>
                          </div>
                        </div>

                        <div className={`flex items-center gap-4 md:flex-col md:text-center md:gap-3 relative z-10 transition-all duration-300 ${analysisResult ? '' : 'opacity-40'}`}>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border ${analysisResult ? 'bg-accent-indigo text-white border-accent-indigo/20' : 'bg-bg-base border-border-subtle text-text-secondary'}`}>
                            4
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold tracking-tight text-text-primary">
                              Scoring
                            </span>
                            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                              {analysisResult ? 'Options Scored' : 'Awaiting'}
                            </span>
                          </div>
                        </div>

                        <div className={`flex items-center gap-4 md:flex-col md:text-center md:gap-3 relative z-10 transition-all duration-300 ${analysisResult ? '' : 'opacity-40'}`}>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border ${analysisResult ? 'bg-accent-indigo text-white border-accent-indigo/20' : 'bg-bg-base border-border-subtle text-text-secondary'}`}>
                            5
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold tracking-tight text-text-primary">
                              Decision Ready
                            </span>
                            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-0.5">
                              {analysisResult ? 'Results Ready' : 'Awaiting'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 flex flex-col justify-between h-28 shadow-card hover:shadow-overlay hover:-translate-y-0.5 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                            Distance
                          </span>
                          <MapPin className="h-4 w-4 text-text-muted group-hover:text-accent-indigo transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                            {analysisResult ? `${analysisResult.route.distanceKilometers.toFixed(1)} km` : '— km'}
                          </span>
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-1">
                            Route Length
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 flex flex-col justify-between h-28 shadow-card hover:shadow-overlay hover:-translate-y-0.5 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                            Duration
                          </span>
                          <Clock className="h-4 w-4 text-text-muted group-hover:text-accent-indigo transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                            {analysisResult ? `${analysisResult.route.estimatedMinutes} min` : '— min'}
                          </span>
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-1">
                            Travel Time
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 flex flex-col justify-between h-28 shadow-card hover:shadow-overlay hover:-translate-y-0.5 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                            Confidence
                          </span>
                          <Shield className="h-4 w-4 text-text-muted group-hover:text-accent-indigo transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                            {analysisResult ? `${analysisResult.confidence}%` : '— %'}
                          </span>
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-1">
                            Engine Trust
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 flex flex-col justify-between h-28 shadow-card hover:shadow-overlay hover:-translate-y-0.5 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                            Risk Level
                          </span>
                          <AlertTriangle className="h-4 w-4 text-text-muted group-hover:text-accent-indigo transition-colors duration-200" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold tracking-tight text-text-primary mt-1">
                            {analysisResult ? analysisResult.risk.level : '—'}
                          </span>
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-1">
                            Risk Factors
                          </span>
                        </div>
                      </div>
                    </div>

                    {analysisResult && (
                      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-8 shadow-card hover:shadow-overlay transition-all duration-300">
                        <div className="flex items-center gap-2 text-text-muted mb-6">
                          <Layers className="h-4 w-4 text-accent-indigo" />
                          <span className="text-[9px] font-bold uppercase tracking-wider">
                            Sub-Agent Intelligence Reports
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-5 rounded-xl bg-bg-base/30 border border-border-subtle shadow-flat">
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <Compass className="h-3.5 w-3.5 text-accent-indigo" />
                              Routing Agent
                            </h4>
                            <p className="text-lg font-extrabold text-text-primary mt-2">
                              Complexity: {analysisResult.route.complexity}
                            </p>
                            <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                              {analysisResult.route.reason}
                            </p>
                          </div>

                          <div className="p-5 rounded-xl bg-bg-base/30 border border-border-subtle shadow-flat">
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <Activity className="h-3.5 w-3.5 text-accent-purple" />
                              Traffic Agent
                            </h4>
                            <p className="text-lg font-extrabold text-text-primary mt-2">
                              Congestion Level: {analysisResult.traffic.congestionLevel}/10
                            </p>
                            <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                              {analysisResult.traffic.reason}
                            </p>
                          </div>

                          <div className="p-5 rounded-xl bg-bg-base/30 border border-border-subtle shadow-flat">
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-accent-purple" />
                              Weather Agent
                            </h4>
                            <p className="text-lg font-extrabold text-text-primary mt-2">
                              {analysisResult.weather.condition} ({analysisResult.weather.temperature.toFixed(1)}°C)
                            </p>
                            <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                              {analysisResult.weather.reason}
                            </p>
                          </div>

                          <div className="p-5 rounded-xl bg-bg-base/30 border border-border-subtle shadow-flat">
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <Truck className="h-3.5 w-3.5 text-accent-indigo" />
                              Partner Scorer Agent
                            </h4>
                            <p className="text-lg font-extrabold text-text-primary mt-2">
                              {analysisResult.partner.name} (★ {analysisResult.partner.rating.toFixed(1)})
                            </p>
                            <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                              {analysisResult.partner.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </main>

                  <aside className="lg:col-span-4 flex flex-col gap-10">
                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-overlay">
                      <div className="flex items-center gap-2 text-text-muted mb-6">
                        <Compass className="h-4 w-4 text-text-muted" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">
                          Dispatch Input & Presets
                        </span>
                      </div>
                      <DispatchSetupModule />
                    </div>

                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card hover:shadow-overlay transition-all duration-300">
                      <div className="flex items-center gap-2 text-text-muted mb-4">
                        <Truck className="h-3.5 w-3.5 text-text-muted" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">
                          Spatial Verification Map
                        </span>
                      </div>
                      <div className="h-60 rounded-xl bg-bg-base border border-border-subtle overflow-hidden shadow-flat relative">
                        <Suspense fallback={
                          <div className="flex items-center justify-center w-full h-full bg-bg-base">
                            <span className="text-xs text-text-muted animate-pulse">Loading map engine...</span>
                          </div>
                        }>
                          <LazyMap />
                        </Suspense>
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="hidden md:flex lg:hidden flex-col gap-6 max-w-4xl mx-auto">
                  <section className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                      Setup Parameters
                    </h2>
                    <DispatchSetupModule />
                  </section>

                  <section className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                      Executive Summary
                    </h2>
                    {isAnalyzing ? (
                      <p className="text-xs text-text-secondary animate-pulse">
                        Analyzing dispatch pipeline feeds...
                      </p>
                    ) : analysisResult ? (
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-bold text-text-primary">
                          Decision: {analysisResult.decision} (Confidence: {analysisResult.confidence}%)
                        </p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {analysisResult.operationalSummary.overallAssessment}
                        </p>
                        {analysisResult.aiExplanation && (
                          <p className="text-xs text-text-secondary leading-relaxed mt-2 border-t border-border-subtle pt-2 whitespace-pre-line">
                            {analysisResult.aiExplanation}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-text-secondary">
                        Awaiting dispatch setup and engine analysis.
                      </p>
                    )}
                  </section>

                  <div className="grid grid-cols-2 gap-6">
                    <section className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                        Map Verification
                      </h2>
                      <div className="h-64 rounded-xl bg-bg-base border border-border-subtle overflow-hidden relative">
                        <Suspense fallback={
                          <div className="flex items-center justify-center w-full h-full">
                            <span className="text-xs text-text-muted">Loading map...</span>
                          </div>
                        }>
                          <LazyMap />
                        </Suspense>
                      </div>
                    </section>
                    <section className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                        Telemetry Metrics
                      </h2>
                      {analysisResult ? (
                        <div className="flex flex-col gap-3 text-xs">
                          <div className="flex justify-between border-b border-border-subtle pb-1">
                            <span className="text-text-secondary font-medium">Distance:</span>
                            <span className="font-bold text-text-primary">{analysisResult.route.distanceKilometers.toFixed(1)} km</span>
                          </div>
                          <div className="flex justify-between border-b border-border-subtle pb-1">
                            <span className="text-text-secondary font-medium">Duration:</span>
                            <span className="font-bold text-text-primary">{analysisResult.route.estimatedMinutes} min</span>
                          </div>
                          <div className="flex justify-between border-b border-border-subtle pb-1">
                            <span className="text-text-secondary font-medium">Risk Level:</span>
                            <span className="font-bold text-text-primary">{analysisResult.risk.level}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary font-medium">Fulfillment Partner:</span>
                            <span className="font-bold text-text-primary">{analysisResult.partner.name}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-text-secondary">
                          No active telemetry data available.
                        </p>
                      )}
                    </section>
                  </div>
                </div>

                <div className="block md:hidden max-w-md mx-auto pb-20">
                  {activeTab === 'setup' && (
                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                      <div className="flex items-center gap-2 text-text-muted mb-6">
                        <Compass className="h-4 w-4 text-text-muted" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">
                          Dispatch Setup
                        </span>
                      </div>
                      <DispatchSetupModule />
                    </div>
                  )}

                  {activeTab === 'decision' && (
                    <div className="flex flex-col gap-6">
                      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                          Decision Suggestions
                        </h2>
                        {isAnalyzing ? (
                          <p className="text-xs text-text-secondary animate-pulse">
                            Processing decision parameters...
                          </p>
                        ) : analysisResult ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold text-text-primary">
                              {analysisResult.decision}
                            </p>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {analysisResult.operationalSummary.overallAssessment}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-text-secondary">
                            Awaiting analysis results.
                          </p>
                        )}
                      </div>
                      <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                          Timeline Logic
                        </h2>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <span className="h-6 w-6 rounded-full bg-accent-indigo text-white flex items-center justify-center text-xs font-bold">1</span>
                            <span className="text-xs font-bold text-text-primary">Input Captured</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${isAnalyzing || analysisResult ? 'bg-accent-indigo text-white' : 'bg-bg-base text-text-secondary'}`}>2</span>
                            <span className="text-xs font-bold text-text-primary">Route Planning</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${analysisResult ? 'bg-accent-indigo text-white' : 'bg-bg-base text-text-secondary'}`}>3</span>
                            <span className="text-xs font-bold text-text-primary">Risk Analysis</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${analysisResult ? 'bg-accent-indigo text-white' : 'bg-bg-base text-text-secondary'}`}>4</span>
                            <span className="text-xs font-bold text-text-primary">Scoring Options</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${analysisResult ? 'bg-accent-indigo text-white' : 'bg-bg-base text-text-secondary'}`}>5</span>
                            <span className="text-xs font-bold text-text-primary">Decision Ready</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'telemetry' && (
                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                        Telemetry Breakdown
                      </h2>
                      {analysisResult ? (
                        <div className="flex flex-col gap-4 text-xs">
                          <div className="flex flex-col gap-1 border-b border-border-subtle pb-2">
                            <span className="font-bold text-text-primary uppercase tracking-wider text-[10px]">Routing</span>
                            <span className="text-text-secondary">Distance: {analysisResult.route.distanceKilometers.toFixed(1)} km</span>
                            <span className="text-text-secondary">Duration: {analysisResult.route.estimatedMinutes} min</span>
                            <span className="text-[10px] text-text-muted mt-1 leading-relaxed">{analysisResult.route.reason}</span>
                          </div>
                          <div className="flex flex-col gap-1 border-b border-border-subtle pb-2">
                            <span className="font-bold text-text-primary uppercase tracking-wider text-[10px]">Traffic</span>
                            <span className="text-text-secondary">Congestion: {analysisResult.traffic.congestionLevel}/10</span>
                            <span className="text-[10px] text-text-muted mt-1 leading-relaxed">{analysisResult.traffic.reason}</span>
                          </div>
                          <div className="flex flex-col gap-1 border-b border-border-subtle pb-2">
                            <span className="font-bold text-text-primary uppercase tracking-wider text-[10px]">Weather</span>
                            <span className="text-text-secondary">Condition: {analysisResult.weather.condition} ({analysisResult.weather.temperature.toFixed(1)}°C)</span>
                            <span className="text-[10px] text-text-muted mt-1 leading-relaxed">{analysisResult.weather.reason}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-text-primary uppercase tracking-wider text-[10px]">Partner</span>
                            <span className="text-text-secondary">Name: {analysisResult.partner.name} (★ {analysisResult.partner.rating.toFixed(1)})</span>
                            <span className="text-[10px] text-text-muted mt-1 leading-relaxed">{analysisResult.partner.reason}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-text-secondary">
                          No active telemetry data available.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === 'map' && (
                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                        Location Map
                      </h2>
                      <div className="mt-4 h-96 rounded-xl bg-bg-base border border-border-subtle overflow-hidden relative">
                        <Suspense fallback={
                          <div className="flex items-center justify-center w-full h-full bg-bg-base">
                            <span className="text-xs text-text-muted animate-pulse">Loading map engine...</span>
                          </div>
                        }>
                          <LazyMap />
                        </Suspense>
                      </div>
                    </div>
                  )}

                  {activeTab === 'developer' && (
                    <div className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-card">
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                        Technical Details
                      </h2>
                      <pre className="text-[10px] text-text-secondary font-mono bg-bg-base p-4 rounded-xl border border-border-subtle overflow-x-auto shadow-flat">
                        {analysisResult
                          ? JSON.stringify(analysisResult, null, 2)
                          : JSON.stringify({ status: isAnalyzing ? "processing" : "idle", active_agents: 7, cached_calculations: 0 }, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-subtle bg-bg-surface md:hidden">
        <div className="flex h-16 items-center justify-around px-2">
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex flex-col items-center justify-center gap-1 w-12 transition-all duration-200 ${
              activeTab === 'setup'
                ? 'text-accent-indigo border-t-2 border-accent-indigo'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('decision')}
            className={`flex flex-col items-center justify-center gap-1 w-12 transition-all duration-200 ${
              activeTab === 'decision'
                ? 'text-accent-indigo border-t-2 border-accent-indigo'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Decision</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex flex-col items-center justify-center gap-1 w-12 transition-all duration-200 ${
              activeTab === 'telemetry'
                ? 'text-accent-indigo border-t-2 border-accent-indigo'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Activity className="h-5 w-5" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Telemetry</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center justify-center gap-1 w-12 transition-all duration-200 ${
              activeTab === 'map'
                ? 'text-accent-indigo border-t-2 border-accent-indigo'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Truck className="h-5 w-5" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Map</span>
          </button>
          <button
            onClick={() => setActiveTab('developer')}
            className={`flex flex-col items-center justify-center gap-1 w-12 transition-all duration-200 ${
              activeTab === 'developer'
                ? 'text-accent-indigo border-t-2 border-accent-indigo'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Terminal className="h-5 w-5" />
            <span className="text-[9px] font-bold tracking-wide uppercase">Dev</span>
          </button>
        </div>
      </nav>

      <footer className="hidden lg:block fixed bottom-0 left-0 right-0 z-40 bg-bg-surface border-t border-border-subtle transition-all duration-300">
        <div className="flex h-10 items-center justify-between px-6 text-[10px] text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
            <span className="font-semibold">Ready for Analysis</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">v1.0.0</span>
            <button
              onClick={() => setIsDevModeOpen(!isDevModeOpen)}
              className="flex items-center gap-1 font-semibold text-text-primary hover:text-accent-indigo transition-colors duration-200"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Developer Mode</span>
            </button>
          </div>
        </div>
        {isDevModeOpen && (
          <div className="h-48 border-t border-border-subtle p-6 bg-bg-base overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <span className="text-xs font-semibold text-text-primary block mb-2 font-mono">
                Raw Engine Telemetry
              </span>
              <pre className="text-[11px] text-text-secondary font-mono bg-bg-surface p-4 rounded-xl border border-border-subtle overflow-x-auto shadow-flat">
                {analysisResult
                  ? JSON.stringify(analysisResult, null, 2)
                  : JSON.stringify({ status: isAnalyzing ? "processing" : "idle", active_agents: 7, cached_calculations: 0 }, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </footer>
      <div className="hidden lg:block h-10" />
    </div>
  );
}
