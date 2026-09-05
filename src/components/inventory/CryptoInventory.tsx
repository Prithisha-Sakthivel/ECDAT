import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ARTEFACTS_CATALOG } from '../../data/mockData';
import { 
  Database, 
  Search, 
  Sparkles,
  Lock,
  ChevronRight,
  Filter
} from 'lucide-react';
import { CryptoArtefact } from '../../types';

export const CryptoInventory: React.FC = () => {
  const { 
    setSelectedArtefact, 
    setIsDrawerOpen, 
    openCopilotWithContext 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAlgo, setSelectedAlgo] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedQuantumStatus, setSelectedQuantumStatus] = useState<string>('all');

  const filteredArtefacts = useMemo(() => {
    return ARTEFACTS_CATALOG.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.algorithm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.library.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedAlgo !== 'all' && item.algorithm !== selectedAlgo) return false;
      if (selectedRisk !== 'all' && item.risk !== selectedRisk) return false;
      if (selectedQuantumStatus !== 'all' && item.quantumStatus !== selectedQuantumStatus) return false;

      return true;
    });
  }, [searchQuery, selectedAlgo, selectedRisk, selectedQuantumStatus]);

  const handleRowClick = (artefact: CryptoArtefact) => {
    setSelectedArtefact(artefact);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-hidden relative font-mono">
      {/* Top Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Cryptographic Inventory
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-300">
                {filteredArtefacts.length} Matched / 4,382 Total
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Comprehensive searchable registry of discovered cryptographic algorithms, libraries, keys, and implementation locations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openCopilotWithContext("Provide an executive breakdown of all quantum-vulnerable cryptographic algorithms found in the inventory.")}
              className="p-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 border border-defense-700 text-slate-300 hover:text-cyan-300 transition-colors"
              title="AI Inventory Digest"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-w-7xl mx-auto w-full">
        {/* Search & Multi-filter Bar */}
        <div className="p-3 rounded-sm border border-defense-700 bg-defense-900">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by algorithm, application, path, library (e.g. RSA-2048)..."
                className="w-full bg-defense-850 border border-defense-700 rounded-sm pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Algorithm Filter */}
            <div className="flex items-center gap-1.5 bg-defense-850 border border-defense-700 rounded-sm px-2.5 py-1 text-xs text-slate-300">
              <span className="text-slate-500 text-[10px]">ALGO:</span>
              <select
                value={selectedAlgo}
                onChange={(e) => setSelectedAlgo(e.target.value)}
                className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs font-mono"
              >
                <option value="all" className="bg-defense-900">All</option>
                <option value="RSA-2048" className="bg-defense-900">RSA-2048</option>
                <option value="RSA-3072" className="bg-defense-900">RSA-3072</option>
                <option value="ECDSA P-256" className="bg-defense-900">ECDSA P-256</option>
                <option value="AES-256" className="bg-defense-900">AES-256</option>
                <option value="SHA-256" className="bg-defense-900">SHA-256</option>
                <option value="TLS 1.2" className="bg-defense-900">TLS 1.2</option>
              </select>
            </div>

            {/* Risk Filter */}
            <div className="flex items-center gap-1.5 bg-defense-850 border border-defense-700 rounded-sm px-2.5 py-1 text-xs text-slate-300">
              <span className="text-slate-500 text-[10px]">RISK:</span>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs font-mono"
              >
                <option value="all" className="bg-defense-900">All</option>
                <option value="Critical" className="bg-defense-900">Critical</option>
                <option value="High" className="bg-defense-900">High</option>
                <option value="Medium" className="bg-defense-900">Medium</option>
                <option value="Low" className="bg-defense-900">Low</option>
              </select>
            </div>

            {/* Quantum Filter */}
            <div className="flex items-center gap-1.5 bg-defense-850 border border-defense-700 rounded-sm px-2.5 py-1 text-xs text-slate-300">
              <span className="text-slate-500 text-[10px]">QUANTUM:</span>
              <select
                value={selectedQuantumStatus}
                onChange={(e) => setSelectedQuantumStatus(e.target.value)}
                className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs font-mono"
              >
                <option value="all" className="bg-defense-900">All</option>
                <option value="Quantum-Vulnerable" className="bg-defense-900">Quantum-Vulnerable</option>
                <option value="Quantum-Resistant" className="bg-defense-900">Quantum-Resistant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dense SOC Data Table */}
        <div className="rounded-sm border border-defense-700 bg-defense-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-defense-850/80 border-b border-defense-700 uppercase text-slate-400 text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Artefact / Key</th>
                  <th className="py-2.5 px-3 font-semibold">Algorithm & Type</th>
                  <th className="py-2.5 px-3 font-semibold">Purpose</th>
                  <th className="py-2.5 px-3 font-semibold">Application & Path</th>
                  <th className="py-2.5 px-3 font-semibold">Quantum Posture</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Risk Tier</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-defense-700/60 text-[11px]">
                {filteredArtefacts.map((art) => {
                  const isCritical = art.risk === 'Critical';
                  const isRsaFocus = art.algorithm === 'RSA-2048';

                  return (
                    <tr 
                      key={art.id}
                      onClick={() => handleRowClick(art)}
                      className={`hover:bg-defense-800/60 transition-colors cursor-pointer ${
                        isRsaFocus ? 'bg-red-500/5' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-semibold text-slate-200">
                        <div className="flex items-center gap-1.5">
                          {isCritical && <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />}
                          <span className="truncate max-w-[200px]">{art.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <span>{art.algorithm}</span>
                        <span className="text-slate-500 text-[10px] ml-1">({art.cryptoType})</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[10px]">
                        {art.purpose}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        <div className="text-slate-300 font-medium">{art.application}</div>
                        <div className="text-slate-500 text-[9px] truncate max-w-[220px]">{art.location}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-1.5 py-0.2 rounded border text-[10px] ${
                          art.quantumStatus === 'Quantum-Vulnerable'
                            ? 'border-red-500/30 bg-red-500/10 text-red-400'
                            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {art.quantumStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={`font-bold ${
                          art.risk === 'Critical' ? 'text-red-400' :
                          art.risk === 'High' ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {art.risk}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="text-cyan-400 hover:text-cyan-300 underline text-[10px]">
                          Inspect
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 border-t border-defense-700 bg-defense-850/50 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredArtefacts.length} of 4,382 discovered cryptographic assets</span>
            <span className="text-slate-300">Click any row to open SOC Investigation Drawer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
