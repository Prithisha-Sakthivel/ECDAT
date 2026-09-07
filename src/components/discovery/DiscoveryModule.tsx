import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DISCOVERY_SOURCES, SAMPLE_SCAN_SNIPPETS } from '../../data/mockData';
import { 
  Radar, 
  Play, 
  RotateCw, 
  CheckCircle2, 
  Terminal, 
  FileCode, 
  Server, 
  Box, 
  Cloud, 
  FileText, 
  Key, 
  Network, 
  Binary,
  ArrowRight,
  Sparkles,
  Search,
  Code2,
  Cpu,
  Download,
  ShieldAlert,
  Layers,
  Fingerprint,
  Plus,
  FolderArchive,
  GitBranch,
  Trash2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { NormalizedArtefact } from '../../types';
import { AddSourceModal } from './AddSourceModal';
import { 
  discoveryService, 
  UploadedSource, 
  DiscoveryScanResult, 
  ScanStage 
} from '../../services/discoveryService';

export const DiscoveryModule: React.FC = () => {
  const { 
    discoveryState, 
    startDiscoveryScan, 
    openAssetIntelligence,
    setCurrentTab,
    openCopilotWithContext,
    moscaZ
  } = useApp();

  const [activeTab, setActiveTab] = useState<'sources' | 'inspector'>('sources');

  const [selectedSources, setSelectedSources] = useState<string[]>(
    DISCOVERY_SOURCES.map(s => s.id)
  );

  // Inspector state (Manual code snippet testing)
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('py-01');
  const [inputCode, setInputCode] = useState<string>(SAMPLE_SCAN_SNIPPETS[0].code);
  const [detectedArtefacts, setDetectedArtefacts] = useState<NormalizedArtefact[]>([]);
  const [isScanningCode, setIsScanningCode] = useState<boolean>(false);

  // --- Real Upload & Ad-hoc Scan Workflow State ---
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState<boolean>(false);
  const [uploadedSource, setUploadedSource] = useState<UploadedSource | null>(null);
  const [isScanningSource, setIsScanningSource] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<ScanStage | null>(null);
  const [scanResult, setScanResult] = useState<DiscoveryScanResult | null>(null);
  const [artefactFilter, setArtefactFilter] = useState<string>('');

  const toggleSource = (id: string) => {
    setSelectedSources(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSnippetChange = (snippetId: string) => {
    setSelectedSnippetId(snippetId);
    const snip = SAMPLE_SCAN_SNIPPETS.find(s => s.id === snippetId);
    if (snip) {
      setInputCode(snip.code);
      setDetectedArtefacts([]);
    }
  };

  // Format bytes helper
  const formatBytes = (bytes: number): string => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // --- Start Ad-hoc Source Scan ---
  const handleStartSourceScan = async () => {
    if (!uploadedSource) return;

    setIsScanningSource(true);
    setScanResult(null);

    try {
      const result = await discoveryService.scanSource(
        uploadedSource,
        moscaZ,
        (stage) => {
          setScanProgress(stage);
        }
      );
      setScanResult(result);
    } catch (err: any) {
      console.error('Scan failed:', err);
    } finally {
      setIsScanningSource(false);
      setScanProgress(null);
    }
  };

  // --- Remove Uploaded Source ---
  const handleRemoveUploadedSource = () => {
    setUploadedSource(null);
    setScanResult(null);
    setScanProgress(null);
  };

  // --- Export CycloneDX 1.6 CBOM ---
  const handleExportCbom = () => {
    if (!scanResult) return;
    const jsonStr = JSON.stringify(scanResult.cbomJson, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = scanResult.sourceName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    a.download = `ecdat-cbom-cyclonedx-1.6-${safeName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Live Inspector AST Scan ---
  const runLiveCodeScan = () => {
    setIsScanningCode(true);

    setTimeout(() => {
      const results: NormalizedArtefact[] = [];
      const code = inputCode;
      let counter = 1;

      // 1. RSA
      if (/RSA|rsa\.GenerateKey|EVP_PKEY_RSA/i.test(code)) {
        results.push({
          id: `NORM-SCAN-${counter++}`,
          type: 'algorithm',
          location: 'Line 5 (Token Keygen)',
          algorithm: 'RSA-2048',
          keySize: '2048-bit',
          mode: 'PKCS#1 v1.5 / OAEP',
          libraryVersion: 'OpenSSL / Native Standard',
          language: selectedSnippetId.startsWith('py') ? 'Python' : selectedSnippetId.startsWith('java') ? 'Java' : selectedSnippetId.startsWith('c-') ? 'C/C++' : 'Go',
          detectionSource: 'Source Code AST',
          shelfLifeYears: 15,
          criticality: 'Critical',
          quantumStatus: 'Quantum-Vulnerable',
          notes: "Polynomial-time integer factorization via Shor's Algorithm. Violates Mosca equation (15 + 5 > " + moscaZ + ")."
        });
      }

      // 2. AES
      if (/AES|EVP_aes_|aes\.NewCipher|crypto\.createCipheriv\(['"]aes/i.test(code)) {
        results.push({
          id: `NORM-SCAN-${counter++}`,
          type: 'algorithm',
          location: 'Line 9 (Session Cipher)',
          algorithm: 'AES-128-CBC',
          keySize: '128-bit',
          mode: 'CBC Mode',
          libraryVersion: 'Native Crypto Core',
          language: 'Source Code',
          detectionSource: 'Source Code AST',
          shelfLifeYears: 10,
          criticality: 'High',
          quantumStatus: 'Quantum-Vulnerable',
          notes: "Grover's algorithm reduces effective security margin to 64 bits. Upgrade to AES-256-GCM required."
        });
      }

      // 3. Diffie-Hellman / ECC
      if (/DiffieHellman|DH_|dh\.generate|ecdsa|EC_KEY/i.test(code)) {
        results.push({
          id: `NORM-SCAN-${counter++}`,
          type: 'algorithm',
          location: 'Line 14 (Key Exchange)',
          algorithm: 'Diffie-Hellman / ECDH',
          keySize: '2048-bit / 256-bit',
          mode: 'Ephemeral Key Exchange',
          libraryVersion: 'Standard JCA / OpenSSL',
          language: 'Source Code',
          detectionSource: 'Source Code AST',
          shelfLifeYears: 8,
          criticality: 'High',
          quantumStatus: 'Quantum-Vulnerable',
          notes: 'Discrete log breakable on CRQC. Replace with ML-KEM-768 (FIPS 203).'
        });
      }

      // 4. Binary S-box
      if (/aes_sbox|0x63,\s*0x7c/i.test(code)) {
        results.push({
          id: `NORM-SCAN-${counter++}`,
          type: 'algorithm',
          location: 'Offset 0x00042a10 (Binary Data)',
          algorithm: 'AES (Embedded S-Box Table)',
          keySize: '128/256-bit',
          mode: 'Static Lookup S-Box',
          libraryVersion: 'Statically Linked / Proprietary',
          language: 'Compiled Binary',
          detectionSource: 'Binary Symbol / S-Box',
          shelfLifeYears: 12,
          criticality: 'Critical',
          quantumStatus: 'Quantum-Vulnerable',
          notes: 'Embedded 256-byte S-Box byte table detected in non-stripped binary segment.'
        });
      }

      // 5. Cloud KMS / HSM
      if (/boto3\.client\(['"]kms|keyvault|google\.cloud\.kms|PyKCS11|Cryptoki/i.test(code)) {
        results.push({
          id: `NORM-SCAN-${counter++}`,
          type: 'cloud service',
          location: 'External Managed API',
          algorithm: 'AWS KMS / PKCS#11 HSM SDK',
          keySize: 'Managed Key Reference',
          mode: 'Cloud Envelope Encryption',
          libraryVersion: 'AWS SDK v2 / PKCS#11 Cryptoki',
          language: 'SDK Client',
          detectionSource: 'Cloud KMS / HSM',
          shelfLifeYears: 20,
          criticality: 'Critical',
          quantumStatus: 'Quantum-Vulnerable',
          notes: 'Flagged for cloud API configuration audit and HSM firmware PQC support.'
        });
      }

      // 6. TLS Protocol Context
      if (/SSLContext|tls\.Config|TLS1_VERSION|PROTOCOL_TLS/i.test(code)) {
        results.push({
          id: `NORM-SCAN-${counter++}`,
          type: 'protocol',
          location: 'Network Transport Ingress',
          algorithm: 'TLS 1.0 / TLS 1.1 / TLS 1.2',
          keySize: 'Cipher Suite Dependent',
          mode: 'Transport Security Protocol',
          libraryVersion: 'OpenSSL / Go TLS',
          language: 'Config / Context',
          detectionSource: 'X.509 Keystore',
          shelfLifeYears: 5,
          criticality: 'High',
          quantumStatus: 'Quantum-Vulnerable',
          notes: 'Deprecated TLS 1.0/1.1 protocol minimum detected. Upgrade to TLS 1.3 with hybrid key exchange.'
        });
      }

      setDetectedArtefacts(results);
      setIsScanningCode(false);
    }, 400);
  };

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Binary': return <Binary className="w-3.5 h-3.5 text-slate-300" />;
      case 'Server': return <Server className="w-3.5 h-3.5 text-slate-300" />;
      case 'Box': return <Box className="w-3.5 h-3.5 text-slate-300" />;
      case 'Cloud': return <Cloud className="w-3.5 h-3.5 text-cyan-400" />;
      case 'FileText': return <FileText className="w-3.5 h-3.5 text-slate-300" />;
      case 'Key': return <Key className="w-3.5 h-3.5 text-amber-400" />;
      case 'Network': return <Network className="w-3.5 h-3.5 text-slate-300" />;
      default: return <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  // Filtered artefacts for the user source
  const filteredUserArtefacts = scanResult?.artefacts.filter(art => {
    if (!artefactFilter.trim()) return true;
    const term = artefactFilter.toLowerCase();
    return (
      art.algorithm.toLowerCase().includes(term) ||
      art.location.toLowerCase().includes(term) ||
      art.type.toLowerCase().includes(term) ||
      art.criticality.toLowerCase().includes(term) ||
      art.quantumStatus.toLowerCase().includes(term)
    );
  }) || [];

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Discovery Engine & Multi-Surface Scanner
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                MODULE A (PS-26164)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Automated multi-source inspection engine scanning source code (Python, Java, C, Go, JS), compiled binaries, container images, TLS ingress, and HSMs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* + ADD SOURCE BUTTON */}
            <button
              onClick={() => setIsAddSourceModalOpen(true)}
              className="px-3.5 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
              title="Upload project files, ZIP archives, or connect GitHub repos"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>+ Add Source</span>
            </button>

            {/* Sweep Button */}
            <button
              disabled={discoveryState.isScanning}
              onClick={startDiscoveryScan}
              className="px-4 py-1.5 rounded-sm bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
            >
              {discoveryState.isScanning ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning Enterprise...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Sweep (4,382 Assets)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Module Tabs */}
      <div className="border-b border-defense-700 bg-defense-900/60 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'sources'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>ENTERPRISE SOURCES & SWEEPS</span>
            {uploadedSource && (
              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1 py-0.2 rounded">
                USER SOURCE ACTIVE
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('inspector');
              if (detectedArtefacts.length === 0) runLiveCodeScan();
            }}
            className={`py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'inspector'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>LIVE CODE & BINARY INSPECTOR</span>
            <span className="text-[9px] bg-cyan-900/60 text-cyan-300 border border-cyan-600/40 px-1 py-0.2 rounded">
              INTERACTIVE
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
        {/* TAB 1: Enterprise Sources & Sweeps + User Upload Workflow */}
        {activeTab === 'sources' && (
          <>
            {/* USER SOURCE SUMMARY CARD (WHEN A SOURCE HAS BEEN ADDED) */}
            {uploadedSource && (
              <div className="border border-cyan-500/60 bg-gradient-to-r from-defense-900 via-defense-900 to-defense-850 rounded-sm p-4 space-y-4 shadow-xl relative overflow-hidden">
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-defense-700/80 pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      {uploadedSource.type === 'zip' ? (
                        <FolderArchive className="w-5 h-5 text-cyan-400" />
                      ) : uploadedSource.type === 'github' ? (
                        <GitBranch className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <FileCode className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          USER SOURCE
                        </span>
                        <h2 className="text-sm font-bold text-slate-100 font-mono">
                          {uploadedSource.name}
                        </h2>
                        <span className="text-[10px] text-slate-400">
                          ({uploadedSource.type.toUpperCase()})
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 font-sans">
                        <span>Size: <strong className="text-slate-200 font-mono">{formatBytes(uploadedSource.sizeBytes)}</strong></span>
                        <span>Files: <strong className="text-slate-200 font-mono">{uploadedSource.filesCount}</strong></span>
                        <span>Uploaded: <strong className="text-slate-300 font-mono">{new Date(uploadedSource.uploadedAt).toLocaleTimeString()}</strong></span>
                        {uploadedSource.branch && <span>Branch: <strong className="text-cyan-300 font-mono">{uploadedSource.branch}</strong></span>}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleRemoveUploadedSource}
                      disabled={isScanningSource}
                      className="px-2.5 py-1.5 rounded-sm bg-defense-950 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-defense-700 hover:border-red-700/60 text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                      title="Remove source"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                    <button
                      onClick={handleStartSourceScan}
                      disabled={isScanningSource}
                      className="px-4 py-1.5 rounded-sm bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      {isScanningSource ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{scanResult ? 'Re-Run Scan' : 'Start Scan'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 7-STAGE SCANNING PROGRESS BAR & ACTIVE STATUS */}
                {isScanningSource && scanProgress && (
                  <div className="bg-defense-950/80 border border-cyan-700/60 rounded p-3.5 space-y-3 animate-pulse">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <RotateCw className="w-4 h-4 text-cyan-400 animate-spin" />
                        <span className="font-bold text-cyan-300 uppercase">
                          Stage {scanProgress.stage} of {scanProgress.totalStages}: {scanProgress.name}
                        </span>
                      </div>
                      <span className="font-bold text-cyan-400 font-mono">{scanProgress.progressPercent}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-defense-800 rounded-full h-2 overflow-hidden border border-defense-700">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${scanProgress.progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                      <span>{scanProgress.description}</span>
                      <span className="font-mono text-slate-500">In-Memory Sandbox</span>
                    </div>
                  </div>
                )}

                {/* SCAN COMPLETED RESULTS SECTION */}
                {scanResult && !isScanningSource && (
                  <div className="space-y-4 pt-1">
                    {/* Metrics Summary Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      <div className="p-2.5 rounded bg-defense-950/80 border border-defense-700">
                        <div className="text-[10px] text-slate-400 uppercase">Artefacts Found</div>
                        <div className="text-lg font-bold text-slate-100 font-mono">{scanResult.metrics.total}</div>
                      </div>
                      <div className="p-2.5 rounded bg-defense-950/80 border border-red-800/40">
                        <div className="text-[10px] text-red-400 uppercase font-bold">Critical Risk</div>
                        <div className="text-lg font-bold text-red-300 font-mono">{scanResult.metrics.critical}</div>
                      </div>
                      <div className="p-2.5 rounded bg-defense-950/80 border border-amber-800/40">
                        <div className="text-[10px] text-amber-400 uppercase font-bold">High Risk</div>
                        <div className="text-lg font-bold text-amber-300 font-mono">{scanResult.metrics.high}</div>
                      </div>
                      <div className="p-2.5 rounded bg-defense-950/80 border border-yellow-800/40">
                        <div className="text-[10px] text-yellow-400 uppercase">Medium Risk</div>
                        <div className="text-lg font-bold text-yellow-300 font-mono">{scanResult.metrics.medium}</div>
                      </div>
                      <div className="p-2.5 rounded bg-defense-950/80 border border-defense-700">
                        <div className="text-[10px] text-slate-400 uppercase">Low Risk</div>
                        <div className="text-lg font-bold text-slate-400 font-mono">{scanResult.metrics.low}</div>
                      </div>
                      <div className="p-2.5 rounded bg-defense-950/80 border border-red-500/30">
                        <div className="text-[10px] text-red-400 uppercase">Quantum-Vuln</div>
                        <div className="text-lg font-bold text-red-400 font-mono">{scanResult.metrics.quantumVulnerable}</div>
                      </div>
                      <div className="p-2.5 rounded bg-defense-950/80 border border-purple-800/40">
                        <div className="text-[10px] text-purple-300 uppercase font-bold">Mosca Violated</div>
                        <div className="text-lg font-bold text-purple-300 font-mono">{scanResult.metrics.moscaViolated}</div>
                      </div>
                    </div>

                    {/* Result Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-defense-950/60 p-2.5 rounded border border-defense-700/80">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-300 font-bold">Scan Complete:</span>
                        <span className="text-[11px] text-slate-400">
                          {scanResult.filesScanned} files • {scanResult.linesOfCodeScanned} LoC parsed in {scanResult.durationMs}ms
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Search Filter */}
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
                          <input
                            type="text"
                            placeholder="Filter artefacts..."
                            value={artefactFilter}
                            onChange={(e) => setArtefactFilter(e.target.value)}
                            className="bg-defense-900 border border-defense-700 rounded pl-7 pr-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 w-44"
                          />
                        </div>

                        {/* View Risk Analysis */}
                        <button
                          onClick={() => setCurrentTab('risk')}
                          className="px-3 py-1 rounded bg-defense-800 hover:bg-defense-700 text-cyan-300 border border-cyan-600/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Risk Analysis</span>
                        </button>

                        {/* Export CBOM */}
                        <button
                          onClick={handleExportCbom}
                          className="px-3 py-1 rounded bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export CBOM (CycloneDX 1.6)</span>
                        </button>
                      </div>
                    </div>

                    {/* Artefacts Table */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Normalized Detected Cryptographic Artefacts ({filteredUserArtefacts.length})</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Schema: CycloneDX 1.6 Cryptographic Component
                        </span>
                      </div>

                      {filteredUserArtefacts.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs bg-defense-950/60 rounded border border-defense-700/60 space-y-1">
                          <p className="font-bold text-slate-300">No cryptographic artefacts detected in the selected source.</p>
                          <p className="text-[11px] font-sans">The files analyzed contain no recognized classical or quantum cryptographic API calls.</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto border border-defense-700 rounded bg-defense-950/90 max-h-96 overflow-y-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-defense-850/90 border-b border-defense-700 text-[10px] text-slate-400 uppercase sticky top-0 z-10">
                              <tr>
                                <th className="py-2.5 px-3">Artefact ID</th>
                                <th className="py-2.5 px-3">Type</th>
                                <th className="py-2.5 px-3">Algorithm & Key</th>
                                <th className="py-2.5 px-3">Location</th>
                                <th className="py-2.5 px-3">Detection Method</th>
                                <th className="py-2.5 px-3">Quantum Status</th>
                                <th className="py-2.5 px-3">Mosca Risk</th>
                                <th className="py-2.5 px-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-defense-700/50">
                              {filteredUserArtefacts.map((art) => (
                                <tr key={art.id} className="hover:bg-defense-850/40 transition-colors">
                                  <td className="py-2.5 px-3 font-mono text-cyan-400 font-bold text-[11px]">
                                    {art.id}
                                  </td>
                                  <td className="py-2.5 px-3 uppercase text-[10px] text-slate-400 font-bold">
                                    {art.type}
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <div className="text-slate-200 font-bold">{art.algorithm}</div>
                                    <div className="text-[10px] text-slate-400">{art.keySize} • {art.mode}</div>
                                  </td>
                                  <td className="py-2.5 px-3 text-slate-300 text-[11px] font-mono truncate max-w-xs" title={art.location}>
                                    {art.location}
                                  </td>
                                  <td className="py-2.5 px-3 text-[10px] text-slate-400">
                                    {art.detectionSource}
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                      art.quantumStatus === 'Quantum-Vulnerable'
                                        ? 'border-red-500/40 bg-red-500/10 text-red-300'
                                        : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                    }`}>
                                      {art.quantumStatus}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <span className={`text-[11px] font-bold ${
                                      art.shelfLifeYears + 5 > moscaZ
                                        ? 'text-red-400'
                                        : 'text-emerald-400'
                                    }`}>
                                      {art.shelfLifeYears + 5 > moscaZ
                                        ? `VIOLATED (${art.shelfLifeYears}+5 > ${moscaZ})`
                                        : `COMPLIANT`}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 text-right">
                                    <button
                                      onClick={() => openAssetIntelligence('RSA-2048')}
                                      className="text-cyan-400 hover:text-cyan-300 text-[11px] font-bold underline"
                                    >
                                      Detail
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EMPTY STATE HELPER IF NO SOURCE LOADED YET */}
            {!uploadedSource && (
              <div className="border border-defense-700/80 bg-defense-900/50 rounded-sm p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">Upload Project or Connect Repository</span>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                      Ingest local source files, ZIP projects, or GitHub repos to run multi-language cryptographic AST inspection and export CycloneDX 1.6 CBOM.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddSourceModalOpen(true)}
                  className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Source</span>
                </button>
              </div>
            )}

            {/* Baseline Enterprise Notice */}
            <div className="flex items-center justify-between px-1 text-[11px] text-slate-400 border-b border-defense-700/40 pb-1">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Enterprise Cryptographic Baseline
              </span>
              <span className="text-[10px] text-amber-400/80 font-mono">
                SIMULATION ENVIRONMENT — ALL DATA IS SYNTHETIC
              </span>
            </div>

            {/* Multi-Source Configurator Grid */}
            <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Enterprise Discovery Surfaces ({selectedSources.length} Selected)
                </h3>
                <span className="text-[10px] text-slate-400">Toggle surfaces to include in scan sweep</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {DISCOVERY_SOURCES.map((source) => {
                  const isSelected = selectedSources.includes(source.id);
                  return (
                    <div
                      key={source.id}
                      onClick={() => toggleSource(source.id)}
                      className={`p-2.5 rounded-sm border transition-colors cursor-pointer select-none text-xs space-y-1.5 ${
                        isSelected 
                          ? 'bg-defense-800/90 border-cyan-700/60' 
                          : 'bg-defense-950/40 border-defense-700/60 opacity-50 hover:opacity-90'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          {getSourceIcon(source.icon)}
                          <span className="font-bold text-slate-200 truncate">{source.name}</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={isSelected} 
                          readOnly 
                          className="accent-cyan-500 cursor-pointer"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-tight line-clamp-2">{source.description}</p>
                      <div className="text-[10px] text-slate-300 flex items-center justify-between pt-0.5">
                        <span>{source.count}</span>
                        <span className="text-emerald-400 text-[9px]">● AUDITED</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scan Log Terminal Output */}
            <div className="border border-defense-700 bg-defense-900 rounded-sm p-3.5 space-y-2">
              <div className="flex items-center justify-between border-b border-defense-700 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Discovery Engine Output Feed</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Status: {discoveryState.isScanning ? 'RUNNING' : 'IDLE'}
                </span>
              </div>

              <div className="bg-defense-950 border border-defense-700/60 rounded-sm p-3 font-mono text-[11px] text-slate-300 space-y-1 max-h-60 overflow-y-auto">
                {discoveryState.logs.map((log: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500 text-[10px] select-none">[{idx + 1}]</span>
                    <span className={log.includes('Found') || log.includes('identified') ? 'text-cyan-300' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: Interactive Code & Binary Inspector */}
        {activeTab === 'inspector' && (
          <div className="space-y-4">
            <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-defense-700 pb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    Target Code & Binary Stream
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Select a multi-language sample snippet or paste custom source code / binary disassembly to execute the live AST parser.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedSnippetId}
                    onChange={(e) => handleSnippetChange(e.target.value)}
                    className="bg-defense-800 border border-defense-700 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    {SAMPLE_SCAN_SNIPPETS.map(snip => (
                      <option key={snip.id} value={snip.id}>
                        {snip.name} ({snip.filename})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={runLiveCodeScan}
                    disabled={isScanningCode}
                    className="px-3 py-1.5 rounded-sm bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {isScanningCode ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>RUN AST SCAN</span>
                  </button>
                </div>
              </div>

              {/* Code Textarea */}
              <div className="relative">
                <textarea
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  rows={9}
                  className="w-full bg-defense-950 border border-defense-700/80 rounded p-3 text-xs text-cyan-200 font-mono focus:outline-none focus:border-cyan-500 resize-y leading-relaxed"
                  placeholder="Paste Python, Java, C/C++, Go, or JavaScript cryptographic code..."
                />
              </div>

              {/* Scan Results */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-defense-700/80 pb-2">
                  <div className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Normalized Detected Cryptographic Artefacts ({detectedArtefacts.length})
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Output Schema: Normalized Type / Algorithm / Key Size / Mode / Mosca Risk
                  </span>
                </div>

                {detectedArtefacts.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs italic bg-defense-950/40 rounded border border-defense-700/40">
                    Click &quot;RUN AST SCAN&quot; above to inspect the code and extract cryptographic primitives.
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-defense-700 rounded bg-defense-950/70">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-defense-850/80 border-b border-defense-700 text-[10px] text-slate-400 uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Artefact ID</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Algorithm & Key</th>
                          <th className="py-2.5 px-3">Location</th>
                          <th className="py-2.5 px-3">Detection Method</th>
                          <th className="py-2.5 px-3">Quantum Status</th>
                          <th className="py-2.5 px-3">Mosca (X+Y &gt; {moscaZ})</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-defense-700/50">
                        {detectedArtefacts.map((art) => (
                          <tr key={art.id} className="hover:bg-defense-850/40 transition-colors">
                            <td className="py-2 px-3 font-mono text-cyan-400 font-bold text-[11px]">
                              {art.id}
                            </td>
                            <td className="py-2 px-3 uppercase text-[10px] text-slate-400 font-bold">
                              {art.type}
                            </td>
                            <td className="py-2 px-3">
                              <div className="text-slate-200 font-bold">{art.algorithm}</div>
                              <div className="text-[10px] text-slate-400">{art.keySize} • {art.mode}</div>
                            </td>
                            <td className="py-2 px-3 text-slate-300 text-[11px] font-mono">
                              {art.location}
                            </td>
                            <td className="py-2 px-3 text-[10px] text-slate-400">
                              {art.detectionSource}
                            </td>
                            <td className="py-2 px-3">
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${
                                art.quantumStatus === 'Quantum-Vulnerable'
                                  ? 'border-red-500/40 bg-red-500/10 text-red-300'
                                  : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                              }`}>
                                {art.quantumStatus}
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="text-red-400 font-bold text-[11px]">
                                VIOLATED (Risk &gt; 0)
                              </span>
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={() => openAssetIntelligence('RSA-2048')}
                                className="text-cyan-400 hover:text-cyan-300 text-[11px] font-bold underline"
                              >
                                Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Source Modal */}
      <AddSourceModal
        isOpen={isAddSourceModalOpen}
        onClose={() => setIsAddSourceModalOpen(false)}
        onSourceAdded={(source) => {
          setUploadedSource(source);
          setScanResult(null);
          // Automatically trigger scan after upload for a seamless user experience
          setTimeout(() => {
            handleStartSourceScan();
          }, 300);
        }}
      />
    </div>
  );
};
