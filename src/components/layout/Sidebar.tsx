import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Radar, 
  Database, 
  Network, 
  ShieldAlert, 
  Workflow, 
  Milestone, 
  FileText, 
  Settings, 
  AlertTriangle, 
  Sparkles,
  Lock,
  Layers,
  Cpu,
  Scale,
  FileCheck,
  Globe,
  GitCommit
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface NavItemDef {
  id?: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeTone?: 'alert' | 'warning' | 'neutral' | 'accent';
  isAction?: boolean;
  action?: () => void;
}

interface NavSectionDef {
  sectionTitle?: string;
  items: NavItemDef[];
}

export const Sidebar: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    unknownItems, 
    setIsCopilotOpen 
  } = useApp();

  const navSections: NavSectionDef[] = [
    {
      items: [
        {
          id: 'overview',
          label: 'Overview',
          icon: ShieldCheck
        }
      ]
    },
    {
      sectionTitle: 'DISCOVERY',
      items: [
        {
          id: 'inventory',
          label: 'Crypto Inventory',
          icon: Database,
          badge: '4,382',
          badgeTone: 'neutral'
        },
        {
          id: 'unknown',
          label: 'Classification',
          icon: AlertTriangle,
          badge: '46',
          badgeTone: 'warning'
        },
        {
          id: 'discovery',
          label: 'Sources',
          icon: Radar,
          badge: '8',
          badgeTone: 'neutral'
        }
      ]
    },
    {
      sectionTitle: 'ANALYSIS',
      items: [
        {
          id: 'graph',
          label: 'Dependency Graph',
          icon: Network
        },
        {
          id: 'risk',
          label: 'Quantum Risk',
          icon: ShieldAlert,
          badge: '317',
          badgeTone: 'alert'
        },
        {
          id: 'attack-surface',
          label: 'Attack Surface',
          icon: Globe,
          badge: '78',
          badgeTone: 'alert'
        },
        {
          id: 'reports',
          label: 'Risk Analysis',
          icon: FileText
        }
      ]
    },
    {
      sectionTitle: 'PLANNING',
      items: [
        {
          id: 'simulator',
          label: 'Impact Simulator',
          icon: Workflow
        },
        {
          id: 'roadmap',
          label: 'Migration Roadmap',
          icon: Milestone
        }
      ]
    },
    {
      sectionTitle: 'GOVERNANCE & AUDIT',
      items: [
        {
          id: 'policy',
          label: 'Policy Engine',
          icon: Scale,
          badge: '4',
          badgeTone: 'warning'
        },
        {
          id: 'ledger',
          label: 'Evidence Ledger',
          icon: FileCheck,
          badge: '4,382',
          badgeTone: 'neutral'
        },
        {
          id: 'trace',
          label: 'Decision Trace',
          icon: GitCommit,
          badge: 'P1',
          badgeTone: 'accent'
        }
      ]
    },
    {
      sectionTitle: 'SYSTEM',
      items: [
        {
          label: 'Intelligence',
          icon: Sparkles,
          isAction: true,
          action: () => setIsCopilotOpen(true)
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: Settings
        }
      ]
    }
  ];

  return (
    <aside className="w-56 bg-defense-900 border-r border-defense-700/80 flex flex-col justify-between select-none z-20 shrink-0">
      {/* Brand Header */}
      <div>
        <div className="p-3 border-b border-defense-700/80">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-defense-800 border border-defense-700 flex items-center justify-center text-cyan-400">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-sm tracking-wider text-slate-100">ECDAT</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-defense-800 border border-defense-700 text-slate-400">v2.4</span>
              </div>
              <p className="text-[9px] text-slate-400 tracking-tight leading-none mt-0.5">
                Enterprise Cryptographic
              </p>
              <p className="text-[9px] text-slate-500 tracking-tight leading-none">
                Discovery & Analysis Tool
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="p-2 space-y-3 overflow-y-auto">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-0.5">
              {sec.sectionTitle && (
                <div className="px-2 pt-1 pb-0.5 text-[9px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  {sec.sectionTitle}
                </div>
              )}

              {sec.items.map((item, iIdx) => {
                const isActive = item.id ? currentTab === item.id : false;
                const IconComponent = item.icon;

                return (
                  <button
                    key={iIdx}
                    onClick={() => {
                      if (item.isAction && item.action) {
                        item.action();
                      } else if (item.id) {
                        setCurrentTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs transition-colors rounded-sm text-left ${
                      isActive
                        ? 'bg-defense-800 border-l-2 border-cyan-500 text-slate-100 font-medium pl-2'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-defense-850/60 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span 
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded border shrink-0 ${
                          item.badgeTone === 'alert'
                            ? 'border-red-500/30 bg-red-500/10 text-red-400'
                            : item.badgeTone === 'warning'
                            ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                            : 'border-defense-700 bg-defense-850 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Subtle Bottom Telemetry */}
      <div className="p-2.5 border-t border-defense-700/80 bg-defense-950/40 text-[10px] font-mono text-slate-400 space-y-1">
        <div className="flex items-center justify-between">
          <span>Telemetry:</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            SYNCHRONIZED
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Standard:</span>
          <span className="text-slate-300">FIPS 203 / 204</span>
        </div>
      </div>
    </aside>
  );
};
