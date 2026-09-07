import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PQC_RECOMMENDATIONS } from '../../data/mockData';
import { 
  Sparkles, 
  Cpu, 
  Workflow, 
  Network, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Scale, 
  Layers, 
  Lock,
  ExternalLink,
  Milestone
} from 'lucide-react';
import { PqcRecommendation } from '../../types';

export const PqcRecommendationModule: React.FC = () => {
  const { setCurrentTab, openAssetIntelligence, triggerSimulateDeprecationFromGraph } = useApp();

  const [selectedRecId, setSelectedRecId] = useState<string>('rec-01');

  const activeRec = PQC_RECOMMENDATIONS.find(r => r.id === selectedRecId) || PQC_RECOMMENDATIONS[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                PQC Recommendation Engine
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                MODULE D (PS-26164)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Rule-based multi-factor decision engine mapping vulnerable classical primitives to NIST-standardized Post-Quantum Cryptography (ML-KEM, ML-DSA, SLH-DSA, Falcon, and Hybrid Bridges).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAssetIntelligence('RSA-2048', 'migration')}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect Primary Candidate (ML-DSA)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* Top Directive Banner */}
        <div className="p-3 rounded-sm border border-cyan-500/40 bg-cyan-950/20 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <Scale className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Rule Engine Guidance:</strong> Recommendations weigh latency impact, key/signature size overhead, library maturity, and re-engineering cost rather than simple 1:1 lookups.
            </span>
          </div>
          <span className="text-[10px] text-cyan-300 font-bold border border-cyan-500/40 px-2 py-0.5 rounded">
            NIST FIPS 203 / 204 / 205 (FINAL RELEASE)
          </span>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Column: List of Recommendation Categories */}
          <div className="lg:col-span-5 border border-defense-700 bg-defense-900 rounded-sm flex flex-col">
            <div className="p-3 border-b border-defense-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wide">
                NIST Standardized Alternatives ({PQC_RECOMMENDATIONS.length})
              </span>
              <span className="text-[10px] text-slate-400">Select Primitive</span>
            </div>

            <div className="divide-y divide-defense-700/60 text-xs overflow-y-auto flex-1">
              {PQC_RECOMMENDATIONS.map((rec) => {
                const isSelected = rec.id === selectedRecId;

                return (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecId(rec.id)}
                    className={`p-3 cursor-pointer transition-colors space-y-1 ${
                      isSelected 
                        ? 'bg-defense-800/80 border-l-2 border-cyan-400' 
                        : 'hover:bg-defense-850/60 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">{rec.cryptoType}</span>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold">{rec.nistStandard.split('(')[1]?.replace(')', '') || 'NIST FIPS'}</span>
                    </div>

                    <div className="font-bold text-slate-100 text-xs">
                      {rec.currentAlgorithm}
                    </div>

                    <div className="text-cyan-400 text-[11px] font-bold flex items-center gap-1">
                      <span>↳ Target: {rec.recommendedPqc}</span>
                    </div>

                    <div className="text-[10px] text-slate-500 truncate pt-0.5">
                      Hybrid: {rec.hybridOption}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Multi-Factor Tradeoff Evaluation & Rule Justification */}
          <div className="lg:col-span-7 border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-4">
            {/* Header of Active Recommendation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-defense-700 gap-2">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  {activeRec.cryptoType} Recommendation
                </div>
                <h2 className="text-base font-bold text-cyan-300">
                  {activeRec.recommendedPqc}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Replaces: <strong className="text-slate-200">{activeRec.currentAlgorithm}</strong>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 self-start sm:self-center">
                {activeRec.libraryMaturity}
              </span>
            </div>

            {/* Tradeoff Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2.5 rounded bg-defense-950 border border-defense-700">
                <div className="text-[9px] text-slate-400 uppercase">Latency Efficiency</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">{activeRec.latencyScore} / 10</div>
                <div className="text-[8px] text-slate-500">Fast Verification</div>
              </div>

              <div className="p-2.5 rounded bg-defense-950 border border-defense-700">
                <div className="text-[9px] text-slate-400 uppercase">Re-engineering</div>
                <div className={`text-base font-bold mt-0.5 ${
                  activeRec.reengineeringCost === 'Low' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {activeRec.reengineeringCost}
                </div>
                <div className="text-[8px] text-slate-500">API Compatibility</div>
              </div>

              <div className="p-2.5 rounded bg-defense-950 border border-defense-700 col-span-2 sm:col-span-2">
                <div className="text-[9px] text-slate-400 uppercase">Hybrid Transition Option</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5 truncate">{activeRec.hybridOption}</div>
                <div className="text-[8px] text-slate-500">Dual-security fallback bridge</div>
              </div>
            </div>

            {/* Overheads Detail */}
            <div className="p-3 rounded bg-defense-950/70 border border-defense-700 space-y-2 text-xs">
              <div className="text-[10px] text-slate-400 uppercase font-bold border-b border-defense-700/60 pb-1">
                Bandwidth &amp; Memory Overhead Footprint
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 text-[10px] block">Public Key Expansion:</span>
                  <span className="text-slate-200 font-bold">{activeRec.keySizeOverhead}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Signature / Ciphertext Overhead:</span>
                  <span className="text-slate-200 font-bold">{activeRec.sigSizeOverhead}</span>
                </div>
              </div>
            </div>

            {/* Justification & Rule Engine Reasoning */}
            <div className="border border-defense-700 bg-defense-950/70 rounded p-3 space-y-2">
              <div className="text-[10px] text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Multi-Factor Recommendation Justification</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeRec.justification}
              </p>
            </div>

            {/* Tradeoff Caveats */}
            <div className="border border-amber-500/30 bg-amber-950/10 rounded p-3 space-y-1">
              <div className="text-[10px] text-amber-300 uppercase font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Operational Tradeoffs &amp; Mitigations</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeRec.tradeoffNotes}
              </p>
            </div>

            {/* Target Assets Impacted */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Representative Enterprise Assets:</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {activeRec.exampleAssets.map((asset, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-defense-800 border border-defense-700 text-slate-300">
                    {asset}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => triggerSimulateDeprecationFromGraph()}
                className="py-1.5 px-3 rounded-sm border border-red-500/40 hover:bg-red-500/20 bg-red-500/10 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>Simulate Deprecation Conflicts</span>
              </button>

              <button
                onClick={() => setCurrentTab('roadmap')}
                className="py-1.5 px-3 rounded-sm border border-cyan-500/40 hover:bg-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Milestone className="w-3.5 h-3.5" />
                <span>View Migration Roadmap</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
