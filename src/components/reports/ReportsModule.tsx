import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Check, 
  Sparkles,
  Code2,
  Printer,
  ShieldCheck,
  Building2,
  Layers,
  Copy
} from 'lucide-react';
import { DEMO_ORGANIZATION } from '../../data/mockData';

export const ReportsModule: React.FC = () => {
  const { 
    openCopilotWithContext, 
    exportCycloneDxCbomJson, 
    exportAuditReportJson,
    moscaZ,
    artefacts
  } = useApp();

  const [selectedReportType, setSelectedReportType] = useState<string>('cbom');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedCbom, setCopiedCbom] = useState<boolean>(false);

  const reportTypes = [
    { id: 'cbom', name: 'CycloneDX 1.6 CBOM (Standardized)', desc: 'Full JSON schema covering all 4,382 cryptographic assets, algorithmProperties, and quantum risk' },
    { id: 'executive', name: 'Executive Posture Briefing', desc: 'High-level CISO & National Cyber Agency readiness posture and timelines' },
    { id: 'quantum-risk', name: 'Quantum Risk Assessment (Mosca)', desc: 'Mathematical Mosca Theorem (X+Y > Z) calculation and Shor/Grover flags' },
    { id: 'dependency-impact', name: 'Dependency Blast Radius Audit', desc: 'Downstream cascading impact matrices across 7 applications & 12 services' },
    { id: 'migration-readiness', name: 'PQC Migration Roadmap & Tradeoffs', desc: 'Phase 1 to Phase 7 timelines and NIST FIPS 203/204/205 allocations' }
  ];

  const handleDownloadCbom = () => {
    exportCycloneDxCbomJson();
    setDownloadSuccess('Successfully generated and exported CycloneDX 1.6 CBOM JSON (ecdat-cbom-cyclonedx-1.6.json)');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDownloadReport = () => {
    exportAuditReportJson();
    setDownloadSuccess('Successfully generated and exported Executive Audit Report JSON (ecdat-quantum-audit-report.json)');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const sampleCbomSnippet = JSON.stringify({
    "$schema": "http://cyclonedx.org/schema/bom-1.6.schema.json",
    "bomFormat": "CycloneDX",
    "specVersion": "1.6",
    "serialNumber": "urn:uuid:7f83b165-7ff1-4c53-b92d-c18148a1d65d",
    "version": 1,
    "metadata": {
      "timestamp": new Date().toISOString(),
      "tools": [
        {
          "vendor": "ECDAT Cyber Operations",
          "name": "Enterprise Cryptographic Discovery & Analysis Tool",
          "version": "2.4.0"
        }
      ],
      "component": {
        "type": "application",
        "name": "Demo Government Enterprise Cryptographic Estate",
        "version": "2026.3-SYNTHETIC"
      }
    },
    "components": [
      {
        "type": "cryptographic-asset",
        "bom-ref": "ECDAT-CRYPTO-004382",
        "name": "RSA-2048 (Authentication Service)",
        "version": "OpenSSL 1.1.1u",
        "cryptoProperties": {
          "assetType": "algorithm",
          "algorithmProperties": {
            "primitive": "signature",
            "parameterSetIdentifier": "2048-bit",
            "classicalSecurityLevel": 112,
            "nistQuantumSecurityLevel": 0
          },
          "quantumRisk": {
            "moscaConditionViolated": true,
            "shelfLifeX": 15,
            "migrationTimeY": 6,
            "crqcArrivalZ": moscaZ,
            "recommendedPqc": "ML-DSA-65 (NIST FIPS 204)",
            "hybridTransition": "Dual-Signature RSA + ML-DSA"
          }
        }
      },
      {
        "type": "cryptographic-asset",
        "bom-ref": "ECDAT-CRYPTO-002910",
        "name": "ECDSA P-256 (Citizen Services Portal)",
        "version": "Node.js crypto v20",
        "cryptoProperties": {
          "assetType": "algorithm",
          "algorithmProperties": {
            "primitive": "signature",
            "parameterSetIdentifier": "256-bit",
            "classicalSecurityLevel": 128,
            "nistQuantumSecurityLevel": 0
          },
          "quantumRisk": {
            "moscaConditionViolated": true,
            "shelfLifeX": 12,
            "migrationTimeY": 4,
            "crqcArrivalZ": moscaZ,
            "recommendedPqc": "ML-DSA-44 or Falcon-512",
            "hybridTransition": "Hybrid Ed25519 + ML-DSA-44"
          }
        }
      }
    ]
  }, null, 2);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(sampleCbomSnippet);
    setCopiedCbom(true);
    setTimeout(() => setCopiedCbom(false), 2000);
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
                Reports &amp; CBOM Generation
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-bold">
                MODULE E (PS-26164)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Generate regulatory-compliant documentation, Cryptographic Bill of Materials (CBOM) in standardized CycloneDX 1.6 JSON format, and printable executive briefings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadCbom}
              className="px-3.5 py-1.5 rounded-sm bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Download standard CycloneDX 1.6 Cryptographic Bill of Materials JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT CYCLONEDX 1.6 CBOM</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="px-3.5 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download Executive & Technical Audit JSON report"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>EXPORT AUDIT JSON</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>PRINT / PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* Success Notice */}
        {downloadSuccess && (
          <div className="p-3 rounded-sm bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase">FILE SAVED</span>
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

        {/* Preview Panel: CycloneDX 1.6 Schema Inspector vs Executive Document */}
        {selectedReportType === 'cbom' ? (
          <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-defense-700 pb-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  CycloneDX 1.6 Cryptographic Bill of Materials (CBOM) Schema Preview
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySnippet}
                  className="px-2 py-1 rounded bg-defense-800 border border-defense-700 hover:bg-defense-750 text-slate-300 text-[10px] flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedCbom ? 'COPIED' : 'COPY JSON'}</span>
                </button>

                <button
                  onClick={handleDownloadCbom}
                  className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>DOWNLOAD FULL CBOM (4,382 ASSETS)</span>
                </button>
              </div>
            </div>

            <div className="bg-defense-950 border border-defense-700/60 rounded p-3 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-96 leading-relaxed">
              <pre>{sampleCbomSnippet}</pre>
            </div>

            <div className="p-2.5 rounded bg-defense-850/60 border border-defense-700 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Standard: CycloneDX v1.6 (RFC 2119 / OASIS Aligned)</span>
              <span className="text-emerald-400 font-bold">✓ VALIDATED AGAINST CYCLONEDX 1.6 SCHEMA</span>
            </div>
          </div>
        ) : (
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
              <span className="text-[10px] text-slate-400">Timestamp: {new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC</span>
            </div>

            <div className="bg-defense-950 border border-defense-700/60 rounded-sm p-4 text-xs text-slate-300 font-mono space-y-3 leading-relaxed">
              <div className="border-b border-defense-700/60 pb-2 flex items-center justify-between">
                <span className="text-slate-100 font-bold text-sm">
                  # {selectedReportType.toUpperCase()} CRYPTOGRAPHIC AUDIT REPORT
                </span>
                <span className="text-cyan-400 text-[10px] font-bold">ECDAT-AUDIT-2026-09</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[9px] text-slate-400 uppercase">Total Assets</div>
                  <div className="text-sm font-bold text-slate-100 mt-0.5">4,382</div>
                </div>
                <div className="p-2 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[9px] text-slate-400 uppercase">Critical Vulnerabilities</div>
                  <div className="text-sm font-bold text-red-400 mt-0.5">317</div>
                </div>
                <div className="p-2 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[9px] text-slate-400 uppercase">Mosca Horizon (Z)</div>
                  <div className="text-sm font-bold text-amber-300 mt-0.5">{moscaZ} Years</div>
                </div>
                <div className="p-2 rounded bg-defense-900 border border-defense-700">
                  <div className="text-[9px] text-slate-400 uppercase">Migration Readiness</div>
                  <div className="text-sm font-bold text-cyan-300 mt-0.5">42%</div>
                </div>
              </div>

              <p className="pt-2 text-xs">
                Organization: <strong className="text-slate-100">{DEMO_ORGANIZATION}</strong><br />
                Quantum-Vulnerable Algorithms (Shor / HNDL): <strong className="text-red-400">317 Critical</strong>, <strong className="text-amber-400">842 High</strong><br />
                Compliant / Low Exposure: <strong className="text-emerald-400">1,803 Low</strong><br />
                Requiring Manual Classification: <strong className="text-amber-400">46 In-House Symbols (Subset)</strong>
              </p>

              <div className="pt-2 border-t border-defense-700/60 text-[11px] text-slate-400 space-y-1">
                <div>[+] <strong>Target Priority Recommendation:</strong> RSA-2048 in Authentication Service (Citizen Services Portal) ranked P1 with Composite Risk 92/100 and Mosca Condition Violated (15 + 6 &gt; {moscaZ}).</div>
                <div>[+] <strong>Mandated PQC Standards:</strong> ML-DSA (NIST FIPS 204) for digital signatures; ML-KEM (NIST FIPS 203) for key encapsulation; SLH-DSA (FIPS 205) for long-term document notary timestamps.</div>
                <div>[+] <strong>Interim Strategy:</strong> Dual-Signature Hybrid Bridge to maintain backward compatibility for external legacy gateways while securing internal federal workloads.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
