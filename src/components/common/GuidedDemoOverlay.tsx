import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Compass,
  Play
} from 'lucide-react';

interface StepInfo {
  step: number;
  stage: string;
  title: string;
  evaluatorNote: string;
}

const GUIDED_STEPS: StepInfo[] = [
  {
    step: 1,
    stage: 'OVERVIEW',
    title: 'Enterprise Cryptographic Posture',
    evaluatorNote: 'Observe single source of truth: 4,382 artefacts, 317 critical, 46 requiring classification, and executive decision queue.'
  },
  {
    step: 2,
    stage: 'DISCOVERY',
    title: 'Multi-Vector Discovery Sources',
    evaluatorNote: 'Inspect continuous scanning across 8 enterprise surfaces (Source AST, Binaries, Servers, Containers, KMS, Configs, Certs, APIs).'
  },
  {
    step: 3,
    stage: 'UNDERSTAND',
    title: 'CBOM Cryptographic Inventory',
    evaluatorNote: 'Evaluate Cryptographic Bill of Materials with unique Cryptographic DNA (ECDAT-CRYPTO-004382) and 7-factor explainability.'
  },
  {
    step: 4,
    stage: 'CONNECT',
    title: '7-Layer Dependency Graph & Blast Radius',
    evaluatorNote: 'Trace linear affected path from Citizen Auth -> Auth Service -> OAuth API -> OpenSSL -> RSA-2048 -> Certificate.'
  },
  {
    step: 5,
    stage: 'ASSESS',
    title: 'Explainable Quantum Risk Engine',
    evaluatorNote: 'Review transparent composite scoring (92/100) combining Shor algorithm factorization with business criticality & exposure.'
  },
  {
    step: 6,
    stage: 'SIMULATE',
    title: 'What-If Impact Simulator',
    evaluatorNote: 'Simulate deprecation blast radius for RSA-2048: 7 apps, 12 services, 4 migration conflicts (OpenSSL EOL, MTU header expansion).'
  },
  {
    step: 7,
    stage: 'MIGRATE',
    title: 'Migration Roadmap & Hybrid Architecture',
    evaluatorNote: 'Explore candidate PQC approach (ML-DSA FIPS 204) with dual-signature transition bridge and 7-phase CNSA 2.0 horizon.'
  },
  {
    step: 8,
    stage: 'ASSURANCE',
    title: 'Cryptographic Evidence Ledger & Policy Engine',
    evaluatorNote: 'Verify SHA-256 hash-chained tamper-evident audit trail linking discovery proof to decision justification.'
  }
];

export const GuidedDemoOverlay: React.FC = () => {
  const { 
    isGuidedDemoActive, 
    guidedDemoStep, 
    nextGuidedDemoStep, 
    prevGuidedDemoStep, 
    exitGuidedDemo,
    jumpToGuidedDemoStep 
  } = useApp();

  if (!isGuidedDemoActive) return null;

  const currentStep = GUIDED_STEPS[guidedDemoStep - 1] || GUIDED_STEPS[0];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 select-none font-mono">
      <div className="bg-defense-900 border border-cyan-500/60 shadow-2xl shadow-black/80 rounded-sm p-3 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Step Info & Description */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="px-2 py-1 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-bold shrink-0">
              STEP 0{currentStep.step} / 08
            </div>

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  [{currentStep.stage}]
                </span>
                <h4 className="text-xs font-bold text-slate-100 truncate">
                  {currentStep.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-snug">
                {currentStep.evaluatorNote}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Step Indicators */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              {GUIDED_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => jumpToGuidedDemoStep(s.step)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    s.step === guidedDemoStep
                      ? 'bg-cyan-400 w-4'
                      : s.step < guidedDemoStep
                      ? 'bg-emerald-400'
                      : 'bg-defense-700 hover:bg-slate-500'
                  }`}
                  title={`Jump to Step ${s.step}: ${s.title}`}
                />
              ))}
            </div>

            <button
              onClick={prevGuidedDemoStep}
              disabled={guidedDemoStep <= 1}
              className="px-2.5 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 disabled:opacity-30 disabled:hover:bg-defense-800 text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <button
              onClick={nextGuidedDemoStep}
              className="px-3.5 py-1.5 rounded-sm bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-md shadow-cyan-950"
            >
              <span>{guidedDemoStep === 8 ? 'Finish Tour' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={exitGuidedDemo}
              className="p-1.5 rounded-sm hover:bg-defense-800 text-slate-400 hover:text-slate-200 transition-colors border border-transparent hover:border-defense-700"
              title="Close Guided Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
