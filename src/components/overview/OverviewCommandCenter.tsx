import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Database, 
  Workflow, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle,
  Lock,
  ExternalLink,
  ChevronRight,
  Server,
  Code,
  Box,
  Key,
  Network
} from 'lucide-react';
import { 
  DISCOVERY_SOURCES, 
  EXECUTIVE_DECISION_QUEUE, 
  POSTURE_TIMELINE_DATA 
} from '../../data/mockData';
import { 
  TrendingUp, 
  History, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';

export const OverviewCommandCenter: React.FC = () => {
  const { 
    setCurrentTab, 
    openAssetIntelligence,
    triggerSimulateDeprecationFromGraph,
    openCopilotWithContext,
    openLedgerForDna,
    viewMode
  } = useApp();

  const riskAlgorithms = [
    { algo: 'RSA-2048', type: 'Asymmetric / Signatures', count: 1420, quantumStatus: 'Vulnerable', riskScore: 92, tier: 'P1', reason: 'Shor integer factorization threatens auth signatures' },
    { algo: 'ECDSA P-256', type: 'Asymmetric / Key Exch', count: 684, quantumStatus: 'Vulnerable', riskScore: 78, tier: 'P2', reason: 'Shor discrete logarithm breaks elliptic curve curve25519' },
    { algo: 'TLS 1.2 (RSA-Kx)', type: 'Transport Protocol', count: 512, quantumStatus: 'Vulnerable', riskScore: 74, tier: 'P2', reason: 'Non-PFS key exchange susceptible to harvest-now-decrypt-later' },
    { algo: 'Custom Proprietary', type: 'Unclassified', count: 46, quantumStatus: 'Unclassified', riskScore: 82, tier: 'P1', reason: 'Non-standard primitives require manual reverse analysis' },
    { algo: 'AES-256-GCM', type: 'Symmetric / Block', count: 1140, quantumStatus: 'Resistant', riskScore: 18, tier: 'P4', reason: 'Grover requires 128-bit quantum search; CNSA 2.0 compliant' },
    { algo: 'SHA-256 / HMAC', type: 'Digest / Integrity', count: 580, quantumStatus: 'Resistant', riskScore: 12, tier: 'P4', reason: 'Pre-image resistant against known quantum algorithms' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto">
      {/* Top Posture Title & Subtitle Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase font-mono">
                Enterprise Cryptographic Posture
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Visibility into cryptographic assets, quantum exposure and migration readiness.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAssetIntelligence('RSA-2048')}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-red-500/40 text-red-300 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>Inspect RSA-2048 (P1 Demo)</span>
            </button>

            <button
              onClick={() => setCurrentTab('discovery')}
              className="px-3 py-1.5 rounded-sm bg-cyan-900/50 hover:bg-cyan-900/80 border border-cyan-600/60 text-cyan-200 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Discovery Scan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => openCopilotWithContext("Provide an executive brief on enterprise cryptographic posture and top quantum risks.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Briefing"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* ONE Clean Structured KPI Strip with Dividers (Requirement #5) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-defense-700 bg-defense-900 rounded-sm divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-defense-700">
          {/* Total Artefacts */}
          <div className="p-3">
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              Total Artefacts
            </div>
            <div className="text-2xl font-bold font-mono text-slate-100 mt-1">
              4,382
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Across 8 surfaces
            </div>
          </div>

          {/* Critical */}
          <div className="p-3">
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Critical</span>
            </div>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1">
              317
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Immediate risk
            </div>
          </div>

          {/* High */}
          <div className="p-3">
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>High</span>
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
              842
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Near-term horizon
            </div>
          </div>

          {/* Medium */}
          <div className="p-3">
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span>Medium</span>
            </div>
            <div className="text-2xl font-bold font-mono text-yellow-400 mt-1">
              1,420
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Planned review
            </div>
          </div>

          {/* Low */}
          <div className="p-3">
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Low</span>
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              1,803
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Compliant / symmetric
            </div>
          </div>

          {/* Require Classification */}
          <div className="p-3 bg-amber-500/5">
            <div className="text-[10px] font-mono tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Require Class.</span>
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
              46
            </div>
            <div className="text-[10px] font-mono text-amber-400/80 mt-0.5">
              Subset of 4,382
            </div>
          </div>
        </div>

        {/* Middle Section: Left ~65% Cryptographic Risk Landscape | Right ~35% Priority Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left ~65%: Cryptographic Risk Landscape (Analytical Visualization) */}
          <div className="lg:col-span-8 border border-defense-700 bg-defense-900 rounded-sm flex flex-col">
            <div className="p-3 border-b border-defense-700 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                  Cryptographic Risk Landscape
                </h2>
                <p className="text-[11px] text-slate-400">
                  Primitive breakdown by quantum vulnerability, cryptographic role, and composite exposure
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('graph')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>View Dependency Graph</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Analytical Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-defense-700 bg-defense-850/70 font-mono text-[10px] text-slate-400 uppercase">
                    <th className="py-2 px-3 font-semibold">Algorithm / Primitive</th>
                    <th className="py-2 px-3 font-semibold">Classification</th>
                    <th className="py-2 px-3 font-semibold text-right">Instances</th>
                    <th className="py-2 px-3 font-semibold">Quantum Status</th>
                    <th className="py-2 px-3 font-semibold text-right">Risk</th>
                    <th className="py-2 px-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-defense-700/60 font-mono text-[11px]">
                  {riskAlgorithms.map((item, idx) => {
                    const isFocus = item.algo === 'RSA-2048';
                    return (
                      <tr 
                        key={idx}
                        onClick={() => openAssetIntelligence(item.algo === 'RSA-2048' ? 'RSA-2048' : 'ECDSA P-256')}
                        className={`hover:bg-defense-800/60 transition-colors cursor-pointer ${
                          isFocus ? 'bg-red-500/5' : ''
                        }`}
                      >
                        <td className="py-2 px-3 text-slate-200 font-semibold flex items-center gap-1.5">
                          {isFocus && <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />}
                          <span>{item.algo}</span>
                          {isFocus && (
                            <span className="text-[9px] px-1 py-0.2 rounded border border-red-500/40 bg-red-500/10 text-red-300">
                              PRIMARY
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-slate-400">{item.type}</td>
                        <td className="py-2 px-3 text-right text-slate-300 font-semibold">{item.count.toLocaleString()}</td>
                        <td className="py-2 px-3">
                          <span className={`px-1.5 py-0.2 rounded border text-[10px] ${
                            item.quantumStatus === 'Vulnerable'
                              ? 'border-red-500/30 bg-red-500/10 text-red-400'
                              : item.quantumStatus === 'Unclassified'
                              ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                              : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {item.quantumStatus}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <span className={`font-bold ${
                            item.riskScore >= 90 ? 'text-red-400' :
                            item.riskScore >= 70 ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            {item.riskScore}/100
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 text-[10px]">
                            Inspect
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Explanatory telemetry footer */}
            <div className="p-2.5 border-t border-defense-700 bg-defense-850/50 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Risk Model: 7-Factor CNSA 2.0 / FIPS 203 & 204 aligned</span>
              <span className="text-slate-300">Total Vulnerable Instances: 2,616</span>
            </div>
          </div>

          {/* Right ~35%: Priority Actions (P1, P2, P3) */}
          <div className="lg:col-span-4 border border-defense-700 bg-defense-900 rounded-sm flex flex-col">
            <div className="p-3 border-b border-defense-700 flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                Priority Actions
              </h2>
              <span className="text-[10px] font-mono text-slate-400">P1 to P3</span>
            </div>

            <div className="p-3 space-y-2.5 flex-1">
              {/* P1: Immediate Planning */}
              <div className="p-3 rounded-sm border border-red-500/40 bg-red-500/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                      P1
                    </span>
                    <span className="text-xs font-bold text-slate-100 font-mono">Immediate Planning</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400">92 / 100</span>
                </div>

                <div className="font-mono text-xs text-slate-200">
                  RSA-2048 <span className="text-slate-400 font-sans text-[11px]">(Authentication Service)</span>
                </div>

                <div className="text-[10px] font-mono text-slate-400 leading-tight">
                  7 Applications · 12 Microservices · 3 APIs · 2 Critical Functions
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => openAssetIntelligence('RSA-2048')}
                    className="flex-1 py-1 rounded-sm border border-defense-700 hover:border-slate-500 bg-defense-850 text-slate-200 font-mono text-[10px] font-semibold text-center transition-colors"
                  >
                    Inspect Asset
                  </button>
                  <button
                    onClick={() => triggerSimulateDeprecationFromGraph()}
                    className="flex-1 py-1 rounded-sm border border-red-500/40 hover:bg-red-500/20 bg-red-500/10 text-red-300 font-mono text-[10px] font-semibold text-center transition-colors"
                  >
                    Simulate
                  </button>
                </div>
              </div>

              {/* P2: Near-Term */}
              <div className="p-2.5 rounded-sm border border-defense-700 bg-defense-850/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      P2
                    </span>
                    <span className="text-xs font-medium text-slate-200 font-mono">Near-Term</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">78 / 100</span>
                </div>

                <div className="font-mono text-xs text-slate-200">
                  ECDSA P-256 <span className="text-slate-400 font-sans text-[11px]">(Token Authority)</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-400">4 Apps · 6 Services impacted</span>
                  <button
                    onClick={() => openAssetIntelligence('ECDSA P-256')}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Inspect
                  </button>
                </div>
              </div>

              {/* P3: Planned */}
              <div className="p-2.5 rounded-sm border border-defense-700 bg-defense-850/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-700 text-slate-300 border border-slate-600">
                      P3
                    </span>
                    <span className="text-xs font-medium text-slate-300 font-mono">Planned</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">64 / 100</span>
                </div>

                <div className="font-mono text-xs text-slate-200">
                  TLS 1.2 Handshake <span className="text-slate-400 font-sans text-[11px]">(Edge Reverse Proxy)</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-slate-400">Public gateway ingress TLS</span>
                  <button
                    onClick={() => setCurrentTab('roadmap')}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Roadmap
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2.5 border-t border-defense-700 bg-defense-850/40">
              <button
                onClick={() => setCurrentTab('roadmap')}
                className="w-full py-1 text-center font-mono text-[10px] text-slate-300 hover:text-slate-100 hover:bg-defense-800 transition-colors rounded-sm border border-defense-700"
              >
                View Full Migration Schedule (P1–P4) →
              </button>
            </div>
          </div>
        </div>

        {/* Cryptographic Discovery Coverage (Clean Analytical Table / Grid - Requirement #5) */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm">
          <div className="p-3 border-b border-defense-700 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                Cryptographic Discovery Coverage
              </h2>
              <p className="text-[11px] text-slate-400">
                Audited enterprise attack surfaces, scan frequencies, and discovered cryptographic assets
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('discovery')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Manage Sources</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-defense-700 bg-defense-850/70 font-mono text-[10px] text-slate-400 uppercase">
                  <th className="py-2 px-3 font-semibold">Discovery Surface</th>
                  <th className="py-2 px-3 font-semibold">Scope / Target</th>
                  <th className="py-2 px-3 font-semibold text-right">Artefacts Found</th>
                  <th className="py-2 px-3 font-semibold">Scan Frequency</th>
                  <th className="py-2 px-3 font-semibold">Status</th>
                  <th className="py-2 px-3 font-semibold text-right">Last Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-defense-700/60 font-mono text-[11px]">
                {DISCOVERY_SOURCES.map((src, idx) => (
                  <tr key={idx} className="hover:bg-defense-800/40 transition-colors">
                    <td className="py-2 px-3 text-slate-200 font-medium flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[10px]">0{idx + 1}</span>
                      <span>{src.name}</span>
                    </td>
                    <td className="py-2 px-3 text-slate-400 text-[10px]">{src.description}</td>
                    <td className="py-2 px-3 text-right text-slate-200 font-semibold">{src.count}</td>
                    <td className="py-2 px-3 text-slate-400 text-[10px]">Continuous</td>
                    <td className="py-2 px-3">
                      <span className="px-1.5 py-0.2 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px]">
                        ● AUDITED
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-slate-400 text-[10px]">14:00 UTC</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Executive Decision Queue (What Security Leaders Act On First) */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm">
          <div className="p-3 border-b border-defense-700 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <h2 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                  Executive Decision Queue (Prioritized Operational Actions)
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                Strategic decisions prioritized by asset criticality, quantum vulnerability and dependency cascading risk
              </p>
            </div>

            <button
              onClick={() => setCurrentTab('roadmap')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>View Full Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-defense-700 bg-defense-850/70 font-mono text-[10px] text-slate-400 uppercase">
                  <th className="py-2.5 px-3 font-semibold">Rank</th>
                  <th className="py-2.5 px-3 font-semibold">Action Title & Focus</th>
                  <th className="py-2.5 px-3 font-semibold">Why Now?</th>
                  <th className="py-2.5 px-3 font-semibold">Blast Scope</th>
                  <th className="py-2.5 px-3 font-semibold">Recommended Next Step</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Risk Score</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-defense-700/60 font-mono text-[11px]">
                {EXECUTIVE_DECISION_QUEUE.map((item) => (
                  <tr key={item.rank} className="hover:bg-defense-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-cyan-400">
                      #{item.rank}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-100">{item.title}</div>
                      <div className="text-[10px] text-slate-400">{item.asset} · {item.dnaId}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans text-xs max-w-xs leading-tight">
                      {item.whyNow}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[10px] font-sans">
                      {item.whatIsAffected}
                    </td>
                    <td className="py-2.5 px-3 text-cyan-300 text-xs font-sans">
                      {item.recommendedNextStep}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-red-400">
                      {item.riskScore} / 100
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openAssetIntelligence(item.title.split(' ')[0])}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 underline"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => openLedgerForDna(item.dnaId)}
                          className="text-[10px] text-emerald-400 hover:text-emerald-300 underline"
                        >
                          Evidence
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Posture Timeline (Progress Across Realtime Scans) */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm">
          <div className="p-3 border-b border-defense-700 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-cyan-400" />
                <h2 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                  Security Posture Timeline & Migration Velocity
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                Multi-scan progression demonstrating reduction in critical quantum exposure and migration readiness increase to 42%
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 text-[10px]">Readiness Velocity:</span>
              <span className="text-emerald-400 font-bold">+24% Since Baseline</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-defense-700 divide-y sm:divide-y-0 sm:divide-x divide-defense-700">
            {POSTURE_TIMELINE_DATA.map((pt, idx) => {
              const isCurrent = idx === POSTURE_TIMELINE_DATA.length - 1;
              return (
                <div key={pt.scanId} className={`p-3 font-mono space-y-2 ${isCurrent ? 'bg-defense-850/60' : ''}`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 uppercase font-semibold">{pt.label}</span>
                    {isCurrent && (
                      <span className="px-1 py-0.2 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[9px] font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-lg font-bold text-slate-100">{pt.totalArtefacts.toLocaleString()}</div>
                      <div className="text-[9px] text-slate-500">TOTAL ARTEFACTS</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-emerald-400">{pt.migrationReadiness}%</div>
                      <div className="text-[9px] text-slate-500">MIGRATION READINESS</div>
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="h-1.5 w-full bg-defense-800 rounded-sm overflow-hidden flex">
                    <div style={{ width: `${pt.migrationReadiness}%` }} className="bg-emerald-500 h-full" />
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-defense-700/60">
                    <span className="text-red-400">{pt.criticalRisk} Critical</span>
                    <span className="text-amber-400">{pt.highRisk} High</span>
                    <span className="text-slate-400">{pt.unclassified} Unclassified</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-defense-850/40 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Scan Engine: Continuous Multi-Vector Telemetry & AST Parsers</span>
            <span className="text-slate-300">Baseline to Target: On track for 2027 CNSA 2.0 readiness</span>
          </div>
        </div>
      </div>
    </div>
  );
};
