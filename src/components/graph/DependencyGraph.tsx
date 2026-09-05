import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DEPENDENCY_GRAPH_NODES, 
  DEPENDENCY_GRAPH_LINKS 
} from '../../data/mockData';
import { BlastRadiusPanel } from './BlastRadiusPanel';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles,
  Layers,
  Lock,
  ChevronDown
} from 'lucide-react';
import { DependencyNode } from '../../types';

export const DependencyGraph: React.FC = () => {
  const { 
    selectedGraphNodeId, 
    setSelectedGraphNodeId,
    openAssetIntelligence,
    openCopilotWithContext 
  } = useApp();

  const [filterAlgorithm, setFilterAlgorithm] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeExplainer, setActiveExplainer] = useState<string | null>(
    'Authentication Service -> Token Authority: Interfaces with Token Authority to mint signed identity assertions using RSA-2048.'
  );
  const [viewStyle, setViewStyle] = useState<'hierarchy' | 'surface'>('hierarchy');

  // The 7 explicit enterprise layers required by SOC architecture
  const layers = [
    { id: 'business', name: 'BUSINESS FUNCTION', y: 35 },
    { id: 'application', name: 'APPLICATION', y: 130 },
    { id: 'service', name: 'SERVICE', y: 230 },
    { id: 'api', name: 'API', y: 330 },
    { id: 'library', name: 'CRYPTOGRAPHIC LIBRARY', y: 430 },
    { id: 'algorithm', name: 'ALGORITHM', y: 530 },
    { id: 'certificate', name: 'CERTIFICATE / KEY', y: 630 }
  ];

  // Specific path highlighting when RSA-2048 is selected (Requirement #7)
  // Affected path: Citizen Authentication -> Authentication Service -> OAuth/OIDC APIs -> OpenSSL -> RSA-2048 -> Certificate/Key
  const isRsaSelected = selectedGraphNodeId === 'algo-rsa2048' || !selectedGraphNodeId;

  const affectedPathNodeIds = useMemo(() => {
    if (isRsaSelected) {
      return new Set<string>([
        'biz-01',       // Citizen Authentication
        'app-auth',     // Authentication Service
        'srv-token',    // Token Authority
        'api-oauth',    // OAuth/OIDC APIs
        'lib-openssl',  // OpenSSL 1.1.1u
        'algo-rsa2048', // RSA-2048
        'cert-auth023', // Certificate / Key
        'app-citizen',  // Downstream consumer
        'app-payment',  // Downstream consumer
        'biz-02'        // Treasury & Settlement
      ]);
    }

    // Direct neighborhood if other node selected
    const set = new Set<string>([selectedGraphNodeId]);
    DEPENDENCY_GRAPH_LINKS.forEach(link => {
      if (link.source === selectedGraphNodeId) set.add(link.target);
      if (link.target === selectedGraphNodeId) set.add(link.source);
    });
    return set;
  }, [selectedGraphNodeId, isRsaSelected]);

  // Primary spine link IDs for directional flow animation
  const primarySpineLinks = useMemo(() => {
    return new Set<string>([
      'biz-01->app-auth',
      'app-auth->srv-token',
      'srv-token->api-oauth',
      'api-oauth->lib-openssl',
      'lib-openssl->algo-rsa2048',
      'algo-rsa2048->cert-auth023'
    ]);
  }, []);

  const handleNodeClick = (node: DependencyNode) => {
    setSelectedGraphNodeId(node.id);
    const incidentLink = DEPENDENCY_GRAPH_LINKS.find(
      l => l.source === node.id || l.target === node.id
    );
    if (incidentLink && incidentLink.explainer) {
      setActiveExplainer(`${node.label}: ${incidentLink.explainer}`);
    } else if (node.description) {
      setActiveExplainer(`${node.label}: ${node.description}`);
    }
  };

  const handleNodeDoubleClick = (node: DependencyNode) => {
    if (node.id === 'algo-rsa2048' || node.type === 'algorithm') {
      openAssetIntelligence('RSA-2048');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-hidden select-none">
      {/* Top Toolbar */}
      <div className="p-3 border-b border-defense-700 bg-defense-900 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wide">
            Cryptographic Dependency Graph
          </h2>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-400">
            {viewStyle === 'hierarchy' ? '7-Layer Hierarchy' : 'Attack Surface View'}
          </span>
        </div>

        {/* Action & Filter Controls */}
        <div className="flex items-center gap-2">
          {/* View Topology Mode */}
          <div className="flex items-center bg-defense-850 border border-defense-700 rounded p-0.5 text-xs font-mono">
            <button
              onClick={() => setViewStyle('hierarchy')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                viewStyle === 'hierarchy' ? 'bg-defense-750 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              7 Layers
            </button>
            <button
              onClick={() => setViewStyle('surface')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                viewStyle === 'surface' ? 'bg-defense-750 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Attack Surface
            </button>
          </div>

          {/* Preset focus selector */}
          <div className="flex items-center gap-1.5 bg-defense-850 border border-defense-700 rounded p-0.5 text-xs font-mono">
            <button
              onClick={() => setSelectedGraphNodeId('algo-rsa2048')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                isRsaSelected ? 'bg-defense-750 text-red-300 font-semibold border border-red-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              RSA-2048 Path
            </button>
            <button
              onClick={() => setSelectedGraphNodeId('')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                !isRsaSelected ? 'bg-defense-750 text-slate-200 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Topology
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center bg-defense-850 border border-defense-700 rounded text-slate-400 text-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.4))}
              className="p-1.5 hover:text-slate-100 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.7))}
              className="p-1.5 hover:text-slate-100 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:text-slate-100 border-l border-defense-700 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => openCopilotWithContext("Analyze the cryptographic dependency path of RSA-2048 and identify single points of failure.")}
            className="p-1.5 rounded border border-defense-700 bg-defense-850 text-slate-300 hover:text-cyan-300 transition-colors"
            title="AI Dependency Analysis"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Explainer Bar: Why does this dependency exist? */}
      <div className="px-3 py-1.5 bg-defense-900/90 border-b border-defense-700/80 flex items-center justify-between text-[11px] font-mono shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="text-cyan-400 font-bold uppercase shrink-0 text-[10px]">
            [WHY THIS DEPENDENCY EXISTS]:
          </span>
          <span className="text-slate-200 truncate font-sans">
            {activeExplainer || 'Select any node to inspect its cryptographic binding rationale.'}
          </span>
        </div>
        <span className="hidden sm:inline text-[10px] text-slate-400 shrink-0 ml-2">
          Architecture Explainer
        </span>
      </div>

      {/* Main Graph Canvas Area + Compact Blast Radius Sidebar */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* SVG Visualization Canvas */}
        <div className="flex-1 h-full overflow-auto bg-[#06090e] relative">
          <div 
            className="w-[1250px] h-[720px] relative transition-transform duration-150 origin-top-left"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg className="w-full h-full absolute inset-0 pointer-events-none">
              <defs>
                <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="#151e2d" />
                </pattern>
                {/* Arrow markers */}
                <marker id="arrow-subdued" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#1e293b" />
                </marker>
                <marker id="arrow-highlighted" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              {/* Background Grid */}
              <rect width="100%" height="100%" fill="url(#grid-dots)" />

              {/* 7-Layer Background Horizontal Dividers & Labels */}
              {layers.map((l, idx) => (
                <g key={l.id}>
                  {/* Layer demarcation line */}
                  <line 
                    x1="0" 
                    y1={l.y + 35} 
                    x2="1250" 
                    y2={l.y + 35} 
                    stroke="#0f1624" 
                    strokeWidth="1" 
                    strokeDasharray="2 4" 
                  />
                  {/* Layer Label on Left */}
                  <text 
                    x="16" 
                    y={l.y - 12} 
                    fill="#475569" 
                    fontSize="9" 
                    fontFamily="JetBrains Mono, monospace" 
                    fontWeight="600"
                    letterSpacing="0.08em"
                  >
                    LAYER 0{idx + 1} // {l.name}
                  </text>
                </g>
              ))}

              {/* Render Connection Links */}
              {DEPENDENCY_GRAPH_LINKS.map((link) => {
                const sourceNode = DEPENDENCY_GRAPH_NODES.find(n => n.id === link.source);
                const targetNode = DEPENDENCY_GRAPH_NODES.find(n => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const isLinkActive = affectedPathNodeIds.has(link.source) && affectedPathNodeIds.has(link.target);
                const isSpine = primarySpineLinks.has(`${link.source}->${link.target}`) || 
                                primarySpineLinks.has(`${link.target}->${link.source}`);

                // Smooth Bezier path calculation
                const sx = (sourceNode.x ?? 0) + 85;
                const sy = (sourceNode.y ?? 0) + 14;
                const tx = (targetNode.x ?? 0) + 85;
                const ty = (targetNode.y ?? 0) + 14;
                const dy = ty - sy;
                const pathData = `M ${sx} ${sy} C ${sx} ${sy + dy * 0.5}, ${tx} ${ty - dy * 0.5}, ${tx} ${ty}`;

                return (
                  <path
                    key={`${link.source}->${link.target}`}
                    d={pathData}
                    fill="none"
                    stroke={
                      isLinkActive 
                        ? (isSpine ? '#ef4444' : '#0284c7') 
                        : '#172030'
                    }
                    strokeWidth={isLinkActive ? (isSpine ? '1.5' : '1.2') : '1'}
                    strokeDasharray={isLinkActive ? '4 3' : undefined}
                    opacity={isLinkActive ? 1 : 0.2}
                    className={isLinkActive ? 'transition-all duration-300' : ''}
                  />
                );
              })}
            </svg>

            {/* Render Nodes as Interactive HTML Elements */}
            {DEPENDENCY_GRAPH_NODES.map((node) => {
              const isSelected = selectedGraphNodeId === node.id || (node.id === 'algo-rsa2048' && isRsaSelected);
              const isPathActive = affectedPathNodeIds.has(node.id);
              const isFocusAlgo = node.id === 'algo-rsa2048';

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  onDoubleClick={() => handleNodeDoubleClick(node)}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: '180px'
                  }}
                  className={`absolute p-2 rounded-sm border cursor-pointer select-none transition-all duration-150 font-mono text-[11px] ${
                    isSelected
                      ? 'border-red-500 bg-defense-850 shadow-lg shadow-black/80 z-20 ring-1 ring-red-500/50'
                      : isPathActive
                      ? 'border-defense-600 bg-defense-900/90 text-slate-100 z-10'
                      : 'border-defense-700/40 bg-defense-950/70 text-slate-500 opacity-30 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-slate-400 uppercase tracking-tight truncate">
                      {node.type}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      node.criticality === 'Critical' 
                        ? 'bg-red-400' 
                        : node.criticality === 'High' 
                        ? 'bg-amber-400' 
                        : 'bg-emerald-400'
                    }`} />
                  </div>

                  <div className="font-bold text-slate-200 truncate mt-0.5 leading-snug">
                    {node.label}
                  </div>

                  {isFocusAlgo && (
                    <div className="mt-1 flex items-center justify-between text-[9px] pt-1 border-t border-defense-700 text-red-300">
                      <span>92/100 RISK</span>
                      <span>SHOR VULN</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Right-Side Blast Radius Panel (Requirement #7) */}
        <BlastRadiusPanel />
      </div>
    </div>
  );
};
