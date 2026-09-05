import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MIGRATION_ROADMAP_ITEMS } from '../../data/mockData';
import { 
  Milestone, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Workflow, 
  ShieldAlert,
  ChevronRight,
  Lock,
  Kanban
} from 'lucide-react';
import { MigrationRoadmapItem } from '../../types';

export const MigrationRoadmap: React.FC = () => {
  const { 
    setCurrentTab,
    openCopilotWithContext 
  } = useApp();

  const [activeView, setActiveView] = useState<'board' | 'phases'>('board');
  const [items] = useState<MigrationRoadmapItem[]>(MIGRATION_ROADMAP_ITEMS);

  // The 7-step horizontal migration pipeline required by Requirement #10:
  // Current State -> Risk Assessment -> Priority -> Candidate Migration Approach -> Pilot -> Validation -> Migration
  const roadmapPipeline = [
    { step: '01', name: 'Current State', value: 'RSA-2048', status: 'completed' },
    { step: '02', name: 'Risk Assessment', value: '92 / 100 (Critical)', status: 'completed' },
    { step: '03', name: 'Priority', value: 'P1 Immediate', status: 'completed' },
    { step: '04', name: 'Candidate Approach', value: 'ML-DSA / ML-KEM', status: 'active' },
    { step: '05', name: 'Pilot', value: 'Auth Testbed (Q1 2027)', status: 'upcoming' },
    { step: '06', name: 'Validation', value: 'Interop & Latency', status: 'upcoming' },
    { step: '07', name: 'Migration', value: 'Production Cutover', status: 'upcoming' },
  ];

  const tiers: Array<MigrationRoadmapItem['status']> = [
    'P1 — Immediate Planning',
    'P2 — High Priority',
    'P3 — Planned',
    'P4 — Monitor'
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Top Header (Requirement #10) */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                RSA-2048 Migration Roadmap
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                Strategic Planning
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Strategic enterprise horizon for transitioning vulnerable classical algorithms to post-quantum standards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-defense-850 border border-defense-700 rounded p-0.5 text-xs">
              <button
                onClick={() => setActiveView('board')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  activeView === 'board' ? 'bg-defense-750 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                P1–P4 Board
              </button>
              <button
                onClick={() => setActiveView('phases')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  activeView === 'phases' ? 'bg-defense-750 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                7-Phase Lifecyle
              </button>
            </div>

            <button
              onClick={() => openCopilotWithContext("Provide recommendations on FIPS 204 candidate migration approaches for RSA-2048.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Roadmap Counsel"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* Enterprise Migration Readiness KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-defense-700 bg-defense-900 rounded-sm divide-y sm:divide-y-0 sm:divide-x divide-defense-700">
          <div className="p-3">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Migration Readiness</div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">42%</div>
            <div className="text-[10px] text-slate-400">+24% velocity since Q1 baseline</div>
          </div>
          <div className="p-3">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Primary Focus Asset</div>
            <div className="text-base font-bold text-slate-100 mt-1 truncate">RSA-2048 (Auth Service)</div>
            <div className="text-[10px] text-red-400">P1 — Immediate Planning</div>
          </div>
          <div className="p-3">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Target Architecture</div>
            <div className="text-base font-bold text-cyan-300 mt-1 truncate">Dual-Signature Bridge</div>
            <div className="text-[10px] text-slate-400">RSA-2048 + ML-DSA-65</div>
          </div>
          <div className="p-3">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Mandate Target</div>
            <div className="text-base font-bold text-slate-200 mt-1">CNSA 2.0 (Q2 2027)</div>
            <div className="text-[10px] text-slate-400">FIPS 204 Standardized</div>
          </div>
        </div>

        {/* Horizontal Transition Pipeline (Requirement #10) */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
            Cryptographic Transition Pipeline (CNSA 2.0 Aligned)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 border border-defense-700 bg-defense-950/60 rounded-sm divide-y lg:divide-y-0 lg:divide-x divide-defense-700">
            {roadmapPipeline.map((p, idx) => (
              <div 
                key={idx} 
                className={`p-2.5 text-xs space-y-1 ${
                  p.status === 'active' ? 'bg-cyan-950/30' : ''
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-bold">{p.step}</span>
                  <span className={`px-1 py-0.2 rounded text-[9px] ${
                    p.status === 'completed'
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                      : p.status === 'active'
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                      : 'text-slate-500 bg-defense-900 border border-defense-700'
                  }`}>
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-slate-200 font-bold truncate text-[11px]">{p.name}</div>
                <div className="text-slate-400 text-[10px] truncate">{p.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CURRENT STATE & CANDIDATE MIGRATION APPROACH (Requirement #10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: CURRENT STATE */}
          <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wide border-b border-defense-700 pb-1 flex items-center justify-between">
              <span>Current State</span>
              <span className="text-[10px] text-red-400">Vulnerable Asset</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Primary Algorithm:</span>
                <span className="text-slate-100 font-bold">RSA-2048</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Cryptographic Role:</span>
                <span className="text-slate-200">Digital Signature</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Active Library:</span>
                <span className="text-slate-200">OpenSSL 1.1.1u (Deprecated)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Composite Risk:</span>
                <span className="text-red-400 font-bold">92 / 100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Assigned Priority:</span>
                <span className="text-red-400 font-bold">P1 — Immediate Planning</span>
              </div>
            </div>
          </div>

          {/* Right: CANDIDATE MIGRATION APPROACH (Explicitly labeled) */}
          <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide border-b border-defense-700 pb-1 flex items-center justify-between">
              <span>Candidate Migration Approach</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded border border-cyan-700/50 bg-cyan-950/40 text-cyan-300">
                Evaluation Candidate
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Digital Signature: ML-DSA (FIPS 204) */}
              <div className="p-2.5 rounded-sm border border-defense-700 bg-defense-950/70 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Digital Signature</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-bold">
                    ML-DSA (FIPS 204)
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-sans leading-tight">
                  Evaluated candidate for replacing RSA token signatures. Implement dual-signature bridge in Phase 4 (Pilot) to maintain interoperability.
                </p>
              </div>

              {/* Dual-Signature Hybrid Architecture Details */}
              <div className="p-2.5 rounded-sm border border-cyan-700/30 bg-cyan-950/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Hybrid Transition Mode</span>
                  <span className="text-[10px] text-cyan-300 font-mono font-bold">
                    Dual-Signature Bridge
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 font-sans leading-tight">
                  Outgoing JWT and SAML assertions carry both RSA-2048 and ML-DSA-65 signatures. Legacy microservices validate the RSA signature, while upgraded clients validate the post-quantum signature, ensuring zero customer downtime during the multi-year migration window.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Board P1 to P4 (Clean Analytical Grid) */}
        {activeView === 'board' ? (
          <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-3">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">
              Enterprise Horizon Priority Matrix (P1–P4)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {tiers.map((tier) => {
                const tierItems = items.filter(i => i.status === tier);
                const isP1 = tier.startsWith('P1');
                const isP2 = tier.startsWith('P2');

                return (
                  <div key={tier} className="border border-defense-700 bg-defense-950/60 rounded-sm flex flex-col">
                    <div className={`p-2.5 border-b border-defense-700 flex items-center justify-between ${
                      isP1 ? 'bg-red-500/10 text-red-300' : isP2 ? 'bg-amber-500/10 text-amber-300' : 'bg-defense-850 text-slate-300'
                    }`}>
                      <span className="text-xs font-bold truncate">{tier.split('—')[0].trim()}</span>
                      <span className="text-[10px] font-semibold">{tierItems.length}</span>
                    </div>

                    <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                      {tierItems.map((item) => (
                        <div key={item.id} className="p-2 rounded-sm border border-defense-700/80 bg-defense-900 space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200 truncate">{item.asset}</span>
                            <span className="text-[10px] text-slate-400">{item.risk}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center justify-between">
                            <span>{item.currentCrypto}</span>
                            <span>{item.targetHorizon}</span>
                          </div>
                          <div className="text-[9px] text-slate-500 font-sans leading-tight">
                            {item.recommendedAction}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* 7-Phase Strategic Horizon Table */
          <div className="border border-defense-700 bg-defense-900 rounded-sm">
            <div className="p-3 border-b border-defense-700">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                7-Phase CNSA 2.0 Strategic Horizon
              </h2>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-defense-700 bg-defense-850/70 text-[10px] text-slate-400 uppercase">
                  <th className="py-2 px-3 font-semibold">Phase</th>
                  <th className="py-2 px-3 font-semibold">Stage Name</th>
                  <th className="py-2 px-3 font-semibold">Objective</th>
                  <th className="py-2 px-3 font-semibold text-right">Completion</th>
                  <th className="py-2 px-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-defense-700/60 text-[11px]">
                <tr className="hover:bg-defense-800/40">
                  <td className="py-2 px-3 font-bold text-slate-400">PHASE 01</td>
                  <td className="py-2 px-3 text-slate-200 font-semibold">DISCOVER</td>
                  <td className="py-2 px-3 text-slate-400">Complete inventory across 48 repos, binaries & certificates</td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-bold">100%</td>
                  <td className="py-2 px-3 text-right"><span className="text-emerald-400 text-[10px]">COMPLETE</span></td>
                </tr>
                <tr className="hover:bg-defense-800/40">
                  <td className="py-2 px-3 font-bold text-slate-400">PHASE 02</td>
                  <td className="py-2 px-3 text-slate-200 font-semibold">CLASSIFY</td>
                  <td className="py-2 px-3 text-slate-400">Identify vulnerable asymmetric algorithms & 46 custom primitives</td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-bold">100%</td>
                  <td className="py-2 px-3 text-right"><span className="text-emerald-400 text-[10px]">COMPLETE</span></td>
                </tr>
                <tr className="hover:bg-defense-800/40 bg-cyan-950/20">
                  <td className="py-2 px-3 font-bold text-cyan-400">PHASE 03</td>
                  <td className="py-2 px-3 text-cyan-200 font-semibold">PRIORITIZE</td>
                  <td className="py-2 px-3 text-slate-300">Rank assets using 7-factor composite risk and dependency blast radius</td>
                  <td className="py-2 px-3 text-right text-cyan-400 font-bold">85%</td>
                  <td className="py-2 px-3 text-right"><span className="text-cyan-300 text-[10px] font-bold">ACTIVE</span></td>
                </tr>
                <tr className="hover:bg-defense-800/40">
                  <td className="py-2 px-3 font-bold text-slate-400">PHASE 04</td>
                  <td className="py-2 px-3 text-slate-200 font-semibold">PILOT</td>
                  <td className="py-2 px-3 text-slate-400">Deploy dual-signature bridge in non-critical ingress service</td>
                  <td className="py-2 px-3 text-right text-slate-400">40%</td>
                  <td className="py-2 px-3 text-right"><span className="text-slate-400 text-[10px]">PLANNED</span></td>
                </tr>
                <tr className="hover:bg-defense-800/40">
                  <td className="py-2 px-3 font-bold text-slate-400">PHASE 05</td>
                  <td className="py-2 px-3 text-slate-200 font-semibold">MIGRATE</td>
                  <td className="py-2 px-3 text-slate-400">Transition prioritized P1 workloads (Payment Gateway, Identity Service)</td>
                  <td className="py-2 px-3 text-right text-slate-400">15%</td>
                  <td className="py-2 px-3 text-right"><span className="text-slate-400 text-[10px]">PLANNED</span></td>
                </tr>
                <tr className="hover:bg-defense-800/40">
                  <td className="py-2 px-3 font-bold text-slate-400">PHASE 06</td>
                  <td className="py-2 px-3 text-slate-200 font-semibold">VALIDATE</td>
                  <td className="py-2 px-3 text-slate-400">Verify cryptographic agility, throughput, interoperability & HSM bounds</td>
                  <td className="py-2 px-3 text-right text-slate-400">0%</td>
                  <td className="py-2 px-3 text-right"><span className="text-slate-500 text-[10px]">QUEUED</span></td>
                </tr>
                <tr className="hover:bg-defense-800/40">
                  <td className="py-2 px-3 font-bold text-slate-400">PHASE 07</td>
                  <td className="py-2 px-3 text-slate-200 font-semibold">MONITOR</td>
                  <td className="py-2 px-3 text-slate-400">Continuously track cryptographic posture and new quantum threats</td>
                  <td className="py-2 px-3 text-right text-slate-400">0%</td>
                  <td className="py-2 px-3 text-right"><span className="text-slate-500 text-[10px]">QUEUED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
