import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  ShieldAlert, 
  Network, 
  Workflow, 
  Milestone, 
  Fingerprint, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Cpu,
  Layers,
  RotateCcw
} from 'lucide-react';

export const WowMomentModal: React.FC = () => {
  const { 
    showWowMoment, 
    setShowWowMoment, 
    setCurrentTab, 
    openAssetIntelligence,
    startGuidedDemo 
  } = useApp();

  if (!showWowMoment) return null;

  const handleClose = () => {
    setShowWowMoment(false);
  };

  const handleOpenDecisionTrace = () => {
    setShowWowMoment(false);
    setCurrentTab('trace');
  };

  const handleOpenGraph = () => {
    setShowWowMoment(false);
    setCurrentTab('graph');
  };

  const handleRestartTour = () => {
    setShowWowMoment(false);
    startGuidedDemo();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-defense-950/80 backdrop-blur-sm select-none font-mono animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-defense-900 border border-cyan-500/50 rounded-md shadow-2xl shadow-cyan-950/40 flex flex-col overflow-hidden">
        {/* Header Banner */}
        <div className="p-4 border-b border-defense-700 bg-defense-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-sm font-bold tracking-tight text-slate-100 uppercase">
              Cryptographic Intelligence Summary
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
              DISCOVERY TO DECISION
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-defense-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Main Slogan Highlight */}
          <div className="text-center py-2 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              THE ECDAT DIFFERENCE
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight leading-snug">
              &ldquo;ECDAT doesn&rsquo;t just find cryptography.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                It explains what to do about it.
              </span>&rdquo;
            </h1>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              From continuous enterprise discovery to automated blast-radius mapping, multi-factor risk quantification, and actionable quantum migration roadmaps.
            </p>
          </div>

          {/* Value Chain Funnel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Step 1: Discovery */}
            <div className="p-3 rounded border border-defense-700 bg-defense-950/70 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                <span>01. Discovery</span>
                <Database className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-lg font-black text-slate-100">4,382 Artefacts</div>
              <div className="text-[11px] text-slate-400 leading-tight">
                Discovered across 8 scanning sources. 46 identified as requiring classification.
              </div>
            </div>

            {/* Step 2: Identification */}
            <div className="p-3 rounded border border-red-500/40 bg-red-950/20 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-red-300 font-bold uppercase">
                <span>02. Identification</span>
                <Cpu className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div className="text-lg font-black text-red-300">RSA-2048</div>
              <div className="text-[11px] text-slate-300 leading-tight">
                Authentication Service root key flagged as #1 enterprise priority.
              </div>
            </div>

            {/* Step 3: Risk Quantification */}
            <div className="p-3 rounded border border-red-500/40 bg-red-950/20 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-red-300 font-bold uppercase">
                <span>03. Risk Engine</span>
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div className="text-lg font-black text-red-300">92 / 100 Risk</div>
              <div className="text-[11px] text-slate-300 leading-tight">
                7 explainable dimensions. P1 immediate remediation requirement.
              </div>
            </div>

            {/* Step 4: Blast Radius */}
            <div className="p-3 rounded border border-purple-500/40 bg-purple-950/20 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-purple-300 font-bold uppercase">
                <span>04. Blast Radius</span>
                <Network className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-lg font-black text-purple-300">7 Apps / 12 Services</div>
              <div className="text-[11px] text-slate-300 leading-tight">
                Cascading impact across 3 public APIs and 2 critical business functions.
              </div>
            </div>

            {/* Step 5: Simulation */}
            <div className="p-3 rounded border border-amber-500/40 bg-amber-950/20 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-amber-300 font-bold uppercase">
                <span>05. Simulation</span>
                <Workflow className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-lg font-black text-amber-300">4 Conflicts Found</div>
              <div className="text-[11px] text-slate-300 leading-tight">
                Key size mismatch, cert chain breakage, and legacy client rejection pre-empted.
              </div>
            </div>

            {/* Step 6: Roadmap & Assurance */}
            <div className="p-3 rounded border border-emerald-500/40 bg-emerald-950/20 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-emerald-300 font-bold uppercase">
                <span>06. Assurance</span>
                <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-lg font-black text-emerald-300">ML-DSA + Merkle</div>
              <div className="text-[11px] text-slate-300 leading-tight">
                Dual-signature bridge mapped; evidence sealed in SHA-256 ledger block #004382.
              </div>
            </div>
          </div>

          {/* Bottom Call to Action Bar */}
          <div className="p-4 rounded border border-defense-700 bg-defense-850 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Evaluation complete. Explore detailed lineage or re-run the demonstration walkthrough.
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleOpenDecisionTrace}
                className="py-2 px-3 rounded border border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>DECISION TRACE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleRestartTour}
                className="py-2 px-3 rounded border border-defense-700 hover:border-slate-500 bg-defense-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESTART TOUR</span>
              </button>

              <button
                onClick={handleClose}
                className="py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
