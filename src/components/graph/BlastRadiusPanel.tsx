import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  Workflow, 
  Layers, 
  Lock,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { DEPENDENCY_GRAPH_NODES } from '../../data/mockData';

export const BlastRadiusPanel: React.FC = () => {
  const { 
    selectedGraphNodeId, 
    triggerSimulateDeprecationFromGraph,
    openAssetIntelligence,
    openCopilotWithContext 
  } = useApp();

  const selectedNode = DEPENDENCY_GRAPH_NODES.find(n => n.id === selectedGraphNodeId) || 
                       DEPENDENCY_GRAPH_NODES.find(n => n.id === 'algo-rsa2048')!;

  const isRsa2048 = selectedNode.id === 'algo-rsa2048';

  // Metrics specifically aligned with the SIH enterprise demonstration requirements (Requirement #7)
  const blastData = isRsa2048 ? {
    algorithm: 'RSA-2048',
    purpose: 'Digital Signature / Auth',
    applicationsAffected: 7,
    servicesImpacted: 12,
    exposedApis: 3,
    criticalBusinessFunctions: 2,
    severity: {
      critical: 2,
      high: 5,
      medium: 5
    },
    criticalFunctions: [
      'National Citizen Authentication',
      'Treasury & Revenue Settlement'
    ],
    affectedSystems: [
      { name: 'Authentication Service', role: 'Root Identity Provider', risk: 'Critical' },
      { name: 'Payment Gateway', role: 'Settlement & Clearing', risk: 'Critical' },
      { name: 'Citizen Services Portal', role: 'Public Citizen Ingress', risk: 'High' },
      { name: 'OAuth / OIDC Gateway', role: 'Token Verification Edge', risk: 'High' }
    ]
  } : {
    algorithm: selectedNode.label,
    purpose: selectedNode.type.toUpperCase(),
    applicationsAffected: 4,
    servicesImpacted: 6,
    exposedApis: 2,
    criticalBusinessFunctions: 1,
    severity: {
      critical: selectedNode.criticality === 'Critical' ? 1 : 0,
      high: 3,
      medium: 2
    },
    criticalFunctions: ['Treasury Settlement'],
    affectedSystems: [
      { name: 'Payment Gateway', role: 'Settlement Engine', risk: 'High' },
      { name: 'API Gateway', role: 'Edge Routing', risk: 'Medium' }
    ]
  };

  return (
    <aside className="w-80 flex flex-col bg-defense-900 border-l border-defense-700 select-none z-10 shrink-0">
      {/* Header (Requirement #7) */}
      <div className="p-3 border-b border-defense-700 bg-defense-850/80 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-100 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Blast Radius
          </h3>
          <p className="text-[10px] font-mono text-slate-400">Ripple impact calculation</p>
        </div>
        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border border-red-500/40 bg-red-500/10 text-red-300 font-semibold uppercase">
          HIGH RISK
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-xs">
        {/* Selected Target Summary */}
        <div className="border border-defense-700 bg-defense-950/60 p-2.5 rounded-sm space-y-1">
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Target Cryptographic Entity</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-100">{blastData.algorithm}</span>
            <span className="text-[9px] px-1 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-300">
              {blastData.purpose}
            </span>
          </div>
        </div>

        {/* Core Impact Metrics Strip (Requirement #7) */}
        <div className="border border-defense-700 bg-defense-950/60 rounded-sm p-2.5 space-y-2">
          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold border-b border-defense-700/60 pb-1">
            Impact Summary
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-sm border border-defense-700 bg-defense-900">
              <div className="text-base font-bold text-slate-100">{blastData.applicationsAffected}</div>
              <div className="text-[9px] text-slate-400 uppercase">Applications</div>
            </div>
            <div className="p-2 rounded-sm border border-defense-700 bg-defense-900">
              <div className="text-base font-bold text-slate-100">{blastData.servicesImpacted}</div>
              <div className="text-[9px] text-slate-400 uppercase">Services</div>
            </div>
            <div className="p-2 rounded-sm border border-defense-700 bg-defense-900">
              <div className="text-base font-bold text-slate-100">{blastData.exposedApis}</div>
              <div className="text-[9px] text-slate-400 uppercase">Exposed APIs</div>
            </div>
            <div className="p-2 rounded-sm border border-red-500/30 bg-red-500/5">
              <div className="text-base font-bold text-red-400">{blastData.criticalBusinessFunctions}</div>
              <div className="text-[9px] text-red-400/80 uppercase">Critical Biz</div>
            </div>
          </div>
        </div>

        {/* Severity Breakdown (Requirement #7) */}
        <div className="border border-defense-700 bg-defense-950/60 rounded-sm p-2.5 space-y-1.5">
          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold border-b border-defense-700/60 pb-1">
            Downstream Severity
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-red-400 font-medium">Critical</span>
              <span className="font-bold text-red-400">{blastData.severity.critical}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-medium">High</span>
              <span className="font-bold text-amber-400">{blastData.severity.high}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-medium">Medium</span>
              <span className="font-bold text-yellow-400">{blastData.severity.medium}</span>
            </div>
          </div>
        </div>

        {/* Critical Business Functions */}
        <div className="border border-defense-700 bg-defense-950/60 rounded-sm p-2.5 space-y-1.5">
          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold border-b border-defense-700/60 pb-1">
            Impacted Business Functions
          </div>
          <div className="space-y-1 text-[10px]">
            {blastData.criticalFunctions.map((fn, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1 h-1 rounded-full bg-red-400" />
                <span>{fn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer (Requirement #7) */}
      <div className="p-3 border-t border-defense-700 bg-defense-850 space-y-2">
        <button
          onClick={() => triggerSimulateDeprecationFromGraph()}
          className="w-full py-2 px-3 rounded-sm border border-red-500/40 hover:bg-red-500/20 bg-red-500/10 text-red-300 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>SIMULATE DEPRECATION</span>
        </button>

        <button
          onClick={() => openAssetIntelligence('RSA-2048')}
          className="w-full py-1.5 px-3 rounded-sm border border-defense-700 hover:border-slate-500 bg-defense-900 text-slate-300 font-mono text-[10px] flex items-center justify-center gap-1.5 transition-colors"
        >
          <Lock className="w-3 h-3 text-cyan-400" />
          <span>Inspect Investigation Drawer</span>
        </button>
      </div>
    </aside>
  );
};
