import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Info,
  Check,
  Search,
  Filter,
  FileCode
} from 'lucide-react';
import { UnknownCryptoItem } from '../../types';

export const UnknownCryptoModule: React.FC = () => {
  const { 
    unknownItems, 
    updateUnknownStatus, 
    openCopilotWithContext 
  } = useApp();

  const [selectedItem, setSelectedItem] = useState<UnknownCryptoItem>(unknownItems[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredItems = unknownItems.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Cryptographic Classification
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300">
                46 Artefacts Require Classification (Subset)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Identified via static analysis and pattern evidence. Requires security review to prevent unverified proprietary crypto risks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openCopilotWithContext("Analyze unclassified cryptography and potential proprietary cipher patterns.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Classification Review"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* Subtle Notice Banner */}
        <div className="p-3 rounded-sm border border-amber-500/30 bg-amber-500/5 flex items-start gap-2.5 text-xs font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="text-amber-200 font-semibold font-mono text-[11px]">
              Assurance Policy: Non-Standard In-House Algorithms
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              Standard cryptographic frameworks (FIPS 140-3 and NIST SP 800-175B) discourage unverified proprietary implementations. Detected via static heuristics and memory pointer patterns without requiring binary decompilation.
            </p>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Flagged Items List */}
          <div className="lg:col-span-5 border border-defense-700 bg-defense-900 rounded-sm flex flex-col">
            <div className="p-3 border-b border-defense-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wide">
                Flagged Symbols ({filteredItems.length})
              </span>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span>Filter:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-defense-850 border border-defense-700 text-slate-200 rounded px-1.5 py-0.5 outline-none cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="Requires Security Review">Requires Review</option>
                  <option value="Marked as Audited">Audited</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-defense-700/60 overflow-y-auto flex-1 max-h-[500px]">
              {filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isAudited = item.status === 'Marked as Audited';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 cursor-pointer transition-colors text-xs space-y-1 ${
                      isSelected 
                        ? 'bg-defense-800/80 border-l-2 border-amber-500' 
                        : 'hover:bg-defense-850/60 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100">{item.symbol}</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded border ${
                        item.reviewPriority === 'Critical'
                          ? 'border-red-500/30 bg-red-500/10 text-red-400'
                          : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                      }`}>
                        {item.reviewPriority}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 truncate">{item.location}</div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                      <span>App: {item.relatedApplication}</span>
                      <span className={isAudited ? 'text-emerald-400' : 'text-amber-400'}>
                        {isAudited ? 'AUDITED' : 'REQUIRES REVIEW'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Inspection Panel */}
          {selectedItem && (
            <div className="lg:col-span-7 border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-defense-700">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-100">{selectedItem.symbol}</h3>
                    <span className="text-[10px] text-slate-400">({selectedItem.relatedApplication})</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{selectedItem.location}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Confidence:</span>
                  <div className="text-sm font-bold text-cyan-400">{selectedItem.detectionConfidence}%</div>
                </div>
              </div>

              {/* Static Analysis Evidence */}
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  Static Analysis Evidence
                </div>
                <div className="p-2.5 rounded-sm border border-defense-700 bg-defense-950/70 text-slate-300 text-xs font-sans leading-relaxed">
                  {selectedItem.staticAnalysisEvidence}
                </div>
              </div>

              {/* Pattern Evidence */}
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  Matched Heuristic Patterns
                </div>
                <div className="space-y-1">
                  {selectedItem.patternEvidence.map((pattern, idx) => (
                    <div key={idx} className="p-2 rounded-sm border border-defense-700 bg-defense-950/40 flex items-start gap-2 text-xs font-sans text-slate-300">
                      <span className="text-amber-400 font-mono text-[10px] mt-0.5">[{idx + 1}]</span>
                      <span>{pattern}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Purpose */}
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  Inferred Purpose
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  {selectedItem.potentialPurpose}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-defense-700 flex items-center gap-2">
                <button
                  onClick={() => updateUnknownStatus(
                    selectedItem.id, 
                    selectedItem.status === 'Marked as Audited' ? 'Requires Security Review' : 'Marked as Audited'
                  )}
                  className="py-1.5 px-3 rounded-sm border border-defense-700 hover:border-slate-500 bg-defense-850 text-slate-200 text-xs font-bold uppercase transition-colors"
                >
                  {selectedItem.status === 'Marked as Audited' ? 'Reopen for Review' : 'Mark as Audited'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
