import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ATTACK_SURFACE_NODES } from '../../data/mockData';
import { AttackSurfaceNode, QuantumStatus } from '../../types';
import { 
  ShieldAlert, 
  Globe, 
  ArrowRight, 
  Cpu, 
  Lock, 
  Server, 
  Database, 
  Filter, 
  AlertTriangle, 
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle,
  Network
} from 'lucide-react';

export const AttackSurfaceModule: React.FC = () => {
  const { openAssetIntelligence, setCurrentTab, setSelectedGraphNodeId } = useApp();

  const [selectedExposure, setSelectedExposure] = useState<string>('all');
  const [selectedQuantumStatus, setSelectedQuantumStatus] = useState<string>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('as-04'); // default RSA-2048 Auth Service

  // Tiers in attack surface traversal order
  const TIERS = [
    'Internet Entrypoint',
    'Public API Ingress',
    'Internal Application',
    'Service Layer',
    'Crypto Provider',
    'Algorithm',
    'Sensitive Store'
  ];

  const filteredNodes = useMemo(() => {
    return ATTACK_SURFACE_NODES.filter(node => {
      if (selectedExposure !== 'all' && node.exposure !== selectedExposure) return false;
      if (selectedQuantumStatus !== 'all' && node.quantumStatus !== selectedQuantumStatus) return false;
      return true;
    });
  }, [selectedExposure, selectedQuantumStatus]);

  const activeNode = ATTACK_SURFACE_NODES.find(n => n.id === selectedNodeId) || ATTACK_SURFACE_NODES[3];

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-hidden font-mono">
      {/* Top Banner & Attack Surface Score Header */}
      <div className="p-4 border-b border-defense-700 bg-defense-900/90 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-red-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Cryptographic Attack Surface
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-red-500/40 bg-red-500/10 text-red-300">
                EXTERNAL TRAVERSAL EXPOSURE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Topological analysis of external exposure paths: tracking how adversaries can traverse from internet-facing ingress points to sensitive cryptographic stores.
            </p>
          </div>

          {/* Attack Surface Exposure KPI Strip */}
          <div className="flex items-center gap-3 bg-defense-850 p-2.5 rounded border border-defense-700">
            <div className="text-right pr-3 border-r border-defense-700">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Attack Surface Score</div>
              <div className="text-xl font-black text-red-400 flex items-baseline justify-end gap-1">
                <span>78</span>
                <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
              <div className="text-[9px] text-slate-400 italic">Synthetic analytical score</div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Public Ingress:</span>
                <span className="text-red-400 font-bold">3 Points</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Quantum Vulnerable:</span>
                <span className="text-amber-400 font-bold">5 Nodes</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Custom S-Boxes:</span>
                <span className="text-purple-400 font-bold">1 Node</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">End-to-End Traversal:</span>
                <span className="text-red-400 font-bold">High Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="px-4 py-2 border-b border-defense-700 bg-defense-900/60 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span className="text-[11px] uppercase font-bold">Filter Surface:</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400">Exposure:</span>
            <select
              value={selectedExposure}
              onChange={(e) => setSelectedExposure(e.target.value)}
              className="bg-defense-800 border border-defense-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Exposure Levels</option>
              <option value="Public">Public (Internet-Facing)</option>
              <option value="Internal">Internal (Mesh / VPC)</option>
              <option value="Restricted">Restricted (Vault / HSM)</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400">Status:</span>
            <select
              value={selectedQuantumStatus}
              onChange={(e) => setSelectedQuantumStatus(e.target.value)}
              className="bg-defense-800 border border-defense-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Quantum Statuses</option>
              <option value="Quantum-Vulnerable">Quantum-Vulnerable</option>
              <option value="Quantum-Resistant">Quantum-Resistant</option>
              <option value="Unknown">Unknown / Custom</option>
            </select>
          </div>
        </div>

        <div className="text-[10px] text-slate-400">
          Showing <span className="text-cyan-400 font-bold">{filteredNodes.length}</span> nodes along the 7-tier exposure chain
        </div>
      </div>

      {/* Main Split Layout: Left 7-Tier Ingress Flow, Right Threat & Blast Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: 7-Tier Traversable Pipeline */}
        <div className="w-full md:w-7/12 lg:w-8/12 p-4 overflow-y-auto space-y-4">
          <div className="space-y-4">
            {TIERS.map((tierName, tierIdx) => {
              const nodesInTier = filteredNodes.filter(n => n.tier === tierName);

              return (
                <div key={tierName} className="rounded border border-defense-700/80 bg-defense-900/60 p-3 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-defense-700/60">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-defense-800 border border-defense-700 text-[10px] font-bold text-cyan-400 flex items-center justify-center">
                        T{tierIdx + 1}
                      </span>
                      <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                        {tierName}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {nodesInTier.length} {nodesInTier.length === 1 ? 'Node' : 'Nodes'}
                    </span>
                  </div>

                  {nodesInTier.length === 0 ? (
                    <div className="text-[11px] text-slate-400 italic py-2 text-center">
                      No nodes matching active filters in this exposure tier.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {nodesInTier.map(node => {
                        const isSelected = node.id === selectedNodeId;

                        return (
                          <div
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`p-3 rounded border cursor-pointer transition-all ${
                              isSelected 
                                ? 'border-red-500/80 bg-red-950/20 shadow-md shadow-red-950/30' 
                                : 'border-defense-700 bg-defense-850 hover:border-slate-500'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${
                                node.exposure === 'Public' ? 'border-red-500/40 bg-red-500/10 text-red-300' :
                                node.exposure === 'Internal' ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' :
                                'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                              }`}>
                                {node.exposure}
                              </span>

                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${
                                node.quantumStatus === 'Quantum-Vulnerable' ? 'border-red-500/40 bg-red-500/10 text-red-400' :
                                node.quantumStatus === 'Quantum-Resistant' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :
                                'border-purple-500/40 bg-purple-500/10 text-purple-400'
                              }`}>
                                {node.quantumStatus}
                              </span>
                            </div>

                            <div className="text-xs font-bold text-slate-100 truncate">
                              {node.label}
                            </div>

                            {node.algorithm && (
                              <div className="text-[11px] text-cyan-300 mt-1 flex items-center gap-1">
                                <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
                                <span className="truncate">{node.algorithm}</span>
                              </div>
                            )}

                            <div className="text-[10px] text-slate-400 mt-1.5 line-clamp-2">
                              {node.notes}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Threat Narrative & Path Inspector */}
        <div className="w-full md:w-5/12 lg:w-4/12 border-l border-defense-700 bg-defense-900/50 p-5 overflow-y-auto space-y-5">
          <div className="border-b border-defense-700/80 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Attack Path Node Analysis
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                {activeNode.dnaId || 'ECDAT-CRYPTO-NODE'}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-100 mt-1">
              {activeNode.label}
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              Tier: <span className="text-slate-200">{activeNode.tier}</span>
            </div>
          </div>

          {/* Node Risk Attributes */}
          <div className="p-3.5 rounded border border-defense-700 bg-defense-950/70 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-defense-700/50">
              <span className="text-slate-400">Exposure Boundary:</span>
              <span className={`font-bold ${
                activeNode.exposure === 'Public' ? 'text-red-400' :
                activeNode.exposure === 'Internal' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {activeNode.exposure}
              </span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-defense-700/50">
              <span className="text-slate-400">Quantum Vulnerability:</span>
              <span className={`font-bold ${
                activeNode.quantumStatus === 'Quantum-Vulnerable' ? 'text-red-400' :
                activeNode.quantumStatus === 'Quantum-Resistant' ? 'text-emerald-400' : 'text-purple-400'
              }`}>
                {activeNode.quantumStatus}
              </span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-defense-700/50">
              <span className="text-slate-400">Criticality:</span>
              <span className="text-red-400 font-bold">{activeNode.criticality}</span>
            </div>
            {activeNode.algorithm && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cryptographic Primitive:</span>
                <span className="text-cyan-300 font-bold">{activeNode.algorithm}</span>
              </div>
            )}
          </div>

          {/* Adversary Threat Assessment */}
          <div className="p-4 rounded border border-red-500/30 bg-red-950/10 space-y-2">
            <div className="text-xs font-bold text-red-300 flex items-center gap-1.5 uppercase">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Adversary Traversal Threat
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeNode.notes}
            </p>
            <div className="pt-2 border-t border-red-500/20 text-[10px] text-amber-300">
              Traversing this node allows bypassing perimeter TLS authentication assertions, granting lateral movement into downstream microservices.
            </div>
          </div>

          {/* Quick Pivot Actions */}
          <div className="space-y-2 pt-2">
            {activeNode.algorithm?.includes('RSA-2048') && (
              <button
                onClick={() => openAssetIntelligence('RSA-2048')}
                className="w-full py-2.5 px-3 rounded border border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Cpu className="w-4 h-4" />
                <span>INSPECT IN ASSET DRAWER</span>
              </button>
            )}

            <button
              onClick={() => {
                setSelectedGraphNodeId(activeNode.id === 'as-04' ? 'algo-rsa2048' : 'app-citizen');
                setCurrentTab('graph');
              }}
              className="w-full py-2.5 px-3 rounded border border-defense-700 hover:border-slate-500 bg-defense-850 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Network className="w-4 h-4 text-cyan-400" />
              <span>EXPLORE IN DEPENDENCY GRAPH</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
