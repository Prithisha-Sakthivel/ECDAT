import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Lock, Server } from 'lucide-react';
import { ARTEFACTS_CATALOG, ASSET_RISK_PROFILES, UNKNOWN_CRYPTO_CATALOG } from '../../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setSelectedArtefact, 
    setIsDrawerOpen, 
    setCurrentTab
  } = useApp();

  const [term, setTerm] = useState<string>('');

  if (!isSearchOpen) return null;

  const filteredArtefacts = ARTEFACTS_CATALOG.filter(a => 
    a.name.toLowerCase().includes(term.toLowerCase()) ||
    a.algorithm.toLowerCase().includes(term.toLowerCase()) ||
    a.application.toLowerCase().includes(term.toLowerCase())
  );

  const filteredAssets = ASSET_RISK_PROFILES.filter(a =>
    a.assetName.toLowerCase().includes(term.toLowerCase()) ||
    a.primaryAlgorithm.toLowerCase().includes(term.toLowerCase())
  );

  const filteredUnknown = UNKNOWN_CRYPTO_CATALOG.filter(u =>
    u.symbol.toLowerCase().includes(term.toLowerCase()) ||
    u.relatedApplication.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px] flex items-start justify-center pt-20 px-4 font-mono select-none">
      <div className="w-full max-w-2xl bg-defense-900 border border-defense-700 rounded-sm shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="p-3 border-b border-defense-700 bg-defense-850 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            autoFocus
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search primitives, algorithms, services (e.g. RSA-2048)..."
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded hover:bg-defense-800 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-3 text-xs">
          {/* Section 1: Cryptographic Artefacts */}
          {filteredArtefacts.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Cryptographic Artefacts</span>
              <div className="space-y-1">
                {filteredArtefacts.slice(0, 4).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setSelectedArtefact(art);
                      setIsDrawerOpen(true);
                      setIsSearchOpen(false);
                      setCurrentTab('inventory');
                    }}
                    className="p-2 rounded-sm bg-defense-850 hover:bg-defense-800 border border-defense-700 flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-cyan-400" />
                      <span className="font-bold text-slate-200 group-hover:text-cyan-300">{art.name}</span>
                      <span className="text-slate-400 text-[10px]">({art.algorithm})</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{art.application}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Enterprise Assets */}
          {filteredAssets.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Enterprise Workloads</span>
              <div className="space-y-1">
                {filteredAssets.slice(0, 3).map((asset) => (
                  <div
                    key={asset.assetId}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setCurrentTab('risk');
                    }}
                    className="p-2 rounded-sm bg-defense-850 hover:bg-defense-800 border border-defense-700 flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Server className="w-3 h-3 text-amber-400" />
                      <span className="font-bold text-slate-200 group-hover:text-amber-300">{asset.assetName}</span>
                    </div>
                    <span className="text-[10px] text-red-400 font-bold">{asset.compositeScore}/100</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Unknown Primitives */}
          {filteredUnknown.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Requiring Classification</span>
              <div className="space-y-1">
                {filteredUnknown.slice(0, 3).map((unk) => (
                  <div
                    key={unk.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setCurrentTab('unknown');
                    }}
                    className="p-2 rounded-sm bg-defense-850 hover:bg-defense-800 border border-defense-700 flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <span className="font-bold text-amber-300">{unk.symbol}</span>
                    <span className="text-[10px] text-slate-400">{unk.relatedApplication}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
