import React from 'react';
import { useApp } from '../../context/AppContext';
import { IMPACT_SCENARIOS, MIGRATION_CONFLICTS_DETAILED } from '../../data/mockData';
import { 
  Workflow, 
  ArrowRight, 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle,
  AlertOctagon,
  Server,
  Layers,
  FileCode,
  Milestone
} from 'lucide-react';

export const ImpactSimulator: React.FC = () => {
  const { 
    activeScenario, 
    setActiveScenarioId, 
    isSimulating, 
    simulationStep, 
    runSimulation,
    generateMigrationPlan,
    setCurrentTab,
    openCopilotWithContext,
    openLedgerForDna
  } = useApp();

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto">
      {/* Top Header (Requirement #9) */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h1 className="text-base font-bold font-mono tracking-tight text-slate-100 uppercase">
                What-If Impact Simulator
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300">
                Decision Support
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate cryptographic deprecation blast radius and dependency cascades prior to production migration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openCopilotWithContext("Provide an impact assessment for the scenario: What if RSA-2048 is deprecated?")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Impact Analysis"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4 font-mono">
        {/* Scenario Selection Panel */}
        <div className="p-3 border border-defense-700 bg-defense-900 rounded-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider shrink-0">
                Scenario:
              </span>
              <select
                value={activeScenario.id}
                onChange={(e) => setActiveScenarioId(e.target.value)}
                className="bg-defense-850 border border-defense-700 text-slate-100 rounded-sm px-3 py-1.5 text-xs font-mono font-medium focus:border-cyan-500 focus:outline-none w-full max-w-lg"
              >
                {IMPACT_SCENARIOS.map((scen) => (
                  <option key={scen.id} value={scen.id}>
                    {scen.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={isSimulating}
              onClick={runSimulation}
              className="px-4 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? `Calculating (Step ${simulationStep}/4)...` : 'Run Simulation'}</span>
            </button>
          </div>
        </div>

        {/* Metrics Strip (Requirement #9: 12 Artefacts, 7 Apps, 12 Services, 3 APIs, 2 Critical Functions, 4 Migration Conflicts) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-defense-700 bg-defense-900 rounded-sm divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-defense-700">
          <div className="p-3 text-center">
            <div className="text-xl font-bold text-slate-100">{activeScenario.affectedArtefactsCount}</div>
            <div className="text-[10px] text-slate-400 uppercase mt-0.5">Artefacts</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-xl font-bold text-slate-100">{activeScenario.affectedAppsCount}</div>
            <div className="text-[10px] text-slate-400 uppercase mt-0.5">Apps</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-xl font-bold text-slate-100">{activeScenario.affectedServicesCount}</div>
            <div className="text-[10px] text-slate-400 uppercase mt-0.5">Services</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-xl font-bold text-slate-100">{activeScenario.affectedApisCount}</div>
            <div className="text-[10px] text-slate-400 uppercase mt-0.5">APIs</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-xl font-bold text-red-400">{activeScenario.criticalFunctionsCount}</div>
            <div className="text-[10px] text-red-400/80 uppercase mt-0.5">Critical Functions</div>
          </div>
          <div className="p-3 text-center bg-amber-500/5">
            <div className="text-xl font-bold text-amber-400">{activeScenario.migrationConflictsCount}</div>
            <div className="text-[10px] text-amber-400/80 uppercase mt-0.5">Migration Conflicts</div>
          </div>
        </div>

        {/* AFFECTED DEPENDENCY CHAIN (Requirement #9) */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Affected Dependency Chain
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <div className="px-3 py-1.5 rounded-sm border border-red-500/40 bg-red-500/10 text-red-300 font-bold">
              RSA-2048
            </div>
            <span className="text-slate-600">→</span>
            <div className="px-3 py-1.5 rounded-sm border border-defense-700 bg-defense-850 text-slate-200">
              OpenSSL / BouncyCastle
            </div>
            <span className="text-slate-600">→</span>
            <div className="px-3 py-1.5 rounded-sm border border-defense-700 bg-defense-850 text-slate-200">
              Exposed APIs (/oauth, /payments)
            </div>
            <span className="text-slate-600">→</span>
            <div className="px-3 py-1.5 rounded-sm border border-defense-700 bg-defense-850 text-slate-200">
              Applications (Auth, Payment, Portal)
            </div>
            <span className="text-slate-600">→</span>
            <div className="px-3 py-1.5 rounded-sm border border-red-500/30 bg-red-500/5 text-red-300">
              Critical Business Functions (Citizen ID, Treasury)
            </div>
          </div>
        </div>

        {/* Split Columns: TECHNICAL IMPACT vs BUSINESS IMPACT (Requirement #9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TECHNICAL IMPACT */}
          <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-2.5">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wide border-b border-defense-700 pb-1 flex items-center justify-between">
              <span>Technical Impact</span>
              <span className="text-[10px] text-slate-400 font-normal">Protocol & Systems</span>
            </div>

            <div className="space-y-2 text-xs font-sans text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">Token Invalidation: </strong>
                  Immediate revocation of authentication tokens across 12 downstream microservices relying on RSA-2048 signatures.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">API Ingress Failure: </strong>
                  3 public ingress APIs (/v2/oauth/authorize, /v1/payments/process, Edge Proxy) fail certificate verification.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">Library Incompatibility: </strong>
                  Legacy OpenSSL 1.1.1u cannot natively parse FIPS 204 (ML-DSA) without external bridge wrapper.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">Buffer Overflows: </strong>
                  Post-quantum signatures expand packet headers (ML-DSA-65 ~3.3KB vs RSA 256B) exceeding default MTU buffer limits.
                </p>
              </div>
            </div>
          </div>

          {/* BUSINESS IMPACT */}
          <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-2.5">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wide border-b border-defense-700 pb-1 flex items-center justify-between">
              <span>Business Impact</span>
              <span className="text-[10px] text-slate-400 font-normal">Operations & Governance</span>
            </div>

            <div className="space-y-2 text-xs font-sans text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">Citizen Auth Outage: </strong>
                  Complete outage of National Citizen Authentication service preventing citizen logins across state web portals.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">Payment Settlement Halt: </strong>
                  Treasury and Revenue settlement gateway interrupted, pausing automated financial disbursements.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">Partner Disconnect: </strong>
                  4 commercial banking partner APIs unable to validate uncoordinated signature format changes.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                <p>
                  <strong className="text-slate-200 font-mono text-[11px]">Compliance Breach: </strong>
                  Temporary failure of digital notary verification under current Electronic Governance and Public Records laws.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Migration Conflicts Table (4 Identified Conflicts) */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm">
          <div className="p-3 border-b border-defense-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Identified Migration Conflicts ({MIGRATION_CONFLICTS_DETAILED.length})
              </h3>
            </div>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
              ACTION REQUIRED PRIOR TO CUTOVER
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-defense-700 bg-defense-850/70 text-[10px] text-slate-400 uppercase">
                  <th className="py-2.5 px-3 font-semibold">Conflict Title</th>
                  <th className="py-2.5 px-3 font-semibold">Affected Asset</th>
                  <th className="py-2.5 px-3 font-semibold">Affected Dependency</th>
                  <th className="py-2.5 px-3 font-semibold">Severity</th>
                  <th className="py-2.5 px-3 font-semibold">Technical Root Cause</th>
                  <th className="py-2.5 px-3 font-semibold">Investigation & Remediation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-defense-700/60 text-[11px]">
                {MIGRATION_CONFLICTS_DETAILED.map((conf) => (
                  <tr key={conf.id} className="hover:bg-defense-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-200">
                      {conf.title}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {conf.affectedAsset}
                    </td>
                    <td className="py-2.5 px-3 text-cyan-300 font-mono text-[10px]">
                      {conf.affectedDependency}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.2 rounded border text-[10px] font-bold ${
                        conf.severity === 'Critical'
                          ? 'border-red-500/40 bg-red-500/10 text-red-400'
                          : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      }`}>
                        {conf.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans text-xs max-w-xs leading-tight">
                      {conf.reason}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-300 font-sans text-xs max-w-xs leading-tight">
                      {conf.investigationAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECOMMENDED NEXT ACTION (Requirement #9) */}
        <div className="p-3.5 border border-cyan-700/50 bg-cyan-950/20 rounded-sm space-y-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            Recommended Next Action
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            "Prioritize Authentication Service and Payment Gateway for migration planning because they are critical services with multiple downstream dependencies."
          </p>
        </div>

        {/* Bottom Call to Action (Requirement #9: GENERATE MIGRATION PLAN) */}
        <div className="p-4 border border-defense-700 bg-defense-900 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-200 uppercase">
              Ready to construct migration schedule?
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Exports simulated scenario findings directly into the 7-phase Quantum Readiness Roadmap.
            </p>
          </div>

          <button
            onClick={() => generateMigrationPlan()}
            className="px-6 py-2.5 rounded-sm bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-colors shrink-0"
          >
            <span>GENERATE MIGRATION PLAN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
