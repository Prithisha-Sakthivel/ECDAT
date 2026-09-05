import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSET_RISK_PROFILES } from '../../data/mockData';
import { 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  Workflow, 
  Network,
  ChevronRight,
  Info
} from 'lucide-react';

export const QuantumRiskEngine: React.FC = () => {
  const { 
    setCurrentTab, 
    setSelectedGraphNodeId, 
    triggerSimulateDeprecationFromGraph,
    openAssetIntelligence,
    openCopilotWithContext,
    viewMode,
    openLedgerForDna
  } = useApp();

  const [selectedAssetId, setSelectedAssetId] = useState<string>('asset-payment-gateway');

  const selectedAsset = ASSET_RISK_PROFILES.find(a => a.assetId === selectedAssetId) || ASSET_RISK_PROFILES[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <h1 className="text-base font-bold font-mono tracking-tight text-slate-100 uppercase">
                Quantum Risk Intelligence
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-red-500/40 bg-red-500/10 text-red-300">
                {viewMode === 'executive' ? 'Executive Briefing' : 'Analyst Model'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {viewMode === 'executive' 
                ? 'Leadership summary of cryptographic exposure, threat timelines, and prioritized remediation actions.'
                : 'Mathematical composite scoring based on Shor algorithm complexity, asset criticality, exposure, and blast radius.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAssetIntelligence('RSA-2048')}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect RSA-2048</span>
            </button>

            <button
              onClick={() => openCopilotWithContext("Explain the 7-factor composite risk calculation for RSA-2048.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Risk Audit"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* Formula / Executive Telemetry Bar */}
        {viewMode === 'analyst' ? (
          <div className="p-2.5 rounded-sm border border-defense-700 bg-defense-900 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Mathematical Formulation:</span>
              <span className="text-cyan-300 text-[11px]">Composite Risk = ∑ [W_i × Factor_i] · Shor Complexity O((log N)³)</span>
            </div>
            <span className="text-[10px] text-slate-400">CNSA 2.0 / FIPS 203 & 204 Aligned</span>
          </div>
        ) : (
          <div className="p-3 rounded-sm border border-cyan-700/50 bg-cyan-950/20 flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-slate-200">
            <div>
              <strong className="font-mono text-cyan-300 text-[11px] uppercase">Leadership Directive: </strong>
              <span>Immediate transition planning required for P1 identity & financial assets before 2027 mandate enforcement.</span>
            </div>
            <span className="font-mono text-[10px] text-cyan-400 bg-cyan-900/40 px-2 py-0.5 rounded border border-cyan-600/40">
              URGENCY: IMMEDIATE (P1)
            </span>
          </div>
        )}

        {/* Main Grid: Left Primary Asset Focus (RSA-2048) ~70% | Right Enterprise Assets List ~30% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Focus: RSA-2048 (Requirement #8) */}
          <div className="lg:col-span-8 border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-4">
            {/* Primary Header Focus */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-defense-700 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold font-mono text-slate-100">RSA-2048</h2>
                  <span className="text-xs font-mono text-slate-400">({selectedAsset.assetName})</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-red-500/40 bg-red-500/10 text-red-300 font-bold uppercase">
                    HIGH QUANTUM EXPOSURE
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-300">
                    {selectedAsset.priorityTier}
                  </span>
                </div>
              </div>

              {/* Score Display (Requirement #8: 92 / 100) */}
              <div className="flex items-baseline gap-1.5 bg-defense-950 px-3 py-2 rounded-sm border border-red-500/30">
                <span className="text-3xl font-bold font-mono text-red-400">
                  {selectedAsset.compositeScore}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 100</span>
              </div>
            </div>

            {/* Seven-Factor Risk Composition: Horizontal Bar Visualization (Requirement #8) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase font-semibold">
                <span>Seven-Factor Risk Breakdown</span>
                <span>Score / Maximum</span>
              </div>

              <div className="space-y-3">
                {selectedAsset.factors.map((factor, idx) => {
                  const pct = Math.round((factor.score / factor.maxScore) * 100);
                  const isSevere = pct >= 80;

                  return (
                    <div key={idx} className="border-b border-defense-700/50 pb-2.5 font-mono text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 font-medium">{factor.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isSevere ? 'text-red-400' : 'text-slate-200'}`}>
                            {factor.score}
                          </span>
                          <span className="text-slate-400">/</span>
                          <span className="text-slate-400">{factor.maxScore}</span>
                        </div>
                      </div>

                      {/* Clean horizontal bar */}
                      <div className="h-1.5 w-full bg-defense-800 rounded-sm overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            isSevere ? 'bg-red-500' : pct >= 60 ? 'bg-amber-500' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      {/* Reason (Requirement #8) */}
                      <div className="text-[10px] text-slate-400 leading-snug">
                        {factor.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WHY THIS SCORE? Narrative (Requirement #8) */}
            <div className="p-3 rounded-sm border border-defense-700 bg-defense-950/70 space-y-1 font-mono">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Why This Score? (Composite Analysis)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedAsset.riskExplanation}
              </p>
            </div>

            {/* HNDL Analysis Card */}
            <div className="p-3 rounded-sm border border-amber-500/30 bg-amber-500/5 space-y-1 font-mono">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center justify-between">
                <span>Harvest Now Decrypt Later (HNDL) Exposure</span>
                <span className="text-red-400 font-bold">RETROSPECTIVE THREAT</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Active transit encrypted sessions and public digital signatures are susceptible to adversary bulk interception. Even without a live CRQC today, payloads archived by adversaries risk complete plaintext recovery upon quantum hardware maturation.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => {
                  setSelectedGraphNodeId('algo-rsa2048');
                  setCurrentTab('graph');
                }}
                className="flex-1 py-1.5 rounded-sm border border-defense-700 hover:border-slate-500 bg-defense-850 text-slate-200 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors min-w-[140px]"
              >
                <Network className="w-3.5 h-3.5 text-cyan-400" />
                <span>Trace Dependencies</span>
              </button>

              <button
                onClick={() => openLedgerForDna(selectedAsset.dnaId || 'ECDAT-CRYPTO-004382')}
                className="py-1.5 px-3 rounded-sm border border-emerald-500/40 hover:bg-emerald-500/20 bg-emerald-500/10 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Audit Ledger</span>
              </button>

              <button
                onClick={() => triggerSimulateDeprecationFromGraph()}
                className="flex-1 py-1.5 rounded-sm border border-red-500/40 hover:bg-red-500/20 bg-red-500/10 text-red-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-w-[140px]"
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>Simulate Deprecation</span>
              </button>
            </div>
          </div>

          {/* Right Side: Evaluated Enterprise Assets List ~30% */}
          <div className="lg:col-span-4 border border-defense-700 bg-defense-900 rounded-sm flex flex-col">
            <div className="p-3 border-b border-defense-700 flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                Evaluated Enterprise Assets
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Ranked by Risk</span>
            </div>

            <div className="divide-y divide-defense-700/60 font-mono text-xs overflow-y-auto flex-1">
              {ASSET_RISK_PROFILES.map((profile) => {
                const isCurrent = profile.assetId === selectedAssetId;
                return (
                  <div
                    key={profile.assetId}
                    onClick={() => setSelectedAssetId(profile.assetId)}
                    className={`p-3 cursor-pointer transition-colors ${
                      isCurrent 
                        ? 'bg-defense-800/80 border-l-2 border-red-500' 
                        : 'hover:bg-defense-850/60 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 truncate">{profile.assetName}</span>
                      <span className={`font-bold ${
                        profile.compositeScore >= 90 ? 'text-red-400' : 'text-amber-400'
                      }`}>
                        {profile.compositeScore} / 100
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>Primary: {profile.primaryAlgorithm}</span>
                      <span>{profile.dependencies} Deps</span>
                    </div>

                    <div className="mt-1 text-[9px] text-slate-500">
                      {profile.priorityTier}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-2.5 border-t border-defense-700 bg-defense-850/50 text-[10px] font-mono text-slate-400 text-center">
              All scores normalized against Shor & Grover vulnerability factors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
