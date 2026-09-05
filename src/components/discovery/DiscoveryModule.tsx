import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DISCOVERY_SOURCES, ARTEFACTS_CATALOG } from '../../data/mockData';
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
  Sparkles
} from 'lucide-react';

export const DiscoveryModule: React.FC = () => {
  const { 
    discoveryState, 
    startDiscoveryScan, 
    setSelectedArtefact, 
    setIsDrawerOpen, 
    setCurrentTab,
    openCopilotWithContext
  } = useApp();

  const [selectedSources, setSelectedSources] = useState<string[]>(
    DISCOVERY_SOURCES.map(s => s.id)
  );

  const toggleSource = (id: string) => {
    setSelectedSources(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
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
                Discovery Sources & Scanning
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-300">
                Multi-Surface Probing
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Automated multi-source inspection engine scanning source code, compiled binaries, container images, TLS ingress, and HSMs.
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
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Discovery Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4">
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
      </div>
    </div>
  );
};
