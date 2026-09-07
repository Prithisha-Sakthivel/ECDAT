import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NavigationTab, 
  EnvironmentType, 
  CryptoArtefact, 
  DiscoveryScanState, 
  UnknownCryptoItem,
  ImpactScenario,
  DrawerTab
} from '../types';
import { 
  ARTEFACTS_CATALOG, 
  UNKNOWN_CRYPTO_CATALOG, 
  IMPACT_SCENARIOS,
  DEMO_ORGANIZATION,
  APPLICATION_HEATMAP_DATA,
  PQC_RECOMMENDATIONS
} from '../data/mockData';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  activeEnv: EnvironmentType;
  setActiveEnv: (env: EnvironmentType) => void;
  
  // Artefact Inspection
  selectedArtefact: CryptoArtefact | null;
  setSelectedArtefact: (art: CryptoArtefact | null) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  drawerTab: DrawerTab;
  setDrawerTab: (tab: DrawerTab) => void;
  openAssetIntelligence: (idOrAlgo?: string, initialTab?: DrawerTab) => void;
  openDecisionTrace: (assetName?: string) => void;
  showWowMoment: boolean;
  setShowWowMoment: (show: boolean) => void;
  
  // Dependency Graph
  selectedGraphNodeId: string | null;
  setSelectedGraphNodeId: (id: string | null) => void;
  triggerSimulateDeprecationFromGraph: (algorithmName?: string) => void;
  
  // Impact Simulator
  activeScenario: ImpactScenario;
  setActiveScenarioId: (id: string) => void;
  isSimulating: boolean;
  simulationStep: number;
  runSimulation: () => void;
  generateMigrationPlan: (assetName?: string) => void;
  focusedRoadmapAssetId: string | null;
  setFocusedRoadmapAssetId: (id: string | null) => void;
  
  // Discovery Engine
  discoveryState: DiscoveryScanState;
  startDiscoveryScan: () => void;
  
  // Unknown Cryptography
  unknownItems: UnknownCryptoItem[];
  updateUnknownStatus: (id: string, status: UnknownCryptoItem['status']) => void;
  
  // ECDAT Intelligence (Copilot)
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  copilotQuery: string;
  setCopilotQuery: (q: string) => void;
  openCopilotWithContext: (queryText: string) => void;
  
  // Modals & Overlays
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // View Mode (Executive vs Analyst)
  viewMode: 'executive' | 'analyst';
  setViewMode: (mode: 'executive' | 'analyst') => void;
  toggleViewMode: () => void;

  // Guided Demo Mode for Judges
  isGuidedDemoActive: boolean;
  guidedDemoStep: number;
  startGuidedDemo: () => void;
  nextGuidedDemoStep: () => void;
  prevGuidedDemoStep: () => void;
  exitGuidedDemo: () => void;
  jumpToGuidedDemoStep: (step: number) => void;

  // Evidence Ledger Focus
  selectedLedgerDnaId: string | null;
  setSelectedLedgerDnaId: (dnaId: string | null) => void;
  openLedgerForDna: (dnaId: string) => void;

  // Mosca's Theorem Engine Parameters (Risk = (X + Y) > Z)
  moscaZ: number; // Configurable Time to CRQC / Q-Day (years)
  setMoscaZ: (z: number) => void;
  
  // Dynamic Inventory & Classification
  artefacts: CryptoArtefact[];
  updateArtefactClassification: (id: string, updates: Partial<CryptoArtefact>) => void;
  
  // Real File Exports
  exportCycloneDxCbomJson: () => void;
  exportAuditReportJson: () => void;

  // Navigation helper to step through the 7 stages
  navigateToStage: (stage: 'discover' | 'understand' | 'connect' | 'assess' | 'prioritize' | 'simulate' | 'migrate') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [activeEnv, setActiveEnv] = useState<EnvironmentType>('Production');
  
  // Mosca's Theorem Horizon Z (default 8 years to CRQC)
  const [moscaZ, setMoscaZ] = useState<number>(8);

  // Dynamic Artefacts Catalog for Classification tagging
  const [artefacts, setArtefacts] = useState<CryptoArtefact[]>(ARTEFACTS_CATALOG);

  const updateArtefactClassification = (id: string, updates: Partial<CryptoArtefact>) => {
    setArtefacts(prev => prev.map(art => {
      if (art.id === id || art.dnaId === id) {
        const updated = { ...art, ...updates };
        if (selectedArtefact?.id === art.id) {
          setSelectedArtefact(updated);
        }
        return updated;
      }
      return art;
    }));
  };

  // Real CycloneDX 1.6 CBOM Export Engine
  const exportCycloneDxCbomJson = () => {
    const cbomPayload = {
      bomFormat: "CycloneDX",
      specVersion: "1.6",
      serialNumber: "urn:uuid:7f83b165-7ff1-4c53-b92d-c18148a1d65d",
      version: 1,
      metadata: {
        timestamp: new Date().toISOString(),
        tools: [
          {
            vendor: "ECDAT Cyber Operations",
            name: "Enterprise Cryptographic Discovery & Analysis Tool",
            version: "2.4.0",
            hashes: [
              {
                alg: "SHA-256",
                content: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
              }
            ]
          }
        ],
        component: {
          type: "application",
          name: "Demo Government Enterprise Cryptographic Estate",
          version: "2026.3-SYNTHETIC",
          description: "Enterprise Cryptographic Bill of Materials covering 4,382 discovered cryptographic assets"
        },
        authors: [
          {
            name: "NTRO PS-26164 Quantum Defense Workgroup",
            email: "security-ops@ecdat.internal"
          }
        ]
      },
      components: artefacts.map(art => ({
        type: "cryptographic-asset",
        bomRef: art.dnaId,
        name: art.name,
        group: art.application,
        version: art.libraryVersion,
        description: `${art.algorithm} in ${art.location}`,
        cryptoProperties: {
          assetType: art.cryptoType === 'Asymmetric' ? 'algorithm' : art.cryptoType === 'Protocol' ? 'protocol' : 'algorithm',
          algorithmProperties: {
            primitive: art.purpose.includes('Signature') ? 'signature' : art.purpose.includes('Exchange') ? 'key-derivation' : 'block-cipher',
            parameterSetIdentifier: art.keySize || '2048',
            classicalSecurityLevel: art.algorithm.includes('2048') ? 112 : art.algorithm.includes('256') ? 128 : 256,
            nistQuantumSecurityLevel: art.quantumStatus === 'Quantum-Vulnerable' ? 0 : 3,
            cryptoFunctions: [art.purpose.split('/')[0].trim()]
          },
          protocolProperties: art.protocol ? {
            type: "tls",
            version: art.protocol
          } : undefined,
          certificateProperties: art.certificate ? {
            subjectName: art.certificate
          } : undefined
        }
      }))
    };

    const blob = new Blob([JSON.stringify(cbomPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecdat-cbom-cyclonedx-1.6-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Real Audit Report Export
  const exportAuditReportJson = () => {
    const reportPayload = {
      title: "ECDAT Executive & Technical Cryptographic Audit Report",
      standard: "CycloneDX 1.6 / Mosca Theorem (X+Y > Z) / CNSA 2.0",
      generatedAt: new Date().toISOString(),
      organization: DEMO_ORGANIZATION,
      summary: {
        totalArtefacts: 4382,
        critical: 317,
        high: 842,
        medium: 1420,
        low: 1803,
        unclassifiedRequiringReview: 46,
        moscaCrqcYearsZ: moscaZ,
        targetCrqcYear: new Date().getFullYear() + moscaZ,
        highPriorityRemediationTarget: "RSA-2048 in Authentication Service (P1 Immediate)"
      },
      moscaTheoremEvaluation: {
        equation: "Risk = (X + Y) > Z",
        crqcEstimatedArrivalYears: moscaZ,
        shorBreakingVulnerabilities: ["RSA-2048", "ECDSA P-256", "Diffie-Hellman"],
        groverHalvingVulnerabilities: ["AES-128 (effective 64-bit margin)"],
        candidateRecommendations: PQC_RECOMMENDATIONS
      },
      auditedApplications: APPLICATION_HEATMAP_DATA
    };

    const blob = new Blob([JSON.stringify(reportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ecdat-quantum-audit-report-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Artefact Inspection
  const [selectedArtefact, setSelectedArtefact] = useState<CryptoArtefact | null>(ARTEFACTS_CATALOG[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('overview');
  const [showWowMoment, setShowWowMoment] = useState<boolean>(false);
  
  // Dependency Graph (default to RSA-2048 selected to showcase the core demo flow)
  const [selectedGraphNodeId, setSelectedGraphNodeId] = useState<string | null>('algo-rsa2048');
  
  // Impact Simulator
  const [activeScenarioId, setActiveScenarioIdState] = useState<string>('scen-rsa2048');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(3); // default completed
  
  const activeScenario = IMPACT_SCENARIOS.find(s => s.id === activeScenarioId) || IMPACT_SCENARIOS[0];

  const setActiveScenarioId = (id: string) => {
    setActiveScenarioIdState(id);
    setSimulationStep(0);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    setTimeout(() => {
      setSimulationStep(2);
      setTimeout(() => {
        setSimulationStep(3);
        setIsSimulating(false);
      }, 700);
    }, 800);
  };

  const [focusedRoadmapAssetId, setFocusedRoadmapAssetId] = useState<string | null>('rdm-02');

  const openAssetIntelligence = (idOrAlgo?: string, initialTab?: DrawerTab) => {
    // Find matching artefact or default to RSA-2048 primary demo asset
    const target = ARTEFACTS_CATALOG.find(a => 
      a.id === idOrAlgo || 
      a.algorithm.toLowerCase() === (idOrAlgo?.toLowerCase() ?? '') ||
      a.name.toLowerCase().includes(idOrAlgo?.toLowerCase() ?? '')
    ) || ARTEFACTS_CATALOG[0];

    setSelectedArtefact(target);
    setSelectedGraphNodeId('algo-rsa2048');
    if (initialTab) {
      setDrawerTab(initialTab);
    }
    setIsDrawerOpen(true);
  };

  const openDecisionTrace = (assetName?: string) => {
    setCurrentTab('trace');
  };

  const generateMigrationPlan = (assetName?: string) => {
    // Set focus on RSA-2048 / Authentication Service roadmap item and switch to roadmap tab
    setFocusedRoadmapAssetId('rdm-02');
    setCurrentTab('roadmap');
  };

  const triggerSimulateDeprecationFromGraph = (algorithmName?: string) => {
    // Navigate straight to simulator with RSA-2048 scenario loaded
    setActiveScenarioId('scen-rsa2048');
    runSimulation();
    setCurrentTab('simulator');
  };

  // Discovery Scan State
  const [discoveryState, setDiscoveryState] = useState<DiscoveryScanState>({
    isScanning: false,
    progress: 100,
    currentPhase: 'Discovery completed',
    assetsScanned: 12481,
    filesAnalyzed: '3.2M',
    cryptoArtefactsFound: 4382,
    unknownFound: 46,
    logs: [
      '[SYSTEM] Initializing distributed static analysis workers...',
      '[OK] 48 Git repositories indexed; 1,420 binary symbols mapped.',
      '[OK] Detected 317 quantum-vulnerable asymmetric key pairs.',
      '[WARN] 46 unidentified custom cryptographic patterns flagged for review.',
      '[COMPLETE] Discovery state synchronized with Dependency Graph.'
    ]
  });

  const startDiscoveryScan = () => {
    setDiscoveryState(prev => ({
      ...prev,
      isScanning: true,
      progress: 5,
      currentPhase: 'Initializing scanners & AST parsers...',
      logs: ['[INIT] Dispatching discovery agents across all source endpoints...']
    }));

    const stages = [
      { p: 20, phase: 'Scanning repositories & codebases (Go, Java, Python, C++, TS)...', log: '[SCAN] 48 Repositories processed. AST tree parsed.' },
      { p: 40, phase: 'Inspecting binary symbols & dynamic shared objects (.so / .dll)...', log: '[INSPECT] OpenSSL 1.1.1, BouncyCastle, and libsodium symbol links resolved.' },
      { p: 60, phase: 'Auditing TLS reverse proxy configurations & cipher suites...', log: '[TLS] Ingress NGINX & Envoy profiles evaluated. TLS 1.2 usage cataloged.' },
      { p: 80, phase: 'Correlating X.509 certificate chains & KMS vault bindings...', log: '[PKI] Correlating AUTH-GOV-ROOT-023 trust hierarchy.' },
      { p: 95, phase: 'Synthesizing cross-service dependency graph & blast radius...', log: '[GRAPH] Multi-tier blast radius matrices computed.' },
      { p: 100, phase: 'Discovery completed', log: '[DONE] Synchronized 4,382 artefacts, 317 quantum-vulnerable, 46 custom implementations.' }
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setDiscoveryState(prev => ({
          ...prev,
          progress: stage.p,
          currentPhase: stage.phase,
          logs: [...prev.logs, stage.log],
          isScanning: stage.p < 100
        }));
      }, (idx + 1) * 750);
    });
  };

  // Unknown Cryptography
  const [unknownItems, setUnknownItems] = useState<UnknownCryptoItem[]>(UNKNOWN_CRYPTO_CATALOG);

  const updateUnknownStatus = (id: string, status: UnknownCryptoItem['status']) => {
    setUnknownItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  // ECDAT Intelligence Copilot
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotQuery, setCopilotQuery] = useState<string>('');

  const openCopilotWithContext = (queryText: string) => {
    setCopilotQuery(queryText);
    setIsCopilotOpen(true);
  };

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // View Mode (Executive vs Analyst)
  const [viewMode, setViewMode] = useState<'executive' | 'analyst'>('analyst');
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'executive' ? 'analyst' : 'executive');
  };

  // Guided Demo Mode for Judges
  const [isGuidedDemoActive, setIsGuidedDemoActive] = useState<boolean>(false);
  const [guidedDemoStep, setGuidedDemoStep] = useState<number>(1);

  const GUIDED_STEP_TABS: Record<number, NavigationTab> = {
    1: 'overview',
    2: 'discovery',
    3: 'inventory',
    4: 'graph',
    5: 'risk',
    6: 'simulator',
    7: 'roadmap',
    8: 'ledger'
  };

  const jumpToGuidedDemoStep = (step: number) => {
    const clamped = Math.max(1, Math.min(step, 8));
    setGuidedDemoStep(clamped);
    const targetTab = GUIDED_STEP_TABS[clamped];
    if (targetTab) setCurrentTab(targetTab);

    if (clamped === 4) {
      setSelectedGraphNodeId('algo-rsa2048');
    } else if (clamped === 6) {
      setActiveScenarioId('scen-rsa2048');
      setSimulationStep(3);
    }
  };

  const startGuidedDemo = () => {
    setIsGuidedDemoActive(true);
    jumpToGuidedDemoStep(1);
  };

  const nextGuidedDemoStep = () => {
    if (guidedDemoStep < 8) {
      jumpToGuidedDemoStep(guidedDemoStep + 1);
    } else {
      setIsGuidedDemoActive(false);
      setShowWowMoment(true);
    }
  };

  const prevGuidedDemoStep = () => {
    if (guidedDemoStep > 1) {
      jumpToGuidedDemoStep(guidedDemoStep - 1);
    }
  };

  const exitGuidedDemo = () => {
    setIsGuidedDemoActive(false);
  };

  // Evidence Ledger Focus
  const [selectedLedgerDnaId, setSelectedLedgerDnaId] = useState<string | null>(null);

  const openLedgerForDna = (dnaId: string) => {
    setSelectedLedgerDnaId(dnaId);
    setCurrentTab('ledger');
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 7-Stage Navigation Handler
  const navigateToStage = (stage: 'discover' | 'understand' | 'connect' | 'assess' | 'prioritize' | 'simulate' | 'migrate') => {
    switch(stage) {
      case 'discover':
        setCurrentTab('discovery');
        break;
      case 'understand':
        setCurrentTab('inventory');
        break;
      case 'connect':
        setCurrentTab('graph');
        break;
      case 'assess':
        setCurrentTab('risk');
        break;
      case 'prioritize':
        setCurrentTab('risk');
        break;
      case 'simulate':
        setCurrentTab('simulator');
        break;
      case 'migrate':
        setCurrentTab('roadmap');
        break;
    }
  };

  return (
    <AppContext.Provider value={{
      currentTab,
      setCurrentTab,
      activeEnv,
      setActiveEnv,
      selectedArtefact,
      setSelectedArtefact,
      isDrawerOpen,
      setIsDrawerOpen,
      drawerTab,
      setDrawerTab,
      openAssetIntelligence,
      openDecisionTrace,
      showWowMoment,
      setShowWowMoment,
      selectedGraphNodeId,
      setSelectedGraphNodeId,
      triggerSimulateDeprecationFromGraph,
      activeScenario,
      setActiveScenarioId,
      isSimulating,
      simulationStep,
      runSimulation,
      generateMigrationPlan,
      focusedRoadmapAssetId,
      setFocusedRoadmapAssetId,
      discoveryState,
      startDiscoveryScan,
      unknownItems,
      updateUnknownStatus,
      isCopilotOpen,
      setIsCopilotOpen,
      copilotQuery,
      setCopilotQuery,
      openCopilotWithContext,
      isSearchOpen,
      setIsSearchOpen,
      isNotificationsOpen,
      setIsNotificationsOpen,
      viewMode,
      setViewMode,
      toggleViewMode,
      isGuidedDemoActive,
      guidedDemoStep,
      startGuidedDemo,
      nextGuidedDemoStep,
      prevGuidedDemoStep,
      exitGuidedDemo,
      jumpToGuidedDemoStep,
      selectedLedgerDnaId,
      setSelectedLedgerDnaId,
      openLedgerForDna,
      moscaZ,
      setMoscaZ,
      artefacts,
      updateArtefactClassification,
      exportCycloneDxCbomJson,
      exportAuditReportJson,
      navigateToStage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
