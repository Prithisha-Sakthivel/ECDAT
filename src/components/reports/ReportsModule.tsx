import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Check, 
  Sparkles
} from 'lucide-react';
import { DEMO_ORGANIZATION } from '../../data/mockData';

export const ReportsModule: React.FC = () => {
  const { openCopilotWithContext } = useApp();

  const [selectedReportType, setSelectedReportType] = useState<string>('executive');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const reportTypes = [
    { id: 'executive', name: 'Executive Summary Briefing', desc: 'High-level CISO & National Cyber Agency readiness posture' },
    { id: 'cbom', name: 'Cryptographic Bill of Materials (CBOM)', desc: 'CycloneDX 1.6 CBOM schema containing all primitives, keys & algorithms' },
    { id: 'quantum-risk', name: 'Quantum Risk Assessment', desc: 'Detailed 7-factor risk scoring and HNDL vulnerability analysis' },
    { id: 'dependency-impact', name: 'Dependency Impact & Blast Radius', desc: 'Full blast radius maps and cross-service failure cascading matrices' },
    { id: 'migration-readiness', name: 'Migration Readiness & PQC Plan', desc: 'Phase 1 to Phase 7 timelines and target PQC candidate allocations' }
  ];

  const handleExport = (format: 'PDF' | 'CSV') => {
    setDownloadSuccess(`Generated and exported ${selectedReportType.toUpperCase()}_REPORT.${format.toLowerCase()}`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Reports & CBOM Generation
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-300">
                CycloneDX 1.6 Aligned
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Generate regulatory-compliant documentation, Cryptographic Bill of Materials (CBOM), and executive briefings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('PDF')}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export PDF</span>
            </button>

            <button
              onClick={() => handleExport('CSV')}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* Success Notice */}
        {downloadSuccess && (
          <div className="p-2.5 rounded-sm bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Report Selector Strip */}
        <div className="grid grid-cols-1 md:grid-cols-5 border border-defense-700 bg-defense-900 rounded-sm divide-y md:divide-y-0 md:divide-x divide-defense-700">
          {reportTypes.map((rep) => {
            const isSelected = selectedReportType === rep.id;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReportType(rep.id)}
                className={`p-3 cursor-pointer select-none transition-colors text-xs space-y-1 ${
                  isSelected 
                    ? 'bg-defense-800/90 border-b-2 md:border-b-0 md:border-t-2 border-cyan-500' 
                    : 'hover:bg-defense-850/60'
                }`}
              >
                <div className="font-bold text-slate-200 text-[11px] truncate">{rep.name}</div>
                <div className="text-[10px] text-slate-400 font-sans leading-tight line-clamp-2">{rep.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Preview Panel */}
        <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-defense-700 pb-2">
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Document Preview: {reportTypes.find(r => r.id === selectedReportType)?.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-sans">
                Target Entity: {DEMO_ORGANIZATION} // Classification: RESTRICTED - INTERNAL ONLY
              </p>
            </div>
            <span className="text-[10px] text-slate-400">Timestamp: 2026-09-05 14:00 UTC</span>
          </div>

          <div className="bg-defense-950 border border-defense-700/60 rounded-sm p-3.5 text-xs text-slate-300 font-mono space-y-2 leading-relaxed">
            <p className="text-slate-400 text-[11px]">
              # EXECUTIVE CRYPTOGRAPHIC AUDIT REPORT
            </p>
            <p>
              Organization: <strong className="text-slate-100">{DEMO_ORGANIZATION}</strong><br />
              Total Discovered Cryptographic Artefacts: <strong className="text-slate-100">4,382</strong><br />
              Quantum-Vulnerable Algorithms (Shor / HNDL): <strong className="text-red-400">317 Critical</strong>, <strong className="text-amber-400">842 High</strong><br />
              Compliant / Low Exposure: <strong className="text-emerald-400">1,803 Low</strong><br />
              Requiring Manual Classification: <strong className="text-amber-400">46 In-House Symbols (Subset)</strong>
            </p>
            <div className="pt-2 border-t border-defense-700/60 text-[10px] text-slate-400">
              [+] Target Priority Recommendation: RSA-2048 in Authentication Service (Citizen Services Portal) ranked P1 with Composite Risk 92/100.<br />
              [+] Proposed Evaluation Path: ML-DSA (FIPS 204) for digital signatures; ML-KEM (FIPS 203) for key exchange encapsulation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
