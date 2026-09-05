import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitCommit, 
  ShieldAlert, 
  Network, 
  Workflow, 
  Fingerprint, 
  ExternalLink, 
  CheckCircle2, 
  ArrowDown, 
  Layers, 
  Server, 
  Cpu, 
  Lock, 
  FileCode2, 
  AlertTriangle,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  FileCheck
} from 'lucide-react';
import { ARTEFACTS_CATALOG } from '../../data/mockData';

interface TraceStepNode {
  id: string;
  stepNumber: string;
  category: 'DECISION' | 'RISK ASSESSMENT' | 'ALGORITHM' | 'LIBRARY' | 'HOST SERVICE' | 'DEPENDENCY BLAST' | 'BUSINESS IMPACT' | 'PROVENANCE';
  title: string;
  badge: string;
  badgeTone: 'red' | 'amber' | 'cyan' | 'emerald' | 'purple';
  description: string;
  metrics: { label: string; value: string }[];
  technicalDetails: {
    key: string;
    value: string;
    mono?: boolean;
  }[];
  evidenceHash?: string;
  actionLabel?: string;
  actionTab?: string;
}

export const DecisionTraceModule: React.FC = () => {
  const { 
    openAssetIntelligence, 
    setCurrentTab, 
    setSelectedGraphNodeId, 
    triggerSimulateDeprecationFromGraph,
    openLedgerForDna
  } = useApp();

  const [selectedStepId, setSelectedStepId] = useState<string>('step-01');
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  // Vertical trace chain aligning with Section 12 of ECDAT specification
  const TRACE_STEPS: TraceStepNode[] = [
    {
      id: 'step-01',
      stepNumber: '01',
      category: 'DECISION',
      title: 'P1 Executive Recommendation Issued',
      badge: 'PRIORITY: P1 — IMMEDIATE',
      badgeTone: 'red',
      description: 'System automatically queued asset for immediate cryptographic remediation planning based on multi-criteria risk threshold exceeding 90/100.',
      metrics: [
        { label: 'Decision Rule', value: 'Composite Risk >= 90 & Critical Path' },
        { label: 'Action Mandate', value: 'Draft PQC Migration Plan within 30 days' },
        { label: 'Governance Ref', value: 'CNSA 2.0 / NIST SP 800-131A' }
      ],
      technicalDetails: [
        { key: 'Target Asset', value: 'Authentication Service (RSA-2048)' },
        { key: 'Assigned Priority', value: 'P1 — Immediate Planning' },
        { key: 'Decision Trigger', value: 'Composite Score 92/100 (Quantum + Critical Path)' },
        { key: 'Policy Non-Compliance', value: 'CNSA 2.0 (High Priority Violation)' }
      ]
    },
    {
      id: 'step-02',
      stepNumber: '02',
      category: 'RISK ASSESSMENT',
      title: 'Composite Risk Engine Calculated 92 / 100',
      badge: 'SCORE: 92 / 100 (CRITICAL)',
      badgeTone: 'red',
      description: '7-Factor explainable calculation factoring quantum threat, root business criticality, data sensitivity, public exposure, dependency depth, and migration complexity.',
      metrics: [
        { label: 'Quantum Vulnerability', value: '23 / 25' },
        { label: 'Business Criticality', value: '20 / 20' },
        { label: 'Data Sensitivity', value: '18 / 20' },
        { label: 'External Exposure', value: '13 / 15' }
      ],
      technicalDetails: [
        { key: 'Quantum Vulnerability', value: '23 / 25 (Polynomial-time integer factorization)' },
        { key: 'Business Criticality', value: '20 / 20 (Root identity truth for all government portals)' },
        { key: 'Data Sensitivity', value: '18 / 20 (Signs citizen claims & OAuth tokens)' },
        { key: 'External Exposure', value: '13 / 15 (Internet ingress /v2/oauth/authorize)' },
        { key: 'Dependency Blast', value: '8 / 10 (7 downstream apps, 12 services)' },
        { key: 'Migration Complexity', value: '6 / 10 (Dual-signature transition bridge required)' },
        { key: 'Cryptographic Strength', value: '4 / 10 (2048-bit modulus = 112-bit classical margin)' }
      ]
    },
    {
      id: 'step-03',
      stepNumber: '03',
      category: 'ALGORITHM',
      title: 'Quantum Vulnerability: RSA-2048 Key Pair',
      badge: 'ALGO: RSA-2048 (SHOR THREAT)',
      badgeTone: 'red',
      description: "RSA-2048 uses integer factorization which is mathematically solvable in polynomial time using Shor's Algorithm on a cryptographically relevant quantum computer (CRQC).",
      metrics: [
        { label: 'Estimated Qubits', value: '~2,048 Logical Qubits' },
        { label: 'HNDL Vulnerability', value: 'HIGH (Traffic Captured)' },
        { label: 'Mathematical Weakness', value: 'Order Finding / QFT' }
      ],
      technicalDetails: [
        { key: 'Modulus Size', value: '2048 bits' },
        { key: 'Public Exponent', value: '65537 (0x10001)' },
        { key: 'Key DNA ID', value: 'ECDAT-CRYPTO-004382', mono: true },
        { key: 'Quantum Complexity', value: 'O((log N)^3) via Shor on CRQC' },
        { key: 'Harvest Now Decrypt Later', value: 'Vulnerable (Tokens valid across federation)' }
      ]
    },
    {
      id: 'step-04',
      stepNumber: '04',
      category: 'LIBRARY',
      title: 'Cryptographic Implementation: OpenSSL 1.1.1u',
      badge: 'LIB: OPENSSL 1.1.1u (EOL)',
      badgeTone: 'amber',
      description: 'Implemented through deprecated OpenSSL 1.1.1 branch (End-Of-Life September 2023). Lacks native support for post-quantum cryptographic primitives (ML-DSA / ML-KEM).',
      metrics: [
        { label: 'Library Version', value: '1.1.1u (Deprecated)' },
        { label: 'FIPS 140-3 Status', value: 'Non-Compliant Module' },
        { label: 'Post-Quantum Support', value: 'None (Requires 3.2+ or OQS)' }
      ],
      technicalDetails: [
        { key: 'Library Name', value: 'OpenSSL Crypto Core' },
        { key: 'Installed Version', value: '1.1.1u' },
        { key: 'Engine Interface', value: 'EVP_DigestSignInit / EVP_PKEY_RSA' },
        { key: 'Support Status', value: 'End-Of-Life (No vendor security patches)' },
        { key: 'Target PQC Library', value: 'OpenSSL 3.3.x + liboqs Provider' }
      ]
    },
    {
      id: 'step-05',
      stepNumber: '05',
      category: 'HOST SERVICE',
      title: 'Host Workload: Authentication Service',
      badge: 'HOST: AUTHENTICATION SERVICE',
      badgeTone: 'cyan',
      description: 'Directly embedded in the core Authentication Service container image running within the private Kubernetes identity cluster.',
      metrics: [
        { label: 'Environment', value: 'Production (Identity VPC)' },
        { label: 'Deployment', value: 'Kubernetes StatefulSet (6 pods)' },
        { label: 'Traffic Volume', value: '14,200 auth req/sec' }
      ],
      technicalDetails: [
        { key: 'Host Container', value: 'auth-service:v2.14.2' },
        { key: 'Source Location', value: 'services/auth/src/crypto/token_signer.c:142', mono: true },
        { key: 'Memory Footprint', value: '256 MB per pod' },
        { key: 'Network Ingress', value: 'Private Mesh + Ingress Controller' }
      ]
    },
    {
      id: 'step-06',
      stepNumber: '06',
      category: 'DEPENDENCY BLAST',
      title: 'Downstream Blast Radius: 7 Applications, 12 Services, 3 APIs',
      badge: 'BLAST: 7 APPS / 12 SVCS / 3 APIS',
      badgeTone: 'purple',
      description: 'Because all tokens and certificates are signed by this root key, an uncoordinated deprecation or key replacement causes widespread authentication cascading failures.',
      metrics: [
        { label: 'Applications', value: '7 Dependent Systems' },
        { label: 'Microservices', value: '12 Internal Services' },
        { label: 'Exposed APIs', value: '3 Public/Private Endpoints' }
      ],
      technicalDetails: [
        { key: 'Dependent Applications', value: 'Citizen Portal, Payment Gateway, Document Vault, Procurement, Police RMS, Health Exchange, Admin SSO' },
        { key: 'Key Downstream Services', value: 'Token Authority, SSO Engine, Settlement Service, Audit Log Engine' },
        { key: 'Ingress Endpoints', value: '/v2/oauth/authorize, /v1/payments/process, Edge Reverse Proxy' },
        { key: 'Failure Mode if Broken', value: 'HTTP 401 Unauthorized cascade across all 7 applications' }
      ]
    },
    {
      id: 'step-07',
      stepNumber: '07',
      category: 'BUSINESS IMPACT',
      title: 'Impact on 2 Critical Business Functions',
      badge: 'BUSINESS: 2 CRITICAL FUNCTIONS',
      badgeTone: 'red',
      description: 'Direct operational impact on national-scale citizen identity verification and revenue payment settlement.',
      metrics: [
        { label: 'Function 1', value: 'National Citizen Authentication' },
        { label: 'Function 2', value: 'Treasury & Revenue Settlement' },
        { label: 'Citizen Impact', value: 'Millions of citizens unable to access services' }
      ],
      technicalDetails: [
        { key: 'Function 1: Citizen Auth', value: 'All federal single-sign-on sessions terminate; citizen portal blocked.' },
        { key: 'Function 2: Revenue Settle', value: 'Inter-agency merchant settlement unable to verify signed transaction tokens.' },
        { key: 'Financial Exposure', value: 'Est. 18.4M INR per hour downtime impact in state revenue pipelines.' }
      ]
    },
    {
      id: 'step-08',
      stepNumber: '08',
      category: 'PROVENANCE',
      title: 'Discovery Evidence & Cryptographic Verification Proof',
      badge: 'EVIDENCE: MERKLE SEALED',
      badgeTone: 'emerald',
      description: 'Triple-source verification via Static AST extraction, runtime eBPF telemetry hook, and X.509 certificate parser sealed into an immutable SHA-256 evidence record.',
      metrics: [
        { label: 'Discovery Confidence', value: '96% Confirmed' },
        { label: 'Detection Sources', value: 'AST + eBPF + X.509' },
        { label: 'Ledger Block', value: '#004382' }
      ],
      technicalDetails: [
        { key: 'Static AST Discovery', value: 'Matched EVP_DigestSignInit with RSA_PKCS1_PADDING in token_signer.c:142' },
        { key: 'Runtime Telemetry', value: 'eBPF probe libcrypto.so:RSA_sign logged 1.2M operations/day' },
        { key: 'Certificate Parser', value: 'X.509 serial 0x4A1F82B910C3 with sha256WithRSAEncryption' },
        { key: 'Tamper-Evident Hash', value: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', mono: true }
      ],
      evidenceHash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
    }
  ];

  const activeStep = TRACE_STEPS.find(s => s.id === selectedStepId) || TRACE_STEPS[0];

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-hidden font-mono">
      {/* Top Banner */}
      <div className="p-4 border-b border-defense-700 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Visual Decision Trace Engine
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                EXPLAINABLE AUDIT TRAIL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic lineage: connecting high-level executive recommendations down to concrete source-code cryptography and verification proof.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAssetIntelligence('RSA-2048')}
              className="px-3 py-1.5 rounded-sm border border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>INSPECT RSA-2048</span>
            </button>
            <button
              onClick={() => setCurrentTab('graph')}
              className="px-3 py-1.5 rounded-sm border border-defense-700 hover:border-slate-500 bg-defense-850 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>DEPENDENCY GRAPH</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Body: Left Vertical Flow (Section 12), Right Deep Dive */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Trace Flow Stepper */}
        <div className="w-full md:w-5/12 lg:w-4/12 border-r border-defense-700 bg-defense-900/50 overflow-y-auto p-4 space-y-3">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold pb-1 border-b border-defense-700/60 flex items-center justify-between">
            <span>Trace Lineage Sequence</span>
            <span className="text-cyan-400">8 Verified Steps</span>
          </div>

          <div className="space-y-2">
            {TRACE_STEPS.map((step, idx) => {
              const isSelected = step.id === selectedStepId;
              const isLast = idx === TRACE_STEPS.length - 1;

              return (
                <div key={step.id} className="relative">
                  <div
                    onClick={() => setSelectedStepId(step.id)}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-cyan-500/80 bg-cyan-950/20 shadow-md shadow-cyan-950/30' 
                        : 'border-defense-700/80 bg-defense-900/80 hover:border-slate-500 hover:bg-defense-850/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'bg-cyan-500 text-black' : 'bg-defense-800 text-slate-400'
                        }`}>
                          {step.stepNumber}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                          {step.category}
                        </span>
                      </div>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${
                        step.badgeTone === 'red' ? 'border-red-500/40 bg-red-500/10 text-red-300' :
                        step.badgeTone === 'amber' ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' :
                        step.badgeTone === 'cyan' ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' :
                        step.badgeTone === 'purple' ? 'border-purple-500/40 bg-purple-500/10 text-purple-300' :
                        'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      }`}>
                        {step.badge}
                      </span>
                    </div>

                    <h3 className={`text-xs font-bold ${isSelected ? 'text-cyan-200' : 'text-slate-200'}`}>
                      {step.title}
                    </h3>

                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-3.5 h-3.5 text-defense-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Node Inspector */}
        <div className="flex-1 overflow-y-auto p-6 bg-defense-950 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Active Step Header Card */}
            <div className="p-5 rounded border border-defense-700 bg-defense-900/90 shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-defense-700/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-defense-800 border border-defense-700 flex items-center justify-center text-sm font-bold text-cyan-400">
                    {activeStep.stepNumber}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      {activeStep.category}
                    </span>
                    <h2 className="text-base font-bold text-slate-100">
                      {activeStep.title}
                    </h2>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded text-xs font-bold border self-start sm:self-center ${
                  activeStep.badgeTone === 'red' ? 'border-red-500/40 bg-red-500/10 text-red-300' :
                  activeStep.badgeTone === 'amber' ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' :
                  activeStep.badgeTone === 'cyan' ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' :
                  activeStep.badgeTone === 'purple' ? 'border-purple-500/40 bg-purple-500/10 text-purple-300' :
                  'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                }`}>
                  {activeStep.badge}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>

              {/* Step Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {activeStep.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded border border-defense-700/80 bg-defense-850/60">
                    <div className="text-[10px] text-slate-400 uppercase">{m.label}</div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Verification Breakdown */}
            <div className="p-5 rounded border border-defense-700 bg-defense-900/90 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-defense-700/80 pb-2">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Technical Evidence & Parameters
                </span>
                <span className="text-[10px] text-slate-400">Ground Truth Audit Reference</span>
              </div>

              <div className="space-y-2">
                {activeStep.technicalDetails.map((detail, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between p-2 rounded bg-defense-950/60 border border-defense-700/40 text-xs gap-2">
                    <span className="text-slate-400 font-medium sm:w-1/3 shrink-0">{detail.key}:</span>
                    <span className={`text-slate-200 sm:w-2/3 ${detail.mono ? 'font-mono text-cyan-300 text-[11px] break-all' : ''}`}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              {activeStep.evidenceHash && (
                <div className="p-3 rounded border border-emerald-500/30 bg-emerald-950/10 space-y-1.5 mt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5" />
                      Cryptographic Evidence Ledger Seal
                    </span>
                    <button
                      onClick={() => handleCopyHash(activeStep.evidenceHash!)}
                      className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border border-defense-700 bg-defense-800"
                    >
                      {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 break-all bg-defense-950/80 p-2 rounded border border-defense-700">
                    sha256:{activeStep.evidenceHash}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Navigation Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openAssetIntelligence('RSA-2048')}
                className="py-2 px-4 rounded border border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>OPEN SOC ASSET DRAWER</span>
              </button>

              <button
                onClick={() => triggerSimulateDeprecationFromGraph()}
                className="py-2 px-4 rounded border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>SIMULATE DEPRECATION</span>
              </button>

              <button
                onClick={() => {
                  openLedgerForDna('ECDAT-CRYPTO-004382');
                }}
                className="py-2 px-4 rounded border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Fingerprint className="w-3.5 h-3.5" />
                <span>VIEW EVIDENCE RECORD</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
