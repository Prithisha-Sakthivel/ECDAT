import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  User, 
  Sparkles,
  Activity,
  Clock
} from 'lucide-react';
import { DEMO_ORGANIZATION, SYNTHETIC_ENV_DISCLAIMER } from '../../data/mockData';
import { EnvironmentType } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentTab,
    activeEnv, 
    setActiveEnv, 
    setIsSearchOpen, 
    setIsNotificationsOpen, 
    setIsCopilotOpen,
    viewMode,
    toggleViewMode,
    isGuidedDemoActive,
    startGuidedDemo
  } = useApp();

  const environments: EnvironmentType[] = ['Production', 'Staging', 'Development'];

  // Breadcrumb mappings according to enterprise cybersecurity hierarchy
  const tabMetadata: Record<string, { group: string; label: string }> = {
    overview: { group: 'POSTURE', label: 'Enterprise Overview' },
    inventory: { group: 'DISCOVERY', label: 'Cryptographic Inventory' },
    discovery: { group: 'DISCOVERY', label: 'Discovery Sources & Scanning' },
    unknown: { group: 'DISCOVERY', label: 'Artefact Classification' },
    graph: { group: 'ANALYSIS', label: 'Cryptographic Dependency Graph' },
    risk: { group: 'ANALYSIS', label: 'Quantum Risk Intelligence' },
    'attack-surface': { group: 'ANALYSIS', label: 'Cryptographic Attack Surface' },
    reports: { group: 'ANALYSIS', label: 'Cryptographic Bill of Materials (CBOM)' },
    recommendations: { group: 'PLANNING', label: 'NIST PQC Recommendation Engine' },
    simulator: { group: 'PLANNING', label: 'What-If Impact Simulator' },
    roadmap: { group: 'PLANNING', label: 'Migration Roadmap' },
    policy: { group: 'GOVERNANCE', label: 'Cryptographic Policy Engine' },
    ledger: { group: 'ASSURANCE', label: 'Cryptographic Evidence Ledger' },
    trace: { group: 'GOVERNANCE', label: 'Visual Decision Trace' },
    settings: { group: 'SYSTEM', label: 'Security & Policy Settings' },
  };

  const meta = tabMetadata[currentTab] || { group: 'POSTURE', label: 'Enterprise Posture' };

  return (
    <header className="h-12 bg-defense-900 border-b border-defense-700/80 px-4 flex items-center justify-between select-none z-30 shrink-0">
      {/* Left: Breadcrumb & Current Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
          <span className="text-slate-500 font-semibold tracking-wider">{meta.group}</span>
          <span className="text-slate-600">/</span>
          <h2 className="text-slate-200 font-medium tracking-tight truncate">{meta.label}</h2>
        </div>

        <span className="hidden sm:inline-block h-3.5 w-px bg-defense-700 mx-1" />

        {/* Target Organization context */}
        <span className="hidden lg:inline-flex text-[11px] font-mono text-slate-400">
          Org: <span className="text-slate-300 ml-1 font-medium">{DEMO_ORGANIZATION}</span>
        </span>
      </div>

      {/* Center: Enterprise Posture Indicator, ViewMode Switch, & Search */}
      <div className="flex items-center gap-2.5">
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-0.5 rounded border border-defense-700 bg-defense-850 text-[11px] font-mono">
          <span className="text-slate-400">Enterprise Cryptographic Posture</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        {/* View Mode Switch (Executive vs Analyst) */}
        <div className="flex items-center bg-defense-850 border border-defense-700 rounded p-0.5 text-[10px] font-mono">
          <button
            onClick={() => toggleViewMode()}
            className={`px-2 py-0.5 rounded transition-colors ${
              viewMode === 'executive' 
                ? 'bg-cyan-900/60 text-cyan-200 font-bold border border-cyan-600/50' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Executive View Mode"
          >
            EXEC
          </button>
          <button
            onClick={() => toggleViewMode()}
            className={`px-2 py-0.5 rounded transition-colors ${
              viewMode === 'analyst' 
                ? 'bg-slate-700 text-slate-100 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Analyst Technical View Mode"
          >
            ANALYST
          </button>
        </div>

        {/* Guided Tour Presentation Trigger */}
        <button
          onClick={() => startGuidedDemo()}
          className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
            isGuidedDemoActive 
              ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400' 
              : 'bg-defense-800 hover:bg-defense-750 border border-cyan-500/40 text-cyan-300'
          }`}
          title="Start 8-step guided evaluation walkthrough"
        >
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span className="hidden sm:inline">GUIDED TOUR</span>
        </button>

        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1 rounded border border-defense-700 bg-defense-850 hover:bg-defense-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          title="Search artefacts, libraries, keys (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline text-[11px]">Search...</span>
          <kbd className="hidden md:inline font-mono text-[10px] bg-defense-900 px-1 py-0.2 rounded border border-defense-700 text-slate-400">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Synthetic Disclaimer, System Status, Timestamp, Clearance */}
      <div className="flex items-center gap-2.5">
        {/* Synthetic Environment Disclaimer Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[10px] font-mono text-amber-300 tracking-wider uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>{SYNTHETIC_ENV_DISCLAIMER}</span>
        </div>

        {/* Operational Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded border border-defense-700 bg-defense-850 text-[10px] font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">OPERATIONAL</span>
        </div>

        {/* Last Scan Timestamp */}
        <div className="hidden 2xl:flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>LAST SCAN: 2026-09-05 14:00 UTC</span>
        </div>

        {/* Environment Switcher */}
        <div className="flex items-center bg-defense-850 border border-defense-700 rounded p-0.5 text-[10px] font-mono">
          {environments.map((env) => (
            <button
              key={env}
              onClick={() => setActiveEnv(env)}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                activeEnv === env 
                  ? 'bg-slate-700 text-slate-100 font-medium' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {env.slice(0, 4).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Copilot Drawer Trigger */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="p-1.5 rounded border border-defense-700 hover:border-slate-600 bg-defense-850 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Open ECDAT Intelligence"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>

        {/* Notifications Alert */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-1.5 rounded border border-defense-700 hover:border-slate-600 bg-defense-850 text-slate-300 hover:text-slate-100 transition-colors"
          title="Telemetry Alerts"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>

        {/* User Identity / Clearance */}
        <div className="flex items-center gap-2 pl-2 border-l border-defense-700/80">
          <div className="w-6 h-6 rounded bg-defense-800 border border-defense-700 flex items-center justify-center text-slate-300">
            <User className="w-3 h-3" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-[11px] font-medium text-slate-200 leading-none">Cyber Ops Analyst</p>
            <p className="text-[9px] font-mono text-slate-400 leading-tight">Clearance L4</p>
          </div>
        </div>
      </div>
    </header>
  );
};
