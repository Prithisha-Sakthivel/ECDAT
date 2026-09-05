export type NavigationTab = 
  | 'overview'
  | 'discovery'
  | 'inventory'
  | 'graph'
  | 'risk'
  | 'simulator'
  | 'roadmap'
  | 'unknown'
  | 'ledger'
  | 'policy'
  | 'trace'
  | 'attack-surface'
  | 'reports'
  | 'settings';

export type DrawerTab = 'overview' | 'risk' | 'dependencies' | 'evidence' | 'migration';

export type EnvironmentType = 'Production' | 'Staging' | 'Development';

export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type QuantumStatus = 'Quantum-Vulnerable' | 'Quantum-Resistant' | 'Hybrid-Transitional' | 'Unknown';

export type CryptoPurpose = 
  | 'Key Establishment / Exchange'
  | 'Digital Signature / Authentication'
  | 'Data Encryption (Symmetric)'
  | 'Integrity / Hashing'
  | 'Transport Security (TLS)'
  | 'Unknown / Custom';

export type ViewMode = 'executive' | 'analyst';

export interface MigrationReadinessFactor {
  name: string;
  score: number;
  maxScore: number;
  weight: string;
  status: 'Ready' | 'In Progress' | 'Blocked' | 'Pending';
  explanation: string;
}

export interface AttackSurfaceNode {
  id: string;
  tier: 'Internet Entrypoint' | 'Public API Ingress' | 'Internal Application' | 'Service Layer' | 'Crypto Provider' | 'Algorithm' | 'Sensitive Store';
  label: string;
  exposure: 'Public' | 'Internal' | 'Restricted';
  quantumStatus: QuantumStatus;
  algorithm?: string;
  dnaId?: string;
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  notes: string;
}

export interface ProvenanceRecord {
  sourceFile: string;
  line: number;
  component: string;
  detectionMethod: 'Static AST Pattern' | 'Runtime Telemetry Hook' | 'Config Parser' | 'X.509 Certificate Parser';
  discoveredTimestamp: string;
  evidenceHash: string;
  ledgerRecordId: string;
}

export interface ConfidenceBreakdown {
  overallScore: number;
  staticAnalysis: number;
  runtimeTelemetry: number;
  configAnalysis: number;
  certInspection: number;
  notes: string;
}

export interface CryptoArtefact {
  id: string;
  dnaId: string; // e.g. ECDAT-CRYPTO-004382
  name: string;
  algorithm: string;
  cryptoType: 'Asymmetric' | 'Symmetric' | 'Hash' | 'Protocol' | 'Custom';
  purpose: CryptoPurpose;
  location: string;
  application: string;
  service: string;
  library: string;
  libraryVersion: string;
  keySize?: string;
  protocol?: string;
  certificate?: string;
  confidence: number;
  confidenceBreakdown?: ConfidenceBreakdown;
  provenance?: ProvenanceRecord;
  risk: RiskLevel;
  quantumStatus: QuantumStatus;
  hndlExposure?: boolean;
  hndlExplanation?: string;
  businessCriticality: 'Critical' | 'High' | 'Medium' | 'Low';
  dataSensitivity: 'Restricted / Classified' | 'Sensitive PII' | 'Confidential' | 'Internal';
  externalExposure: 'Internet-Facing' | 'Partner API Ingress' | 'Internal Network Only';
  dependenciesCount: number;
  lastSeen: string;
  riskExplanation: string;
  applicationsAffected?: number;
  servicesImpacted?: number;
  apisAffected?: number;
  criticalBusinessFunctions?: number;
  quantumExposure?: string;
  compositeRisk?: number;
  migrationPriority?: string;
  factorScores?: RiskFactorBreakdown[];
  candidatePqcApproach: {
    mechanism: string;
    rationale: string;
    nistStandard?: string;
    caveat: string;
  };
}

export interface DependencyNode {
  id: string;
  label: string;
  type: 'business' | 'application' | 'service' | 'api' | 'library' | 'algorithm' | 'certificate';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  dnaId?: string;
  quantumVulnerable?: boolean;
  x?: number;
  y?: number;
  description?: string;
}

export interface DependencyLink {
  id?: string;
  source: string;
  target: string;
  label?: string;
  explainer?: string; // "Why does this dependency exist?"
  highlighted?: boolean;
  conflict?: boolean;
}

