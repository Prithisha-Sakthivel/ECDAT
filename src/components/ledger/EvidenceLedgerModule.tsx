import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { EVIDENCE_LEDGER_RECORDS } from '../../data/mockData';
import { 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Hash, 
  Search, 
  Filter, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Link2,
  AlertCircle
} from 'lucide-react';
import { EvidenceLedgerRecord } from '../../types';

export const EvidenceLedgerModule: React.FC = () => {
  const { 
    selectedLedgerDnaId, 
    setSelectedLedgerDnaId,
    openAssetIntelligence,
    setCurrentTab,
    openCopilotWithContext
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecordNumber, setSelectedRecordNumber] = useState<string>('#004382');
  const [isVerifyingChain, setIsVerifyingChain] = useState<boolean>(false);
  const [chainVerified, setChainVerified] = useState<boolean>(true);

  // Filter records
  const filteredRecords = useMemo(() => {
    return EVIDENCE_LEDGER_RECORDS.filter(r => {
      if (selectedLedgerDnaId && r.dnaId !== selectedLedgerDnaId) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        r.recordNumber.toLowerCase().includes(q) ||
        r.dnaId.toLowerCase().includes(q) ||
        r.assetName.toLowerCase().includes(q) ||
        r.sourcePath.toLowerCase().includes(q) ||
        r.evidenceHash.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedLedgerDnaId]);

  const activeRecord = useMemo(() => {
    return (
      EVIDENCE_LEDGER_RECORDS.find(r => r.recordNumber === selectedRecordNumber) ||
      filteredRecords[0] ||
      EVIDENCE_LEDGER_RECORDS[0]
    );
  }, [selectedRecordNumber, filteredRecords]);

  const verifyIntegrity = () => {
    setIsVerifyingChain(true);
    setTimeout(() => {
      setIsVerifyingChain(false);
      setChainVerified(true);
    }, 850);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Module Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Cryptographic Evidence Ledger
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                Tamper-Evident Audit
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Cryptographically chained SHA-256 discovery evidence providing audit defensibility and explainable recommendation traces.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={verifyIntegrity}
              disabled={isVerifyingChain}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isVerifyingChain ? 'animate-spin' : ''}`} />
              <span>{isVerifyingChain ? 'Verifying Hashes...' : 'Verify Chain Integrity'}</span>
            </button>

            <button
              onClick={() => openCopilotWithContext("Explain the cryptographic verification chain for finding record #004382.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Ledger Briefing"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* Visual Hash Chain Diagram */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cryptographic Hash Chain Sequence (SHA-256 Merkle Linkage)</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-slate-400">Chain Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED (0 TAMPERING DETECTED)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-1">
            {EVIDENCE_LEDGER_RECORDS.slice().reverse().map((rec, idx) => {
              const isSelected = rec.recordNumber === activeRecord.recordNumber;
              return (
                <div
                  key={rec.recordNumber}
                  onClick={() => setSelectedRecordNumber(rec.recordNumber)}
                  className={`p-2.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500 bg-defense-850 shadow-md ring-1 ring-cyan-500/40'
                      : 'border-defense-700 bg-defense-950/60 hover:bg-defense-850/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-cyan-400 font-bold">{rec.recordNumber}</span>
                    <span className="text-slate-500 text-[9px]">STEP 0{idx + 1}</span>
                  </div>
                  <div className="font-bold text-slate-200 text-xs truncate mt-1">
                    {rec.assetName.split('(')[0].trim()}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono truncate mt-0.5">
                    {rec.dnaId}
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-defense-700/60 text-[9px] text-slate-400 flex items-center justify-between">
                    <span className="truncate">prev: {rec.previousHash.slice(7, 15)}...</span>
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence to Decision Trace View ("Why did ECDAT recommend this?") */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-defense-700 pb-2 gap-2">
            <div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                <Fingerprint className="w-4 h-4 text-cyan-400" />
                <span>Evidence-to-Decision Trace: {activeRecord.assetName}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                Full mathematical and contextual audit trail justifying ECDAT's remediation prioritization
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded border border-defense-700 bg-defense-850 text-slate-300 font-mono">
                {activeRecord.dnaId}
              </span>
              <button
                onClick={() => openAssetIntelligence('RSA-2048')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline"
              >
                <span>Inspect in CBOM</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 7-Step Evidence Trace Flow */}
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-7 border border-defense-700 bg-defense-950/70 rounded-sm divide-y md:divide-y-0 md:divide-x divide-defense-700 text-[11px]">
              <div className="p-2.5 space-y-1">
                <div className="text-[9px] text-slate-500 uppercase font-bold">1. Discovery Vector</div>
                <div className="text-slate-200 font-semibold">Static AST</div>
                <div className="text-[9px] text-slate-400 leading-tight truncate">{activeRecord.sourcePath}</div>
              </div>

              <div className="p-2.5 space-y-1">
                <div className="text-[9px] text-slate-500 uppercase font-bold">2. Primitive DNA</div>
                <div className="text-slate-200 font-semibold">OpenSSL 1.1.1u</div>
                <div className="text-[9px] text-slate-400 leading-tight">RSA-2048 (EVP_DigestSign)</div>
              </div>

              <div className="p-2.5 space-y-1">
                <div className="text-[9px] text-slate-500 uppercase font-bold">3. Blast Radius</div>
                <div className="text-red-400 font-semibold">7 Apps / 12 Srv</div>
                <div className="text-[9px] text-slate-400 leading-tight">3 APIs · 2 Critical Functions</div>
              </div>

              <div className="p-2.5 space-y-1">
                <div className="text-[9px] text-slate-500 uppercase font-bold">4. Quantum Risk</div>
                <div className="text-red-400 font-semibold">Score: 92/100</div>
                <div className="text-[9px] text-slate-400 leading-tight">Shor Integer Factorization</div>
              </div>

              <div className="p-2.5 space-y-1">
                <div className="text-[9px] text-slate-500 uppercase font-bold">5. Ledger Hash</div>
                <div className="text-emerald-400 font-semibold">SHA-256 Sealed</div>
                <div className="text-[9px] text-slate-400 leading-tight font-mono">{activeRecord.evidenceHash.slice(7, 19)}...</div>
              </div>

              <div className="p-2.5 space-y-1">
                <div className="text-[9px] text-slate-500 uppercase font-bold">6. Policy Impact</div>
                <div className="text-amber-400 font-semibold">CNSA 2.0</div>
                <div className="text-[9px] text-slate-400 leading-tight">Mandate Non-Compliance</div>
              </div>

              <div className="p-2.5 space-y-1 bg-cyan-950/20">
                <div className="text-[9px] text-cyan-400 uppercase font-bold">7. Decision</div>
                <div className="text-cyan-200 font-bold">P1 Priority</div>
                <div className="text-[9px] text-slate-300 leading-tight">Deploy ML-DSA Dual-Bridge</div>
              </div>
            </div>

            <div className="p-3 rounded-sm border border-defense-700/80 bg-defense-850/40 text-xs font-sans text-slate-300 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 font-mono text-[11px]">Audit Defensibility Rationale: </strong>
                <span>{activeRecord.summary}</span>
                <span className="block text-[11px] text-slate-400 mt-1 font-mono">
                  Cryptographic Signature: <span className="text-emerald-400">{activeRecord.cryptographicSignature}</span> | Block Timestamp: <span className="text-slate-300">{activeRecord.timestamp}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger Records Table & Search */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm">
          <div className="p-3 border-b border-defense-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Tamper-Evident Cryptographic Records ({filteredRecords.length})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {selectedLedgerDnaId && (
                <button
                  onClick={() => setSelectedLedgerDnaId(null)}
                  className="px-2 py-1 rounded bg-defense-800 border border-defense-700 text-slate-300 text-[10px] hover:text-slate-100 flex items-center gap-1"
                >
                  <span>Filtering: {selectedLedgerDnaId}</span>
                  <span className="text-red-400">×</span>
                </button>
              )}

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Filter records, DNA, hashes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs bg-defense-850 border border-defense-700 rounded-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-defense-700 bg-defense-850/70 text-[10px] text-slate-400 uppercase">
                  <th className="py-2.5 px-3 font-semibold">Record #</th>
                  <th className="py-2.5 px-3 font-semibold">Cryptographic DNA</th>
                  <th className="py-2.5 px-3 font-semibold">Asset / Artifact</th>
                  <th className="py-2.5 px-3 font-semibold">Source Path</th>
                  <th className="py-2.5 px-3 font-semibold">Evidence SHA-256 Hash</th>
                  <th className="py-2.5 px-3 font-semibold">Previous Hash</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-defense-700/60 text-[11px]">
                {filteredRecords.map((rec) => {
                  const isSelected = rec.recordNumber === activeRecord.recordNumber;
                  return (
                    <tr
                      key={rec.recordNumber}
                      onClick={() => setSelectedRecordNumber(rec.recordNumber)}
                      className={`hover:bg-defense-800/60 cursor-pointer transition-colors ${
                        isSelected ? 'bg-defense-800/80 border-l-2 border-cyan-500' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-bold text-cyan-400">
                        {rec.recordNumber}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-semibold">
                        {rec.dnaId}
                      </td>
                      <td className="py-2.5 px-3 text-slate-200">
                        {rec.assetName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[10px] truncate max-w-[200px]">
                        {rec.sourcePath}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400 truncate max-w-[140px]" title={rec.evidenceHash}>
                        {rec.evidenceHash.slice(0, 16)}...
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500 truncate max-w-[120px]" title={rec.previousHash}>
                        {rec.previousHash.slice(0, 12)}...
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.2 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center gap-1 w-max">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{rec.status}</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-400 text-[10px] whitespace-nowrap">
                        {rec.timestamp.split(' ')[1]} UTC
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 border-t border-defense-700 bg-defense-850/50 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Total Committed Audit Blocks: 4,382 Records</span>
            <span className="text-slate-300">Hash Standard: FIPS 180-4 SHA-256</span>
          </div>
        </div>
      </div>
    </div>
  );
};
