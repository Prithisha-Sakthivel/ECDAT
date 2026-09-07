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
  Fingerprint
} from 'lucide-react';
import { NormalizedArtefact } from '../../types';

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

  // Inspector state
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('py-01');
  const [inputCode, setInputCode] = useState<string>(SAMPLE_SCAN_SNIPPETS[0].code);
  const [detectedArtefacts, setDetectedArtefacts] = useState<NormalizedArtefact[]>([]);
  const [isScanningCode, setIsScanningCode] = useState<boolean>(false);

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
            <button
              disabled={discoveryState.isScanning}
              onClick={startDiscoveryScan}
              className="px-4 py-1.5 rounded-sm bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
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
        {/* TAB 1: Enterprise Sources */}
        {activeTab === 'sources' && (
          <>
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
    </div>
  );
};