export interface BlastRadiusImpact {
  algorithm: string;
  applicationsAffected: number;
  servicesImpacted: number;
  exposedApis: number;
  criticalBusinessFunctions: number;
  severityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  affectedNodeIds: string[];
}

export interface RiskFactorBreakdown {
  name: string;
  score: number;
  maxScore: number;
  contribution: string;
  explanation: string;
  evidence?: string;
}

export interface AssetRiskProfile {
  assetId: string;
  dnaId: string;
  assetName: string;
  compositeScore: number;
  priorityTier: 'P1 — Immediate Planning' | 'P2 — High Priority' | 'P3 — Planned' | 'P4 — Monitor';
  quantumExposure: RiskLevel;
  businessCriticality: 'Critical' | 'High' | 'Medium' | 'Low';
  dataSensitivity: string;
  externalExposure: string;
  dependencies: number;
  migrationComplexity: 'High' | 'Medium' | 'Low';
  factors: RiskFactorBreakdown[];
  riskExplanation: string;
  primaryAlgorithm: string;
  hndlVulnerable?: boolean;
}

export interface MigrationConflictDetail {
  id: string;
  title: string;
  affectedAsset: string;
  affectedDependency: string;
  severity: 'Critical' | 'High' | 'Medium';
  reason: string;
  investigationAction: string;
}

export interface ImpactScenario {
  id: string;
  title: string;
  description: string;
  targetEntity: string;
  dnaId?: string;
  affectedArtefactsCount: number;
  affectedAppsCount: number;
  affectedServicesCount: number;
  affectedApisCount: number;
  criticalFunctionsCount: number;
  migrationConflictsCount: number;
  conflicts?: MigrationConflictDetail[];
  affectedNodeIds: string[];
  businessImpacts: string[];
  technicalImpacts: string[];
  securityImpacts?: string[];
  migrationImpacts?: string[];
  recommendedAction: string;
  candidateApproach: string;
}

export interface MigrationRoadmapItem {
  id: string;
  dnaId?: string;
  asset: string;
  currentCrypto: string;
  purpose: string;
  risk: RiskLevel;
  dependencies: number;
  migrationComplexity: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
  candidatePqc: string;
  hybridArchitecture?: string;
  status: 'P1 — Immediate Planning' | 'P2 — High Priority' | 'P3 — Planned' | 'P4 — Monitor';
  currentPhase: 'Discovery' | 'Classification' | 'Prioritization' | 'Pilot' | 'Migration' | 'Validation' | 'Monitoring';
  targetHorizon: string;
  owner: string;
}

export interface UnknownCryptoItem {
  id: string;
  dnaId?: string;
  symbol: string;
  location: string;
  detectionConfidence: number;
  staticAnalysisEvidence: string;
  patternEvidence: string[];
  potentialPurpose: string;
  relatedApplication: string;
  reviewPriority: 'Critical' | 'High' | 'Medium';
  status: 'Requires Security Review' | 'Under Cryptanalysis' | 'Marked as Audited';
  detectedDate: string;
  recommendedAction?: string;
}

export interface DiscoveryScanState {
  isScanning: boolean;
  progress: number;
  currentPhase: string;
  assetsScanned: number;
  filesAnalyzed: string;
  cryptoArtefactsFound: number;
  unknownFound: number;
  logs: string[];
}

export interface EvidenceLedgerRecord {
  recordNumber: string; // e.g. #004382
  timestamp: string;
  dnaId: string;
  assetName: string;
  findingId: string;
  symbol?: string;
  sourcePath: string;
  evidenceHash: string;
  previousHash: string;
  cryptographicSignature: string;
  status: 'VERIFIED' | 'FLAGGED';
  summary: string;
}

export interface CryptographicPolicy {
  id: string;
  name: string;
  framework: 'NIST SP 800-131A' | 'CNSA 2.0' | 'FIPS 140-3' | 'PCI-DSS 4.0';
  description: string;
  status: 'Enforced' | 'Transition Phase' | 'Warning';
  violationsCount: number;
}

export interface PolicyViolation {
  id: string;
  policyId: string;
  policyName: string;
  dnaId: string;
  asset: string;
  algorithm: string;
  severity: 'Critical' | 'High' | 'Medium';
  violationReason: string;
  remediationTimeline: string;
  owner: string;
}

export interface PostureTimelinePoint {
  scanId: string;
  label: string;
  date: string;
  totalArtefacts: number;
  criticalRisk: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  unclassified: number;
  migrationReadiness: number;
}
