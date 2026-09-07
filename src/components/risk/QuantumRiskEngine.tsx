import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSET_RISK_PROFILES, APPLICATION_HEATMAP_DATA } from '../../data/mockData';
import { 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  Workflow, 
  Network,
  ChevronRight,
  Info,
  Sliders,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  Scale
} from 'lucide-react';

export const QuantumRiskEngine: React.FC = () => {
  const { 
    setCurrentTab, 
    setSelectedGraphNodeId, 
    triggerSimulateDeprecationFromGraph,
    openAssetIntelligence,
    openCopilotWithContext,
    viewMode,
    openLedgerForDna,
    moscaZ,
    setMoscaZ
  } = useApp();

  const [activeRiskTab, setActiveRiskTab] = useState<'seven-factor' | 'mosca' | 'heatmap'>('seven-factor');
  const [selectedAssetId, setSelectedAssetId] = useState<string>('asset-payment-gateway');

  // Interactive Mosca Slider States for Selected Asset (defaults for RSA-2048 Auth Service)
  const [shelfLifeX, setShelfLifeX] = useState<number>(15);
  const [migrationTimeY, setMigrationTimeY] = useState<number>(6);

  const selectedAsset = ASSET_RISK_PROFILES.find(a => a.assetId === selectedAssetId) || ASSET_RISK_PROFILES[0];

  // Mosca's Theorem: Risk = (X + Y) > Z
  const isMoscaViolated = (shelfLifeX + migrationTimeY) > moscaZ;
  const riskMargin = (shelfLifeX + migrationTimeY) - moscaZ;
  const currentYear = new Date().getFullYear();
  const qDayYear = currentYear + moscaZ;

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Top Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Quantum Risk Intelligence & Mosca&apos;s Theorem
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-red-500/40 bg-red-500/10 text-red-300">
                MODULE C (PS-26164)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Mathematical risk quantification implementing Mosca&apos;s Theorem (X + Y &gt; Z), Grover&apos;s symmetric halving, Shor&apos;s polynomial breaking, and application risk heatmaps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAssetIntelligence('RSA-2048')}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect RSA-2048</span>
            </button>

            <button
              onClick={() => openCopilotWithContext("Explain Mosca's theorem (X + Y > Z) and quantum exposure for RSA-2048.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Risk Audit"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="border-b border-defense-700 bg-defense-900/60 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setActiveRiskTab('seven-factor')}
            className={`py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeRiskTab === 'seven-factor'
                ? 'border-red-500 text-red-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>7-FACTOR COMPOSITE RISK (92/100)</span>
          </button>

          <button
            onClick={() => setActiveRiskTab('mosca')}
            className={`py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeRiskTab === 'mosca'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>MOSCA&apos;S THEOREM ENGINE (X + Y &gt; Z)</span>
            <span className="text-[9px] bg-red-950 text-red-300 border border-red-700/50 px-1 py-0.2 rounded font-bold">
              VIOLATED
            </span>
          </button>

          <button
            onClick={() => setActiveRiskTab('heatmap')}
            className={`py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeRiskTab === 'heatmap'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>APPLICATION RISK HEATMAP</span>
            <span className="text-[9px] bg-defense-800 text-slate-300 border border-defense-700 px-1 py-0.2 rounded">
              8 APPS
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        
        {/* TAB 1: 7-Factor Composite Risk Model */}
        {activeRiskTab === 'seven-factor' && (
          <>
            {/* Telemetry Directive Bar */}
            <div className="p-3 rounded-sm border border-cyan-700/50 bg-cyan-950/20 flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-slate-200">
              <div>
                <strong className="font-mono text-cyan-300 text-[11px] uppercase">Leadership Directive: </strong>
                <span>Immediate transition planning required for P1 identity &amp; financial assets before 2027 mandate enforcement.</span>
              </div>
              <span className="font-mono text-[10px] text-cyan-400 bg-cyan-900/40 px-2 py-0.5 rounded border border-cyan-600/40 font-bold">
                URGENCY: IMMEDIATE (P1)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Main Focus: RSA-2048 Asset */}
              <div className="lg:col-span-8 border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-defense-700 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-100">RSA-2048</h2>
                      <span className="text-xs text-slate-400">({selectedAsset.assetName})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.2 rounded border border-red-500/40 bg-red-500/10 text-red-300 font-bold uppercase">
                        HIGH QUANTUM EXPOSURE
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-300">
                        {selectedAsset.priorityTier}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 bg-defense-950 px-3 py-2 rounded-sm border border-red-500/30">
                    <span className="text-3xl font-bold text-red-400">
                      {selectedAsset.compositeScore}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>

                {/* Seven-Factor Bars */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-semibold">
                    <span>Seven-Factor Risk Breakdown</span>
                    <span>Score / Maximum</span>
                  </div>

                  <div className="space-y-3">
                    {selectedAsset.factors.map((factor, idx) => {
                      const pct = Math.round((factor.score / factor.maxScore) * 100);
                      const isSevere = pct >= 80;

                      return (
                        <div key={idx} className="border-b border-defense-700/50 pb-2.5 text-xs space-y-1">
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

                          <div className="h-1.5 w-full bg-defense-800 rounded-sm overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${
                                isSevere ? 'bg-red-500' : pct >= 60 ? 'bg-amber-500' : 'bg-cyan-500'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          <div className="text-[10px] text-slate-400 leading-snug">
                            {factor.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Why This Score */}
                <div className="p-3 rounded-sm border border-defense-700 bg-defense-950/70 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Why This Score? (Composite Analysis)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedAsset.riskExplanation}
                  </p>
                </div>

                {/* HNDL Alert */}
                <div className="p-3 rounded-sm border border-amber-500/30 bg-amber-500/5 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center justify-between">
                    <span>Harvest Now Decrypt Later (HNDL) Exposure</span>
                    <span className="text-red-400 font-bold">RETROSPECTIVE THREAT</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Active transit encrypted sessions and public digital signatures are susceptible to adversary bulk interception. Even without a live CRQC today, payloads archived by adversaries risk complete plaintext recovery upon quantum hardware maturation.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setSelectedGraphNodeId('algo-rsa2048');
                      setCurrentTab('graph');
                    }}
                    className="flex-1 py-1.5 rounded-sm border border-defense-700 hover:border-slate-500 bg-defense-850 text-slate-200 text-xs flex items-center justify-center gap-1.5 transition-colors min-w-[140px]"
                  >
                    <Network className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Trace Dependencies</span>
                  </button>

                  <button
                    onClick={() => openLedgerForDna(selectedAsset.dnaId || 'ECDAT-CRYPTO-004382')}
                    className="py-1.5 px-3 rounded-sm border border-emerald-500/40 hover:bg-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Audit Ledger</span>
                  </button>

                  <button
                    onClick={() => triggerSimulateDeprecationFromGraph()}
                    className="flex-1 py-1.5 rounded-sm border border-red-500/40 hover:bg-red-500/20 bg-red-500/10 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-w-[140px]"
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Simulate Deprecation</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Evaluated Enterprise Assets List */}
              <div className="lg:col-span-4 border border-defense-700 bg-defense-900 rounded-sm flex flex-col">
                <div className="p-3 border-b border-defense-700 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Evaluated Enterprise Assets
                  </h3>
                  <span className="text-[10px] text-slate-400">Ranked by Risk</span>
                </div>

                <div className="divide-y divide-defense-700/60 text-xs overflow-y-auto flex-1">
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

                <div className="p-2.5 border-t border-defense-700 bg-defense-850/50 text-[10px] text-slate-400 text-center">
                  All scores normalized against Shor &amp; Grover vulnerability factors
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: Mosca's Theorem Engine (X + Y > Z) */}
        {activeRiskTab === 'mosca' && (
          <div className="space-y-4">
            {/* Mathematical Equation & Verdict Card */}
            <div className={`p-4 rounded-sm border ${
              isMoscaViolated 
                ? 'border-red-500/60 bg-red-950/20' 
                : 'border-emerald-500/60 bg-emerald-950/20'
            } space-y-3`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-defense-700/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-bold uppercase text-slate-100">
                      Mosca&apos;s Theorem Formulation: Risk = (X + Y) &gt; Z
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Theorem by Prof. Michele Mosca: If security shelf-life (X) plus migration time (Y) exceeds arrival of CRQC (Z), information is compromised before remediation completes.
                  </p>
                </div>

                <div className={`px-3 py-1.5 rounded text-xs font-bold border self-start sm:self-center ${
                  isMoscaViolated 
                    ? 'border-red-500/60 bg-red-500/20 text-red-300' 
                    : 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300'
                }`}>
                  {isMoscaViolated ? 'INEQUALITY VIOLATED (CRITICAL RISK)' : 'SAFE HORIZON (X+Y <= Z)'}
                </div>
              </div>

              {/* Calculation Visualizer */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[10px] text-slate-400 uppercase">Shelf-Life (X)</div>
                  <div className="text-2xl font-bold text-cyan-300 mt-0.5">{shelfLifeX} yrs</div>
                  <div className="text-[9px] text-slate-400 mt-1">Data security required until {currentYear + shelfLifeX}</div>
                </div>

                <div className="p-3 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[10px] text-slate-400 uppercase">Migration Time (Y)</div>
                  <div className="text-2xl font-bold text-amber-300 mt-0.5">{migrationTimeY} yrs</div>
                  <div className="text-[9px] text-slate-400 mt-1">Full stack PQC re-engineering</div>
                </div>

                <div className="p-3 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[10px] text-slate-400 uppercase">Total Exposure (X + Y)</div>
                  <div className="text-2xl font-bold text-red-400 mt-0.5">{shelfLifeX + migrationTimeY} yrs</div>
                  <div className="text-[9px] text-slate-400 mt-1">Total timeline needed to protect</div>
                </div>

                <div className="p-3 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[10px] text-slate-400 uppercase">CRQC Arrival (Z)</div>
                  <div className="text-2xl font-bold text-slate-100 mt-0.5">{moscaZ} yrs</div>
                  <div className="text-[9px] text-slate-400 mt-1">Q-Day Estimated: Year {qDayYear}</div>
                </div>
              </div>

              {/* Detailed Threat Narrative */}
              <div className="p-3 rounded bg-defense-950/80 border border-defense-700 text-xs leading-relaxed space-y-1">
                <div className="text-slate-200 font-bold">
                  {isMoscaViolated ? (
                    <span className="text-red-400">
                      ⚠️ Threat Assessment: (X + Y = {shelfLifeX + migrationTimeY} yrs) &gt; (Z = {moscaZ} yrs). Deficit: {riskMargin} years!
                    </span>
                  ) : (
                    <span className="text-emerald-400">
                      ✓ Threat Assessment: (X + Y = {shelfLifeX + migrationTimeY} yrs) &lt;= (Z = {moscaZ} yrs). Margin: {Math.abs(riskMargin)} years.
                    </span>
                  )}
                </div>
                <p className="text-slate-300 text-[11px]">
                  Adversaries executing Harvest Now, Decrypt Later (HNDL) campaigns against Authentication Service session tokens will possess decryptable plaintext {riskMargin} years before citizen identity claims expire.
                </p>
              </div>
            </div>

            {/* Interactive Sliders: Configurable Assumptions */}
            <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-defense-700 pb-2">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Interactive Mosca Parameter Controls
                </h3>
                <span className="text-[10px] text-slate-400">Adjust parameters to simulate custom organizational threat models</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Slider X: Data Shelf Life */}
                <div className="p-3 rounded bg-defense-950 border border-defense-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">X: Security Shelf-Life</span>
                    <span className="text-cyan-400 font-bold">{shelfLifeX} Years</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={shelfLifeX}
                    onChange={(e) => setShelfLifeX(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    Citizen identity assertions &amp; records sensitivity lifespan.
                  </div>
                </div>

                {/* Slider Y: Migration Time */}
                <div className="p-3 rounded bg-defense-950 border border-defense-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">Y: PQC Migration Time</span>
                    <span className="text-amber-400 font-bold">{migrationTimeY} Years</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={migrationTimeY}
                    onChange={(e) => setMigrationTimeY(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    Calculated from 14 dependent services and dual-signature bridge requirements.
                  </div>
                </div>

                {/* Slider Z: Time to CRQC */}
                <div className="p-3 rounded bg-defense-950 border border-defense-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">Z: Years to CRQC (Q-Day)</span>
                    <span className="text-red-400 font-bold">{moscaZ} Years ({qDayYear})</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    value={moscaZ}
                    onChange={(e) => setMoscaZ(Number(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    Configurable assumption based on NIST / NSA estimates.
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Breaking Mechanics: Shor vs Grover Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shor's Algorithm */}
              <div className="border border-red-500/40 bg-red-950/15 rounded-sm p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
                  <span className="text-xs font-bold text-red-300 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Shor&apos;s Algorithm Impact Flag
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                    POLYNOMIAL BREAK O((log N)³)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Completely breaks discrete logarithm and integer factorization schemes in polynomial time:
                </p>
                <div className="space-y-1 text-xs text-slate-200">
                  <div className="flex items-center justify-between p-1.5 rounded bg-defense-900/80">
                    <span>RSA-2048 / 3072 / 4096:</span>
                    <span className="text-red-400 font-bold">COMPLETELY BROKEN (~2,048 qubits)</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-defense-900/80">
                    <span>ECDSA (P-256, Ed25519):</span>
                    <span className="text-red-400 font-bold">COMPLETELY BROKEN (~1,500 qubits)</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-defense-900/80">
                    <span>Diffie-Hellman Key Exchange:</span>
                    <span className="text-red-400 font-bold">COMPLETELY BROKEN (Shared key exposed)</span>
                  </div>
                </div>
              </div>

              {/* Grover's Algorithm */}
              <div className="border border-amber-500/40 bg-amber-950/15 rounded-sm p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                  <span className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Grover&apos;s Algorithm Impact Flag
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    QUADRATIC SPEEDUP O(√N)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Halves effective brute-force key strength for symmetric encryption and hash functions:
                </p>
                <div className="space-y-1 text-xs text-slate-200">
                  <div className="flex items-center justify-between p-1.5 rounded bg-defense-900/80">
                    <span>AES-128 (Symmetric Key):</span>
                    <span className="text-red-400 font-bold">Effective 64 bits (INSECURE)</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-defense-900/80">
                    <span>AES-256 (Symmetric Key):</span>
                    <span className="text-emerald-400 font-bold">Effective 128 bits (QUANTUM SECURE)</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-defense-900/80">
                    <span>SHA-256 (Pre-Image Resistance):</span>
                    <span className="text-emerald-400 font-bold">Effective 128 bits (QUANTUM SECURE)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Application Risk Heatmap */}
        {activeRiskTab === 'heatmap' && (
          <div className="space-y-4">
            <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-defense-700 pb-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Enterprise Application Risk Heatmap
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Aggregated quantum exposure matrix across all 8 government enterprise applications (Total Sum: 4,382 discovered artefacts).
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">CRQC Horizon (Z): </span>
                  <span className="text-xs font-bold text-red-400">{moscaZ} Years</span>
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-defense-850/90 border-b border-defense-700 text-[10px] text-slate-400 uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Application / Repository</th>
                      <th className="py-2.5 px-3">Owner Team</th>
                      <th className="py-2.5 px-3">Business Criticality</th>
                      <th className="py-2.5 px-3 text-center">Artefacts</th>
                      <th className="py-2.5 px-3 text-center">Critical (317)</th>
                      <th className="py-2.5 px-3 text-center">High (842)</th>
                      <th className="py-2.5 px-3 text-center">Shelf-Life (X)</th>
                      <th className="py-2.5 px-3 text-center">Migration (Y)</th>
                      <th className="py-2.5 px-3 text-center">Mosca Status</th>
                      <th className="py-2.5 px-3 text-right">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-defense-700/50">
                    {APPLICATION_HEATMAP_DATA.map((app) => {
                      const isViolated = (app.shelfLifeX + app.migrationTimeY) > moscaZ;

                      return (
                        <tr key={app.id} className="hover:bg-defense-850/40 transition-colors">
                          <td className="py-2.5 px-3 font-bold text-slate-100">
                            <div>{app.appName}</div>
                            <div className="text-[10px] text-slate-500 font-normal">{app.dominantAlgo}</div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                            {app.team}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${
                              app.criticality === 'Critical' ? 'border-red-500/40 bg-red-500/10 text-red-300' :
                              app.criticality === 'High' ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' :
                              'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                            }`}>
                              {app.criticality}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-200">
                            {app.totalArtefacts}
                          </td>
                          <td className="py-2.5 px-3 text-center text-red-400 font-bold">
                            {app.criticalCount}
                          </td>
                          <td className="py-2.5 px-3 text-center text-amber-400 font-semibold">
                            {app.highCount}
                          </td>
                          <td className="py-2.5 px-3 text-center text-cyan-300 font-bold">
                            {app.shelfLifeX} yrs
                          </td>
                          <td className="py-2.5 px-3 text-center text-amber-300 font-bold">
                            {app.migrationTimeY} yrs
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              isViolated 
                                ? 'border-red-500/50 bg-red-950/40 text-red-300' 
                                : 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                            }`}>
                              {isViolated ? `VIOLATED (${app.shelfLifeX + app.migrationTimeY} > ${moscaZ})` : `COMPLIANT`}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className={`text-sm font-bold ${
                              app.riskScore >= 90 ? 'text-red-400' : app.riskScore >= 75 ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              {app.riskScore}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
