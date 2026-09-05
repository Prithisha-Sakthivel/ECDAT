import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CRYPTOGRAPHIC_POLICIES, POLICY_VIOLATIONS } from '../../data/mockData';
import { 
  ShieldAlert, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Sparkles, 
  Lock, 
  ChevronRight, 
  FileText,
  Calendar,
  User,
  Clock
} from 'lucide-react';
import { CryptographicPolicy, PolicyViolation } from '../../types';

export const PolicyComplianceModule: React.FC = () => {
  const { 
    openAssetIntelligence, 
    setCurrentTab, 
    openCopilotWithContext,
    openLedgerForDna
  } = useApp();

  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredViolations = useMemo(() => {
    return POLICY_VIOLATIONS.filter(v => {
      if (selectedFramework !== 'all' && v.policyId !== selectedFramework) return false;
      if (severityFilter !== 'all' && v.severity !== severityFilter) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        v.policyName.toLowerCase().includes(q) ||
        v.asset.toLowerCase().includes(q) ||
        v.algorithm.toLowerCase().includes(q) ||
        v.dnaId.toLowerCase().includes(q) ||
        v.violationReason.toLowerCase().includes(q)
      );
    });
  }, [selectedFramework, severityFilter, searchQuery]);

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Top Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Cryptographic Policy & Compliance Engine
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300">
                Mandate Enforcement
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Algorithmic governance and automated compliance tracking against NIST, CNSA 2.0, FIPS 140-3, and PCI-DSS 4.0 standards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openCopilotWithContext("Review enterprise policy compliance posture across CNSA 2.0 and FIPS 140-3.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Compliance Counsel"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* 4 Policy Framework Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CRYPTOGRAPHIC_POLICIES.map((pol) => {
            const isSelected = selectedFramework === pol.id;
            return (
              <div
                key={pol.id}
                onClick={() => setSelectedFramework(isSelected ? 'all' : pol.id)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-500 bg-defense-850 shadow-md ring-1 ring-cyan-500/40'
                    : 'border-defense-700 bg-defense-900 hover:bg-defense-850/60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase">{pol.framework}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      pol.status === 'Enforced'
                        ? 'border border-red-500/40 bg-red-500/10 text-red-300'
                        : 'border border-amber-500/40 bg-amber-500/10 text-amber-300'
                    }`}>
                      {pol.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-100 text-xs line-clamp-1">
                    {pol.name}
                  </h3>

                  <p className="text-[10px] text-slate-400 font-sans leading-snug line-clamp-2">
                    {pol.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-defense-700/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Active Violations:</span>
                  <span className="font-bold text-red-400 text-xs">
                    {pol.violationsCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Violations Filter & Table Header */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm">
          <div className="p-3 border-b border-defense-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Identified Cryptographic Violations ({filteredViolations.length})
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Severity Filter */}
              <div className="flex items-center bg-defense-850 border border-defense-700 rounded p-0.5 text-[10px]">
                {['all', 'Critical', 'High'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-2 py-0.5 rounded transition-colors capitalize ${
                      severityFilter === sev
                        ? 'bg-defense-750 text-slate-100 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Filter violations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs bg-defense-850 border border-defense-700 rounded-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-56"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-defense-700 bg-defense-850/70 text-[10px] text-slate-400 uppercase">
                  <th className="py-2.5 px-3 font-semibold">Policy Standard</th>
                  <th className="py-2.5 px-3 font-semibold">Cryptographic DNA</th>
                  <th className="py-2.5 px-3 font-semibold">Affected Asset</th>
                  <th className="py-2.5 px-3 font-semibold">Algorithm</th>
                  <th className="py-2.5 px-3 font-semibold">Severity</th>
                  <th className="py-2.5 px-3 font-semibold">Violation Rationale</th>
                  <th className="py-2.5 px-3 font-semibold">Remediation Target</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-defense-700/60 text-[11px]">
                {filteredViolations.map((v) => (
                  <tr key={v.id} className="hover:bg-defense-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-300">
                      {v.policyName.split(' ')[0]} {v.policyName.split(' ')[1]}
                    </td>
                    <td className="py-2.5 px-3 text-cyan-400 font-semibold">
                      {v.dnaId}
                    </td>
                    <td className="py-2.5 px-3 text-slate-100 font-medium">
                      {v.asset}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {v.algorithm}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.2 rounded border text-[10px] font-bold ${
                        v.severity === 'Critical'
                          ? 'border-red-500/40 bg-red-500/10 text-red-400'
                          : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      }`}>
                        {v.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans text-xs max-w-xs leading-tight">
                      {v.violationReason}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[10px] whitespace-nowrap">
                      {v.remediationTimeline}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openAssetIntelligence(v.algorithm)}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 underline"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => openLedgerForDna(v.dnaId)}
                          className="text-[10px] text-emerald-400 hover:text-emerald-300 underline"
                        >
                          Ledger
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 border-t border-defense-700 bg-defense-850/50 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Enforced Mandate Audit Cycle: Realtime AST & Telemetry Synchronization</span>
            <span className="text-slate-300">Total Enforced Policies: 4 Frameworks</span>
          </div>
        </div>
      </div>
    </div>
  );
};
