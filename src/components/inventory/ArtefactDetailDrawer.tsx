import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldAlert, 
  Workflow, 
  Network, 
  Sparkles, 
  Info,
  Server, 
  Lock, 
  ChevronRight, 
  Layers, 
  ArrowRight, 
  Fingerprint, 
  FileCheck,
  Copy,
  Check,
  Cpu,
  GitCommit,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileCode2,
  Scale,
  Milestone
} from 'lucide-react';
import { DrawerTab } from '../../types';

export const ArtefactDetailDrawer: React.FC = () => {
  const { 
    selectedArtefact, 
    isDrawerOpen, 
    setIsDrawerOpen,
    drawerTab,
    setDrawerTab,
    setSelectedGraphNodeId, 
    triggerSimulateDeprecationFromGraph,
    setCurrentTab,
    openLedgerForDna,
    openDecisionTrace
  } = useApp();

  const [copiedDna, setCopiedDna] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  if (!isDrawerOpen || !selectedArtefact) return null;

  const isRsa = selectedArtefact.algorithm === 'RSA-2048' || selectedArtefact.name.includes('RSA-2048');

  // Metrics aligned with SIH Demo requirements
  const appsAffected = selectedArtefact.applicationsAffected ?? (isRsa ? 7 : 4);
  const servicesImpacted = selectedArtefact.servicesImpacted ?? (isRsa ? 12 : 6);
  const apisAffected = selectedArtefact.apisAffected ?? (isRsa ? 3 : 2);
  const criticalBizFunctions = selectedArtefact.criticalBusinessFunctions ?? (isRsa ? 2 : 1);
  const quantumExp = selectedArtefact.quantumExposure ?? (isRsa ? 'HIGH' : 'MEDIUM');
  const compositeRiskScore = selectedArtefact.compositeRisk ?? (isRsa ? 92 : 78);
  const migrationPriority = selectedArtefact.migrationPriority ?? (isRsa ? 'P1 — Immediate Planning' : 'P2 — High Priority');
  const dnaId = selectedArtefact.dnaId || (isRsa ? 'ECDAT-CRYPTO-004382' : 'ECDAT-CRYPTO-002910');

  // 7 explainable risk factors
  const factors = selectedArtefact.factorScores ?? [
    { name: 'Quantum Vulnerability', score: 23, maxScore: 25, contribution: '23 / 25', explanation: "Shor's algorithm breaks integer factorization in polynomial time" },
    { name: 'Business Criticality', score: 20, maxScore: 20, contribution: '20 / 20', explanation: "Root identity provider for citizen portals and administrative services" },
    { name: 'Data Sensitivity', score: 18, maxScore: 20, contribution: '18 / 20', explanation: "Signs citizen assertions, identity claims, and admin credentials" },
    { name: 'External Exposure', score: 13, maxScore: 15, contribution: '13 / 15', explanation: "Internet-facing OAuth/OIDC endpoints with public session traffic" },
    { name: 'Dependency Complexity', score: 8, maxScore: 10, contribution: '8 / 10', explanation: "7 applications and 12 services rely on tokens signed by this key" },
    { name: 'Migration Complexity', score: 6, maxScore: 10, contribution: '6 / 10', explanation: "Requires dual-signature support during multi-year transition bridge" },
    { name: 'Cryptographic Strength', score: 4, maxScore: 10, contribution: '4 / 10', explanation: "2048-bit modulus provides only 112-bit classical security (CNSA 2.0 sub-par)" }
  ];

  const handleCopyDna = () => {
    navigator.clipboard.writeText(dnaId);
    setCopiedDna(true);
    setTimeout(() => setCopiedDna(false), 2000);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleViewDependencies = () => {
    setSelectedGraphNodeId(isRsa ? 'algo-rsa2048' : selectedArtefact.id);
    setCurrentTab('graph');
    setIsDrawerOpen(false);
  };

  const handleSimulateDeprecation = () => {
    triggerSimulateDeprecationFromGraph();
    setIsDrawerOpen(false);
  };

  const handleTraceDecision = () => {
    openDecisionTrace(selectedArtefact.name);
    setIsDrawerOpen(false);
  };

  const handleViewEvidenceLedger = () => {
    openLedgerForDna(dnaId);
    setIsDrawerOpen(false);
  };

  const tabs: { id: DrawerTab; label: string }[] = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'risk', label: 'RISK (92/100)' },
    { id: 'dependencies', label: 'DEPENDENCIES' },
    { id: 'evidence', label: 'EVIDENCE' },
    { id: 'migration', label: 'MIGRATION' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-defense-950/75 backdrop-blur-[2px] select-none font-mono animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-defense-900 border-l border-defense-700 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Top Header */}
        <div className="p-4 border-b border-defense-700 bg-defense-850/95 flex items-start justify-between shrink-0">
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isRsa ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'}`} />
              <h2 className="text-base font-bold text-slate-100">
                {selectedArtefact.algorithm}
              </h2>
              <span className="text-xs text-slate-400">
                ({selectedArtefact.purpose.split('/')[0].trim()})
              </span>
            </div>

            {/* Badges strip & Copy DNA Button */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <button
                onClick={handleCopyDna}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                title="Click to copy Cryptographic DNA ID"
              >
                {copiedDna ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedDna ? 'COPIED' : dnaId}</span>
              </button>

              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-red-500/40 bg-red-500/10 text-red-300">
                {quantumExp} EXPOSURE
              </span>

              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-red-500/40 bg-red-500/10 text-red-300">
                {compositeRiskScore} RISK
              </span>

              <span className="px-1.5 py-0.5 rounded text-[10px] border border-defense-700 bg-defense-800 text-slate-300">
                {migrationPriority}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded hover:bg-defense-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Tab Navigation Strip */}
        <div className="flex items-center border-b border-defense-700 bg-defense-950/80 px-2 shrink-0 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setDrawerTab(t.id)}
              className={`px-3 py-2 text-[11px] font-bold border-b-2 transition-colors whitespace-nowrap ${
                drawerTab === t.id
                  ? 'border-cyan-400 text-cyan-300 bg-defense-850/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Body Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* TAB 1: OVERVIEW */}
          {drawerTab === 'overview' && (
            <div className="space-y-4">
              {/* Identity & Technical Metadata */}
              <div className="border border-defense-700 bg-defense-950/60 rounded p-3 space-y-2.5">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-defense-700/60 pb-1 flex items-center justify-between">
                  <span>Identity & Technical Attributes</span>
                  <span className="text-cyan-400">{dnaId}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Algorithm / Key Specification:</span>
                    <span className="text-slate-100 font-bold">{selectedArtefact.algorithm}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Cryptographic Purpose:</span>
                    <span className="text-slate-100 font-bold">{selectedArtefact.purpose}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Host Workload / Container:</span>
                    <span className="text-slate-100 font-bold">{selectedArtefact.application || 'Authentication Service'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Cryptographic Provider / Library:</span>
                    <span className="text-slate-100 font-bold">{selectedArtefact.library} {selectedArtefact.libraryVersion || '1.1.1u'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[10px] block">Source Code Path & Line:</span>
                    <span className="text-slate-300 font-mono text-[10px] break-all">{selectedArtefact.location}</span>
                  </div>
                </div>
              </div>

              {/* Discovery Confidence Breakdown (96% Requirement) */}
              <div className="border border-defense-700 bg-defense-950/60 rounded p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-defense-700/60 pb-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Discovery Confidence Score
                  </span>
                  <span className="text-emerald-400 font-bold text-xs">96% Confirmed</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Static AST Pattern Extraction</span>
                    <span className="text-emerald-400 font-bold">98% (EVP_DigestSignInit)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Runtime Telemetry (eBPF Hook)</span>
                    <span className="text-emerald-400 font-bold">95% (Active Key Usage)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">X.509 Certificate Binding</span>
                    <span className="text-emerald-400 font-bold">95% (Serial 0x4A1F82B9)</span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-defense-700/60 text-[10px] text-slate-400">
                  Multiple observation vectors confirm non-ephemeral usage across production identity endpoints.
                </div>
              </div>

              {/* Downstream Blast Impact Summary */}
              <div className="border border-defense-700 bg-defense-950/60 rounded p-3 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-defense-700/60 pb-1">
                  Downstream Blast Impact
                </div>
                <div className="grid grid-cols-4 border border-defense-700 bg-defense-900 rounded divide-x divide-defense-700 text-center py-2">
                  <div>
                    <div className="text-base font-bold text-slate-100">{appsAffected}</div>
                    <div className="text-[9px] text-slate-400 uppercase">Apps</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-100">{servicesImpacted}</div>
                    <div className="text-[9px] text-slate-400 uppercase">Services</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-100">{apisAffected}</div>
                    <div className="text-[9px] text-slate-400 uppercase">APIs</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-red-400">{criticalBizFunctions}</div>
                    <div className="text-[9px] text-red-400/80 uppercase">Critical Biz</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RISK */}
          {drawerTab === 'risk' && (
            <div className="space-y-4">
              {/* Score Headline */}
              <div className="p-3 rounded border border-red-500/40 bg-red-950/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-red-300 uppercase font-bold">Composite Quantum Risk</div>
                  <div className="text-xl font-black text-red-300">{compositeRiskScore} / 100</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Priority: {migrationPriority}</div>
                </div>
                <ShieldAlert className="w-8 h-8 text-red-400" />
              </div>

              {/* Shor Qubits & HNDL Warning */}
              <div className="border border-amber-500/30 bg-amber-950/10 rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-amber-300 text-[11px] font-bold">
                  <span>Shor&apos;s Algorithm Vulnerability</span>
                  <span>~2,048 Logical Qubits</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  RSA integer factorization is broken in polynomial time under quantum order-finding.
                </p>
                <div className="pt-1.5 border-t border-amber-500/20 text-[10px] text-amber-300">
                  ⚠️ <strong>HNDL Vulnerability:</strong> Intercepted network sessions and signed identity tokens can be stored today by state actors and forged retrospectively once quantum machines mature.
                </div>
              </div>

              {/* 7-Factor Risk Decomposition */}
              <div className="border border-defense-700 bg-defense-950/60 rounded p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-defense-700/60 pb-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">
                    Why This Score? (7-Factor Dotted Leader)
                  </span>
                  <span className="text-[10px] text-red-400 font-bold">Total: {compositeRiskScore} / 100</span>
                </div>

                <div className="space-y-2 pt-1">
                  {factors.map((f, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-300">{f.name}</span>
                        <span className="flex-1 mx-2 border-b border-dotted border-slate-700" />
                        <span className="text-slate-100 font-bold">{f.score} / {f.maxScore}</span>
                      </div>
                      <div className="text-[9px] text-slate-400 leading-tight">
                        {f.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEPENDENCIES */}
          {drawerTab === 'dependencies' && (
            <div className="space-y-4">
              <div className="border border-defense-700 bg-defense-950/60 rounded p-3 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-defense-700/60 pb-1">
                  Downstream Dependency Topology
                </div>
                <p className="text-[11px] text-slate-300">
                  Because this key signs root identity claims, revoking or modifying it impacts all services relying on assertion verification.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="p-2 rounded bg-defense-900 border border-defense-700">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">7 Dependent Applications</div>
                    <div className="text-xs text-slate-200 mt-1">
                      Citizen Services Portal, Payment Gateway, Document Mgmt System, Procurement Portal, Police RMS, Health Exchange, State Admin Console
                    </div>
                  </div>

                  <div className="p-2 rounded bg-defense-900 border border-defense-700">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">12 Microservices Impacted</div>
                    <div className="text-xs text-slate-200 mt-1">
                      Token Authority, SSO Engine, Settlement Service, Vault Storage, Audit Trail Engine, Notification Broker, User Profile API, etc.
                    </div>
                  </div>

                  <div className="p-2 rounded bg-defense-900 border border-defense-700">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">2 Critical Business Functions</div>
                    <div className="text-xs text-red-300 mt-1 font-semibold">
                      • National Citizen Authentication<br />
                      • Treasury & Revenue Settlement
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleViewDependencies}
                className="w-full py-2.5 px-3 rounded border border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Network className="w-4 h-4" />
                <span>EXPLORE IN FULL DEPENDENCY GRAPH</span>
              </button>
            </div>
          )}

          {/* TAB 4: EVIDENCE */}
          {drawerTab === 'evidence' && (
            <div className="space-y-4">
              <div className="border border-emerald-500/30 bg-emerald-950/10 rounded p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5" />
                    Cryptographic Evidence Ledger Record
                  </span>
                  <span className="text-emerald-300 font-mono text-[10px] border border-emerald-500/40 px-1.5 py-0.2 rounded">
                    BLOCK #004382
                  </span>
                </div>

                <div className="space-y-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Cryptographic DNA ID:</span>
                    <span className="text-slate-200 font-mono font-bold">{dnaId}</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px]">Merkle Block SHA-256 Hash:</span>
                      <button
                        onClick={() => handleCopyHash('7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069')}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedHash ? 'COPIED' : 'COPY'}</span>
                      </button>
                    </div>
                    <div className="p-2 rounded bg-defense-950 border border-defense-700 font-mono text-[10px] text-slate-300 break-all mt-0.5">
                      sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Audit Signature:</span>
                    <span className="text-emerald-300 font-mono text-[10px]">ECDSA_P256_SHA256:3045022100e4b8... (Simulated ECDAT Authority)</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block">Detection Verification:</span>
                    <span className="text-slate-200 text-[10px]">Static AST + Runtime eBPF telemetry hook + X.509 certificate binding</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleViewEvidenceLedger}
                className="w-full py-2.5 px-3 rounded border border-emerald-500/60 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <FileCheck className="w-4 h-4" />
                <span>OPEN TAMPER-EVIDENT EVIDENCE LEDGER</span>
              </button>
            </div>
          )}

          {/* TAB 5: MIGRATION */}
          {drawerTab === 'migration' && (
            <div className="space-y-4">
              <div className="border border-cyan-500/40 bg-cyan-950/20 rounded p-3 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold border-b border-cyan-500/30 pb-1">
                  Candidate Post-Quantum Cryptographic Approach
                </div>
                
                <div className="p-2.5 rounded bg-defense-900 border border-defense-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-100">ML-DSA (FIPS 204)</div>
                    <div className="text-[10px] text-slate-400">Module-Lattice Digital Signature Algorithm</div>
                  </div>
                  <span className="text-[9px] text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded bg-cyan-500/10 font-bold">
                    CANDIDATE APPROACH
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  <strong>Transition Strategy: Dual-Signature Hybrid Bridge.</strong> Issues assertions containing both classical RSA-2048 and ML-DSA signatures, ensuring backward compatibility for legacy clients while establishing quantum resistance for upgraded portals.
                </div>
              </div>

              {/* 4 Detected Migration Conflicts */}
              <div className="border border-amber-500/30 bg-amber-950/10 rounded p-3 space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold border-b border-amber-500/30 pb-1 flex items-center justify-between">
                  <span>Pre-Emptive Conflict Detection</span>
                  <span className="text-amber-400">4 Conflicts</span>
                </div>

                <div className="space-y-1.5 text-[10px] text-slate-300">
                  <div className="p-1.5 rounded bg-defense-900/80 border border-defense-700">
                    <strong className="text-red-400">1. Signature Size Expansion:</strong> ML-DSA signature expands to 2,420 bytes; exceeds HTTP header MTU in 2 legacy proxies.
                  </div>
                  <div className="p-1.5 rounded bg-defense-900/80 border border-defense-700">
                    <strong className="text-red-400">2. EOL OpenSSL 1.1.1u:</strong> Host service lacks native FIPS 204 bindings. Upgrade to OpenSSL 3.3.x required.
                  </div>
                  <div className="p-1.5 rounded bg-defense-900/80 border border-defense-700">
                    <strong className="text-amber-400">3. Certificate Authority Chain:</strong> Root CA lacks ML-DSA cross-certification.
                  </div>
                  <div className="p-1.5 rounded bg-defense-900/80 border border-defense-700">
                    <strong className="text-amber-400">4. Partner Ingress Rejection:</strong> 2 external payment gateways lack hybrid token parsing logic.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleSimulateDeprecation}
                  className="py-2.5 px-2 rounded border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>SIMULATE IMPACT</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('roadmap');
                    setIsDrawerOpen(false);
                  }}
                  className="py-2.5 px-2 rounded border border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Milestone className="w-3.5 h-3.5" />
                  <span>VIEW ROADMAP</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Global Bottom Actions Bar (Requirement #6) */}
        <div className="p-3 border-t border-defense-700 bg-defense-850 flex items-center gap-2 shrink-0">
          <button
            onClick={handleViewDependencies}
            className="flex-1 py-2 px-2.5 rounded border border-defense-700 hover:border-slate-500 bg-defense-900 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEPENDENCIES</span>
          </button>

          <button
            onClick={handleTraceDecision}
            className="flex-1 py-2 px-2.5 rounded border border-purple-500/40 hover:bg-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>TRACE</span>
          </button>

          <button
            onClick={handleViewEvidenceLedger}
            className="py-2 px-2.5 rounded border border-emerald-500/40 hover:bg-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            title="View tamper-evident audit record in Evidence Ledger"
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>LEDGER</span>
          </button>

          <button
            onClick={handleSimulateDeprecation}
            className="flex-1 py-2 px-2.5 rounded border border-red-500/40 hover:bg-red-500/20 bg-red-500/10 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>SIMULATE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
