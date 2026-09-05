import { 
  CryptoArtefact, 
  DependencyNode, 
  DependencyLink, 
  AssetRiskProfile, 
  ImpactScenario, 
  MigrationRoadmapItem, 
  UnknownCryptoItem,
  EvidenceLedgerRecord,
  CryptographicPolicy,
  PolicyViolation,
  PostureTimelinePoint,
  MigrationConflictDetail,
  MigrationReadinessFactor,
  AttackSurfaceNode
} from '../types';

export const SYNTHETIC_ENV_DISCLAIMER = "SIMULATION ENVIRONMENT — ALL DATA IS SYNTHETIC";
export const DEMO_ORGANIZATION = "Demo Government Enterprise";

export const ARTEFACTS_CATALOG: CryptoArtefact[] = [
  {
    id: 'art-001',
    dnaId: 'ECDAT-CRYPTO-004382',
    name: 'RSA-2048 (Authentication Service)',
    algorithm: 'RSA-2048',
    cryptoType: 'Asymmetric',
    purpose: 'Digital Signature / Authentication',
    location: 'auth-service/src/security/signer.go:L114',
    application: 'Authentication Service',
    service: 'Authentication API Service',
    library: 'OpenSSL',
    libraryVersion: '1.1.1u',
    keySize: '2048-bit',
    protocol: 'OIDC / SAML 2.0 / TLS 1.2',
    certificate: 'AUTH-GOV-ROOT-023',
    confidence: 96,
    confidenceBreakdown: {
      overallScore: 96,
      staticAnalysis: 98,
      runtimeTelemetry: 95,
      configAnalysis: 96,
      certInspection: 97,
      notes: 'Confirmed via OpenSSL EVP_DigestSignInit hooking and X.509 ASN.1 certificate parse.'
    },
    provenance: {
      sourceFile: 'auth-service/src/security/signer.go',
      line: 114,
      component: 'OpenSSL 1.1.1u Crypto Engine',
      detectionMethod: 'Static AST Pattern',
      discoveredTimestamp: '2026-09-05 13:48:12 UTC',
      evidenceHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      ledgerRecordId: 'REC-004382'
    },
    risk: 'Critical',
    quantumStatus: 'Quantum-Vulnerable',
    hndlExposure: true,
    hndlExplanation: 'SAML assertions and identity tokens signed today can be recorded by adversaries; quantum forgery allows retrospective token replay against historical audit trails.',
    businessCriticality: 'Critical',
    dataSensitivity: 'Sensitive PII',
    externalExposure: 'Internet-Facing',
    dependenciesCount: 18,
    lastSeen: '12 minutes ago',
    applicationsAffected: 7,
    servicesImpacted: 12,
    apisAffected: 3,
    criticalBusinessFunctions: 2,
    quantumExposure: 'HIGH',
    compositeRisk: 92,
    migrationPriority: 'P1 — Immediate Planning',
    factorScores: [
      {
        name: 'Quantum Vulnerability',
        score: 23,
        maxScore: 25,
        contribution: '23 / 25',
        explanation: 'Integer factorization solvable in polynomial time under Shor\'s algorithm on cryptographically relevant quantum computer.',
        evidence: 'Shor algorithm integer factoring cost: O((log N)^3) on quantum hardware.'
      },
      {
        name: 'Business Criticality',
        score: 20,
        maxScore: 20,
        contribution: '20 / 20',
        explanation: 'Authentication Service is root identity provider for citizen portals and administrative services.',
        evidence: 'Active auth gateway for Citizen Services Portal and Payment Gateway.'
      },
      {
        name: 'Data Sensitivity',
        score: 18,
        maxScore: 20,
        contribution: '18 / 20',
        explanation: 'Signs citizen authentication assertions, identity claims, and admin credentials.',
        evidence: 'Payloads contain Citizen Identity Number, Biometric Hashes, and OAuth scopes.'
      },
      {
        name: 'External Exposure',
        score: 13,
        maxScore: 15,
        contribution: '13 / 15',
        explanation: 'Internet-facing OAuth/OIDC endpoints accessible to public citizen sessions.',
        evidence: 'Exposed via public API endpoint /v2/oauth/authorize on 0.0.0.0/0 ingress.'
      },
      {
        name: 'Dependency Complexity',
        score: 8,
        maxScore: 10,
        contribution: '8 / 10',
        explanation: '7 applications, 12 services, and 3 exposed APIs validate tokens signed by this key.',
        evidence: 'Validated in 24 distinct downstream relying microservice pods.'
      },
      {
        name: 'Migration Complexity',
        score: 6,
        maxScore: 10,
        contribution: '6 / 10',
        explanation: 'Requires dual-signature support during multi-year transition to avoid breaking legacy relying parties.',
        evidence: '4 partner banking APIs only accept classical PKCS#1 v1.5 RSA.'
      },
      {
        name: 'Cryptographic Strength',
        score: 4,
        maxScore: 10,
        contribution: '4 / 10',
        explanation: '2048-bit modulus provides only 112 bits of classical security, below CNSA 2.0 standards.',
        evidence: 'NIST SP 800-131A restricts 112-bit security algorithms for government operations post-2030.'
      }
    ],
    riskExplanation: 'Payment Gateway / Authentication Service was designated P1 — Immediate Planning because it pairs maximum business criticality (20/20) and public internet exposure (13/15) with quantum-vulnerable RSA-2048 key exchange. Its 18 downstream dependencies mean any cryptographic failure causes widespread financial service cascades.',
    candidatePqcApproach: {
      mechanism: 'ML-DSA (FIPS 204) with Dual-Signature Bridge',
      rationale: 'Detected usage is digital signatures for OAuth/OIDC assertions. ML-DSA-65 provides post-quantum signature verification with acceptable verification latency for public web traffic.',
      nistStandard: 'FIPS 204 (Module-Lattice-Based Digital Signature Standard)',
      caveat: 'Candidate migration approach — requires dual-signature wrapper during transition so that legacy relying applications do not fail authentication assertions.'
    }
  },
  {
    id: 'art-002',
    dnaId: 'ECDAT-CRYPTO-003819',
    name: 'RSA-2048 (Payment Key Exchange)',
    algorithm: 'RSA-2048',
    cryptoType: 'Asymmetric',
    purpose: 'Key Establishment / Exchange',
    location: 'payment-gateway/services/crypto/transport_vault.c:L210',
    application: 'Payment Gateway',
    service: 'Payment Transaction Engine',
    library: 'BouncyCastle',
    libraryVersion: '1.68',
    keySize: '2048-bit',
    protocol: 'JWE / PKCS#1 v1.5',
    certificate: 'PAY-FINANCE-CERT-01',
    confidence: 94,
    confidenceBreakdown: {
      overallScore: 94,
      staticAnalysis: 96,
      runtimeTelemetry: 92,
      configAnalysis: 94,
      certInspection: 95,
      notes: 'Detected via BouncyCastle KeyAgreement wrapper and JWE header inspection.'
    },
    provenance: {
      sourceFile: 'payment-gateway/services/crypto/transport_vault.c',
      line: 210,
      component: 'BouncyCastle JCE Provider',
      detectionMethod: 'Runtime Telemetry Hook',
      discoveredTimestamp: '2026-09-05 13:12:04 UTC',
      evidenceHash: 'sha256:4d83e2910c2834bfa9102488bcfa0012891d4e5f6120384758129348123abc45',
      ledgerRecordId: 'REC-003819'
    },
    risk: 'Critical',
    quantumStatus: 'Quantum-Vulnerable',
    hndlExposure: true,
    hndlExplanation: 'Harvest-Now-Decrypt-Later high threat: Financial transaction payloads captured on wire can be stored and decrypted once CRQC is available.',
    businessCriticality: 'Critical',
    dataSensitivity: 'Restricted / Classified',
    externalExposure: 'Internet-Facing',
    dependenciesCount: 14,
    lastSeen: '25 minutes ago',
    applicationsAffected: 5,
    servicesImpacted: 8,
    apisAffected: 2,
    criticalBusinessFunctions: 2,
    quantumExposure: 'HIGH',
    compositeRisk: 90,
    migrationPriority: 'P1 — Immediate Planning',
    factorScores: [
      { name: 'Quantum Vulnerability', score: 23, maxScore: 25, contribution: '23 / 25', explanation: 'Shor algorithm integer factoring vulnerability on transport envelope.' },
      { name: 'Business Criticality', score: 20, maxScore: 20, contribution: '20 / 20', explanation: 'National Treasury clearing and direct debit settlement operations.' },
      { name: 'Data Sensitivity', score: 18, maxScore: 20, contribution: '18 / 20', explanation: 'Cardholder PCI-DSS data and bank account routing authorizations.' },
      { name: 'External Exposure', score: 13, maxScore: 15, contribution: '13 / 15', explanation: 'Public banking partner API gateway connections.' },
      { name: 'Dependency Complexity', score: 7, maxScore: 10, contribution: '7 / 10', explanation: '8 services depend on transaction envelope encryption.' },
      { name: 'Migration Complexity', score: 5, maxScore: 10, contribution: '5 / 10', explanation: 'Partner banks require scheduled key ceremony cutovers.' },
      { name: 'Cryptographic Strength', score: 4, maxScore: 10, contribution: '4 / 10', explanation: 'Legacy BouncyCastle 1.68 lacks post-quantum KEM support.' }
    ],
    riskExplanation: 'High quantum vulnerability on encrypted financial payloads with persistent multi-year archival confidentiality sensitivity.',
    candidatePqcApproach: {
      mechanism: 'ML-KEM (FIPS 203) / Kyber-768',
      rationale: 'Detected usage is Key Encapsulation / Transport. ML-KEM-768 provides IND-CCA2 security against quantum key recovery.',
      nistStandard: 'FIPS 203 (Module-Lattice-Based Key-Encapsulation Mechanism)',
      caveat: 'Candidate migration approach — requires coordinated key ceremony with 4 commercial banking partner APIs.'
    }
  },
  {
    id: 'art-003',
    dnaId: 'ECDAT-CRYPTO-002910',
    name: 'ECDSA P-256 (Session Token Signer)',
    algorithm: 'ECDSA P-256',
    cryptoType: 'Asymmetric',
    purpose: 'Digital Signature / Authentication',
    location: 'citizen-portal/middleware/auth_jwt.ts:L44',
    application: 'Citizen Services Portal',
    service: 'Session Token Authority',
    library: 'Node WebCrypto',
    libraryVersion: '20.11.0',
    keySize: '256-bit curve',
    protocol: 'ES256 / JWT',
    certificate: 'CITIZEN-WEB-CERT-44',
    confidence: 92,
    confidenceBreakdown: {
      overallScore: 92,
      staticAnalysis: 95,
      runtimeTelemetry: 90,
      configAnalysis: 90,
      certInspection: 93,
      notes: 'Static TypeScript AST import of subtle.crypto and runtime JWT header analysis.'
    },
    provenance: {
      sourceFile: 'citizen-portal/middleware/auth_jwt.ts',
      line: 44,
      component: 'Node.js WebCrypto Subsystem',
      detectionMethod: 'Static AST Pattern',
      discoveredTimestamp: '2026-09-05 12:40:10 UTC',
      evidenceHash: 'sha256:889123fa456bcde0192837465abcde12345678901234567890abcdef12345678',
      ledgerRecordId: 'REC-002910'
    },
    risk: 'High',
    quantumStatus: 'Quantum-Vulnerable',
    hndlExposure: false,
    hndlExplanation: 'Ephemeral session tokens have short 15-minute lifespan; lower HNDL threat but high quantum forgery vulnerability.',
    businessCriticality: 'High',
    dataSensitivity: 'Sensitive PII',
    externalExposure: 'Internet-Facing',
    dependenciesCount: 9,
    lastSeen: '1 hour ago',
    applicationsAffected: 4,
    servicesImpacted: 6,
    apisAffected: 2,
    criticalBusinessFunctions: 1,
    quantumExposure: 'HIGH',
    compositeRisk: 78,
    migrationPriority: 'P2 — High Priority',
    factorScores: [
      { name: 'Quantum Vulnerability', score: 23, maxScore: 25, contribution: '23 / 25', explanation: 'Elliptic Curve Discrete Logarithm Problem solvable by Shor on CRQC.' },
      { name: 'Business Criticality', score: 16, maxScore: 20, contribution: '16 / 20', explanation: 'Citizen Services Portal interactive sessions.' },
      { name: 'Data Sensitivity', score: 16, maxScore: 20, contribution: '16 / 20', explanation: 'User profiles and public service request state.' },
      { name: 'External Exposure', score: 14, maxScore: 15, contribution: '14 / 15', explanation: 'Public citizen ingress.' },
      { name: 'Dependency Complexity', score: 5, maxScore: 10, contribution: '5 / 10', explanation: 'Consumed by 6 portal frontend pods.' },
      { name: 'Migration Complexity', score: 2, maxScore: 10, contribution: '2 / 10', explanation: 'Node.js 22+ supports WASM PQC polyfills.' },
      { name: 'Cryptographic Strength', score: 2, maxScore: 10, contribution: '2 / 10', explanation: '128-bit classical security breaks rapidly under quantum attack.' }
    ],
    riskExplanation: 'P2 ranking reflecting short token lifetimes but high volume public internet exposure.',
    candidatePqcApproach: {
      mechanism: 'ML-DSA-44 or SLH-DSA-128f (FIPS 204 / FIPS 205)',
      rationale: 'Fast verification speeds suitable for high-throughput citizen session traffic.',
      nistStandard: 'FIPS 204',
      caveat: 'Candidate migration approach — browser WebCrypto requires WASM polyfills until native support.'
    }
  },
  {
    id: 'art-004',
    dnaId: 'ECDAT-CRYPTO-001850',
    name: 'TLS 1.2 (Static Ingress Cipher)',
    algorithm: 'TLS 1.2',
    cryptoType: 'Protocol',
    purpose: 'Transport Security (TLS)',
    location: 'infra/k8s/ingress-nginx-conf.d/ssl.conf:L22',
    application: 'API Gateway',
    service: 'Edge Reverse Proxy',
    library: 'OpenSSL',
    libraryVersion: '1.1.1k',
    protocol: 'TLS 1.2 (ECDHE-RSA-AES256-GCM-SHA384)',
    certificate: 'DEMO-GOV-WILDCARD-2025',
    confidence: 100,
    confidenceBreakdown: {
      overallScore: 100,
      staticAnalysis: 100,
      runtimeTelemetry: 100,
      configAnalysis: 100,
      certInspection: 100,
      notes: 'Active port 443 TLS handshake probing + NGINX configuration parser.'
    },
    provenance: {
      sourceFile: 'infra/k8s/ingress-nginx-conf.d/ssl.conf',
      line: 22,
      component: 'NGINX Ingress Controller',
      detectionMethod: 'Config Parser',
      discoveredTimestamp: '2026-09-05 11:30:00 UTC',
      evidenceHash: 'sha256:11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
      ledgerRecordId: 'REC-001850'
    },
    risk: 'High',
    quantumStatus: 'Quantum-Vulnerable',
    hndlExposure: true,
    hndlExplanation: 'Inbound encrypted TLS connections can be harvested by state-level adversaries and decrypted later.',
    businessCriticality: 'Critical',
    dataSensitivity: 'Restricted / Classified',
    externalExposure: 'Internet-Facing',
    dependenciesCount: 22,
    lastSeen: '5 minutes ago',
    applicationsAffected: 6,
    servicesImpacted: 10,
    apisAffected: 4,
    criticalBusinessFunctions: 2,
    quantumExposure: 'HIGH',
    compositeRisk: 74,
    migrationPriority: 'P2 — High Priority',
    factorScores: [
      { name: 'Quantum Vulnerability', score: 19, maxScore: 25, contribution: '19 / 25', explanation: 'Classical DHE/ECDHE key negotiation susceptible to HNDL.' },
      { name: 'Business Criticality', score: 16, maxScore: 20, contribution: '16 / 20', explanation: 'Public gateway ingress routing for all government services.' },
      { name: 'Data Sensitivity', score: 14, maxScore: 20, contribution: '14 / 20', explanation: 'All encrypted payload data in transit.' },
      { name: 'External Exposure', score: 14, maxScore: 15, contribution: '14 / 15', explanation: 'Perimeter ingress on public IP ranges.' },
      { name: 'Dependency Complexity', score: 6, maxScore: 10, contribution: '6 / 10', explanation: 'Terminates connections for 22 microservices.' },
      { name: 'Migration Complexity', score: 3, maxScore: 10, contribution: '3 / 10', explanation: 'Can be updated via NGINX/Envoy ingress config.' },
      { name: 'Cryptographic Strength', score: 2, maxScore: 10, contribution: '2 / 10', explanation: 'Permits classical RSA key exchange fallbacks.' }
    ],
    riskExplanation: 'High exposure perimeter protocol; easily upgradable to TLS 1.3 hybrid groups.',
    candidatePqcApproach: {
      mechanism: 'Upgrade to TLS 1.3 with X25519MLKEM768 Hybrid Key Exchange',
      rationale: 'Maintains backward compatibility for legacy clients while establishing quantum resistance for modern clients.',
      nistStandard: 'RFC 8446 + FIPS 203 Hybrid draft',
      caveat: 'Candidate migration approach — test legacy client fallback timeouts.'
    }
  },
  {
    id: 'art-005',
    dnaId: 'ECDAT-CRYPTO-000412',
    name: 'AES-256-GCM (Database Envelope Key)',
    algorithm: 'AES-256',
    cryptoType: 'Symmetric',
    purpose: 'Data Encryption (Symmetric)',
    location: 'document-mgmt/services/storage/vault_kms.java:L204',
    application: 'Document Management System',
    service: 'Document Storage & Archive Service',
    library: 'BouncyCastle',
    libraryVersion: '1.72',
    keySize: '256-bit',
    protocol: 'KMS Envelope Encryption',
    certificate: 'KMS-STORE-KEY-08',
    confidence: 97,
    provenance: {
      sourceFile: 'document-mgmt/services/storage/vault_kms.java',
      line: 204,
      component: 'Cloud KMS Client',
      detectionMethod: 'Static AST Pattern',
      discoveredTimestamp: '2026-09-05 10:15:00 UTC',
      evidenceHash: 'sha256:99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa',
      ledgerRecordId: 'REC-000412'
    },
    risk: 'Low',
    quantumStatus: 'Quantum-Resistant',
    hndlExposure: false,
    businessCriticality: 'High',
    dataSensitivity: 'Restricted / Classified',
    externalExposure: 'Internal Network Only',
    dependenciesCount: 6,
    lastSeen: '40 minutes ago',
    quantumExposure: 'LOW',
    compositeRisk: 18,
    migrationPriority: 'P4 — Monitor',
    riskExplanation: 'Grover algorithm reduces 256-bit AES brute-force to ~128 bits post-quantum security margin, conforming to CNSA 2.0 requirements.',
    candidatePqcApproach: {
      mechanism: 'Retain AES-256-GCM; Upgrade Master Key Wrapping to ML-KEM',
      rationale: 'AES-256 payload encryption remains quantum safe. Attention should focus on the master key wrapping mechanism.',
      nistStandard: 'NIST SP 800-38D / FIPS 197',
      caveat: 'Ensure periodic automated key rotation.'
    }
  },
  {
    id: 'art-006',
    dnaId: 'ECDAT-CRYPTO-000105',
    name: 'SHA-256 (Audit Log Merkle Trees)',
    algorithm: 'SHA-256',
    cryptoType: 'Hash',
    purpose: 'Integrity / Hashing',
    location: 'procurement-portal/audit/merkle_proof.rs:L65',
    application: 'Procurement Portal',
    service: 'Tender Integrity & Audit Service',
    library: 'RustCrypto / sha2',
    libraryVersion: '0.10.8',
    keySize: '256-bit output',
    protocol: 'Immutable Audit Trail',
    confidence: 100,
    provenance: {
      sourceFile: 'procurement-portal/audit/merkle_proof.rs',
      line: 65,
      component: 'RustCrypto Engine',
      detectionMethod: 'Static AST Pattern',
      discoveredTimestamp: '2026-09-05 09:50:00 UTC',
      evidenceHash: 'sha256:aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899',
      ledgerRecordId: 'REC-000105'
    },
    risk: 'Low',
    quantumStatus: 'Quantum-Resistant',
    hndlExposure: false,
    businessCriticality: 'Medium',
    dataSensitivity: 'Confidential',
    externalExposure: 'Partner API Ingress',
    dependenciesCount: 4,
    lastSeen: '15 minutes ago',
    quantumExposure: 'LOW',
    compositeRisk: 12,
    migrationPriority: 'P4 — Monitor',
    riskExplanation: 'Pre-image resistance remains bounded against known quantum attacks.',
    candidatePqcApproach: {
      mechanism: 'Maintain SHA-256; Optionally upgrade to SHA-384 for 50-year archive retention',
      rationale: 'Meets CNSA 2.0 requirements for symmetric integrity.',
      nistStandard: 'FIPS 180-4',
      caveat: 'Upgrade digital notary signature sealing roots to FIPS 204.'
    }
  }
];

export const UNKNOWN_CRYPTO_CATALOG: UnknownCryptoItem[] = [
  {
    id: 'unk-001',
    dnaId: 'ECDAT-UNK-0001',
    symbol: 'CustomCryptoHandler',
    location: 'legacy-erp/src/native/security/CustomCryptoHandler.cpp:L142',
    detectionConfidence: 87,
    staticAnalysisEvidence: 'Non-standard S-box substitution matrix (256-byte array) paired with recursive XOR bit-shifts and custom round permutation loops.',
    patternEvidence: [
      'Byte-level bitwise rotation functions matching Feistel structure',
      'Hardcoded 128-bit round constants without IV entropy generation',
      'Direct memory pointer manipulation bypassing standard cryptographic providers'
    ],
    potentialPurpose: 'Possible custom proprietary block cipher or legacy obfuscation wrapper created before enterprise standards.',
    relatedApplication: 'Legacy ERP',
    reviewPriority: 'Critical',
    status: 'Requires Security Review',
    detectedDate: '2026-09-02',
    recommendedAction: 'Reverse-engineer primitive and replace with standard AES-256-GCM / FIPS 140-3 validated provider.'
  },
  {
    id: 'unk-002',
    dnaId: 'ECDAT-UNK-0002',
    symbol: 'LegacySigningModule',
    location: 'document-mgmt/services/legacy/LegacySigningModule.java:L88',
    detectionConfidence: 91,
    staticAnalysisEvidence: 'Implementation instantiates custom BigInteger modular arithmetic loops instead of standard JCA/JCE SignatureSPI provider.',
    patternEvidence: [
      'Manual Montgomery reduction implementation in Java code',
      'Non-constant-time modular exponentiation susceptible to side-channel timing analysis',
      'Bypasses FIPS 140-2 crypto boundary controls'
    ],
    potentialPurpose: 'Legacy custom digital signature implementation for historical document validation.',
    relatedApplication: 'Document Management System',
    reviewPriority: 'Critical',
    status: 'Requires Security Review',
    detectedDate: '2026-09-04',
    recommendedAction: 'Replace custom BigInteger signing logic with verified BouncyCastle or SunJCE provider.'
  },
  {
    id: 'unk-003',
    dnaId: 'ECDAT-UNK-0003',
    symbol: 'UnknownKeyWrapper',
    location: 'payment-gateway/native/sec/UnknownKeyWrapper.c:L415',
    detectionConfidence: 83,
    staticAnalysisEvidence: 'High Shannon entropy blocks detected in static binaries coupled with proprietary padding schemes (non-PKCS#7).',
    patternEvidence: [
      'Entropy score 7.94 / 8.0 indicative of encrypted payload or compressed key table',
      'Custom zero-fill padding function inconsistent with standard RFC 5652 CMS wrappers',
      'Calls inline assembly instructions for byte-swapping'
    ],
    potentialPurpose: 'Proprietary hardware security module (HSM) host bridge wrapper or legacy POS pin-block key unwrap.',
    relatedApplication: 'Payment Gateway',
    reviewPriority: 'High',
    status: 'Requires Security Review',
    detectedDate: '2026-09-01',
    recommendedAction: 'Audit HSM vendor driver firmware and re-wrap under PKCS#11 compliant standards.'
  },
  {
    id: 'unk-004',
    dnaId: 'ECDAT-UNK-0004',
    symbol: 'ProprietaryHashV2',
    location: 'citizen-portal/services/cache/ProprietaryHashV2.go:L29',
    detectionConfidence: 79,
    staticAnalysisEvidence: 'Custom 64-bit hash accumulator loop mixing prime multiples (0x9e3779b97f4a7c15) without cryptographic avalanche verification.',
    patternEvidence: [
      'Murmur/CityHash derivative used in security-sensitive session deduplication token generation',
      'Lacks cryptographic collision resistance proof'
    ],
    potentialPurpose: 'Fast in-memory cache indexing mistakenly used for sensitive session token generation.',
    relatedApplication: 'Citizen Services Portal',
    reviewPriority: 'Medium',
    status: 'Requires Security Review',
    detectedDate: '2026-09-03',
    recommendedAction: 'Restrict to non-cryptographic hash tables; use HMAC-SHA256 for session token derivation.'
  }
];

export const ASSET_RISK_PROFILES: AssetRiskProfile[] = [
  {
    assetId: 'asset-payment-gateway',
    dnaId: 'ECDAT-CRYPTO-003819',
    assetName: 'Payment Gateway',
    compositeScore: 92,
    priorityTier: 'P1 — Immediate Planning',
    quantumExposure: 'Critical',
    businessCriticality: 'Critical',
    dataSensitivity: 'Restricted / Classified',
    externalExposure: 'Internet-Facing',
    dependencies: 18,
    migrationComplexity: 'High',
    primaryAlgorithm: 'RSA-2048',
    hndlVulnerable: true,
    factors: [
      {
        name: 'Quantum Vulnerability',
        score: 23,
        maxScore: 25,
        contribution: '23 / 25',
        explanation: 'Relies on 2048-bit RSA for transaction envelope exchange; highly vulnerable to Harvest Now Decrypt Later adversary captures.'
      },
      {
        name: 'Business Criticality',
        score: 20,
        maxScore: 20,
        contribution: '20 / 20',
        explanation: 'Processes mission-critical national payment transactions; outage results in immediate financial clearing halt.'
      },
      {
        name: 'Data Sensitivity',
        score: 18,
        maxScore: 20,
        contribution: '18 / 20',
        explanation: 'Handles PCI-DSS cardholder data, bank routing secrets, and confidential treasury settlement authorizations.'
      },
      {
        name: 'External Exposure',
        score: 13,
        maxScore: 15,
        contribution: '13 / 15',
        explanation: 'Internet-facing endpoints with public merchant ingress and external banking API integrations.'
      },
      {
        name: 'Dependency Complexity',
        score: 8,
        maxScore: 10,
        contribution: '8 / 10',
        explanation: '18 interconnected microservices and 4 commercial banking partner APIs depend on these cryptographic handshakes.'
      },
      {
        name: 'Migration Complexity',
        score: 6,
        maxScore: 10,
        contribution: '6 / 10',
        explanation: 'Requires coordinated firmware and driver upgrades across distributed HSM clusters and BouncyCastle libraries.'
      },
      {
        name: 'Cryptographic Strength',
        score: 4,
        maxScore: 10,
        contribution: '4 / 10',
        explanation: 'Deprecated RSA-2048 provides only 112 bits of classical security, falling below current CNSA 2.0 recommendations.'
      }
    ],
    riskExplanation: 'Payment Gateway / Authentication Service was designated P1 — Immediate Planning because it pairs maximum business criticality (20/20) and public internet exposure (13/15) with quantum-vulnerable RSA-2048 key exchange. Its 18 downstream dependencies mean any cryptographic failure causes widespread financial service cascades.'
  },
  {
    assetId: 'asset-identity-service',
    dnaId: 'ECDAT-CRYPTO-004382',
    assetName: 'Identity Management Service',
    compositeScore: 89,
    priorityTier: 'P1 — Immediate Planning',
    quantumExposure: 'Critical',
    businessCriticality: 'Critical',
    dataSensitivity: 'Sensitive PII',
    externalExposure: 'Internet-Facing',
    dependencies: 24,
    migrationComplexity: 'High',
    primaryAlgorithm: 'RSA-2048',
    hndlVulnerable: true,
    factors: [
      { name: 'Quantum Vulnerability', score: 22, maxScore: 25, contribution: '22 / 25', explanation: 'Authentication assertions signed with RSA-2048 forgeable on CRQC.' },
      { name: 'Business Criticality', score: 20, maxScore: 20, contribution: '20 / 20', explanation: 'Root source of citizen identity truth.' },
      { name: 'Data Sensitivity', score: 17, maxScore: 20, contribution: '17 / 20', explanation: 'Citizen biometric hashes and credentials.' },
      { name: 'External Exposure', score: 12, maxScore: 15, contribution: '12 / 15', explanation: 'Public SSO endpoints.' },
      { name: 'Dependency Complexity', score: 9, maxScore: 10, contribution: '9 / 10', explanation: '24 downstream services validate user claims.' },
      { name: 'Migration Complexity', score: 5, maxScore: 10, contribution: '5 / 10', explanation: 'Requires dual-signature support during client upgrades.' },
      { name: 'Cryptographic Strength', score: 4, maxScore: 10, contribution: '4 / 10', explanation: 'OpenSSL 1.1.1u lacks native FIPS 204 bindings.' }
    ],
    riskExplanation: 'Designated P1 due to high dependency blast radius (24 services) and root authentication authority.'
  },
  {
    assetId: 'asset-citizen-portal',
    dnaId: 'ECDAT-CRYPTO-002910',
    assetName: 'Citizen Services Portal',
    compositeScore: 78,
    priorityTier: 'P2 — High Priority',
    quantumExposure: 'High',
    businessCriticality: 'High',
    dataSensitivity: 'Sensitive PII',
    externalExposure: 'Internet-Facing',
    dependencies: 12,
    migrationComplexity: 'Medium',
    primaryAlgorithm: 'ECDSA P-256',
    factors: [
      { name: 'Quantum Vulnerability', score: 21, maxScore: 25, contribution: '21 / 25', explanation: 'Shor ECDLP vulnerability on session tokens.' },
      { name: 'Business Criticality', score: 18, maxScore: 20, contribution: '18 / 20', explanation: 'Public citizen interaction portal.' },
      { name: 'Data Sensitivity', score: 15, maxScore: 20, contribution: '15 / 20', explanation: 'Citizen profile data in transit.' },
      { name: 'External Exposure', score: 14, maxScore: 15, contribution: '14 / 15', explanation: 'Public internet access.' },
      { name: 'Dependency Complexity', score: 5, maxScore: 10, contribution: '5 / 10', explanation: '12 internal portal microservices.' },
      { name: 'Migration Complexity', score: 3, maxScore: 10, contribution: '3 / 10', explanation: 'Can leverage Node.js runtime polyfills.' },
      { name: 'Cryptographic Strength', score: 2, maxScore: 10, contribution: '2 / 10', explanation: 'Vulnerable to Shor with ~1,500 physical qubits.' }
    ],
    riskExplanation: 'High volume public citizen exposure balancing out short token lifespans.'
  }
];

export const DEPENDENCY_GRAPH_NODES: DependencyNode[] = [
  // Layer 1: Business Functions
  { id: 'biz-01', label: 'National Citizen Authentication', type: 'business', criticality: 'Critical', y: 35, x: 200, description: 'Core citizen digital identity verification function across all government web services.' },
  { id: 'biz-02', label: 'Treasury & Revenue Settlement', type: 'business', criticality: 'Critical', y: 35, x: 650, description: 'Direct clearing and inter-bank payment settlement business function.' },
  { id: 'biz-03', label: 'Public Procurement & Tendering', type: 'business', criticality: 'High', y: 35, x: 1050, description: 'Public procurement tender submission and notary timestamping function.' },

  // Layer 2: Applications
  { id: 'app-citizen', label: 'Citizen Services Portal', type: 'application', criticality: 'High', y: 130, x: 140, description: 'Public citizen web and mobile application.' },
  { id: 'app-auth', label: 'Authentication Service', type: 'application', criticality: 'Critical', dnaId: 'ECDAT-CRYPTO-004382', y: 130, x: 420, description: 'Single sign-on and token issuance application.' },
  { id: 'app-payment', label: 'Payment Gateway', type: 'application', criticality: 'Critical', dnaId: 'ECDAT-CRYPTO-003819', y: 130, x: 700, description: 'Financial clearing and transaction processing application.' },
  { id: 'app-doc', label: 'Document Mgmt System', type: 'application', criticality: 'High', y: 130, x: 950, description: 'Secure document archival and retrieval application.' },
  { id: 'app-procure', label: 'Procurement Portal', type: 'application', criticality: 'High', y: 130, x: 1150, description: 'State tendering and contractor bidding system.' },

  // Layer 3: Services
  { id: 'srv-token', label: 'Token Authority', type: 'service', criticality: 'Critical', y: 230, x: 260, description: 'Issues cryptographically signed JWT and SAML assertions.' },
  { id: 'srv-sso', label: 'SSO Engine', type: 'service', criticality: 'Critical', y: 230, x: 480, description: 'Federated identity broker implementing OpenID Connect.' },
  { id: 'srv-pay-settle', label: 'Settlement Service', type: 'service', criticality: 'Critical', y: 230, x: 740, description: 'Inter-agency treasury transaction clearing service.' },
  { id: 'srv-doc-vault', label: 'Vault Storage', type: 'service', criticality: 'High', y: 230, x: 980, description: 'Encrypted document store using KMS envelope keying.' },
  { id: 'srv-audit', label: 'Audit Trail Engine', type: 'service', criticality: 'Medium', y: 230, x: 1180, description: 'Immutable transaction logging service.' },

  // Layer 4: APIs
  { id: 'api-oauth', label: '/v2/oauth/authorize', type: 'api', criticality: 'Critical', y: 330, x: 300, description: 'Public ingress endpoint for citizen authentication requests.' },
  { id: 'api-checkout', label: '/v1/payments/process', type: 'api', criticality: 'Critical', y: 330, x: 600, description: 'Ingress API endpoint for merchant and treasury payment clearing.' },
  { id: 'api-gateway-edge', label: 'Edge Reverse Proxy', type: 'api', criticality: 'High', y: 330, x: 880, description: 'Perimeter TLS termination and traffic routing edge.' },
  { id: 'api-doc-store', label: '/api/docs/archive', type: 'api', criticality: 'Medium', y: 330, x: 1120, description: 'Internal document submission API.' },

  // Layer 5: Cryptographic Libraries
  { id: 'lib-openssl', label: 'OpenSSL 1.1.1u (Deprecated)', type: 'library', criticality: 'Critical', y: 430, x: 340, description: 'Legacy C library used for RSA key generation and digital signing.' },
  { id: 'lib-bouncycastle', label: 'BouncyCastle 1.68', type: 'library', criticality: 'High', y: 430, x: 650, description: 'Java cryptography provider for transport encryption.' },
  { id: 'lib-webcrypto', label: 'Node WebCrypto 20.x', type: 'library', criticality: 'Medium', y: 430, x: 920, description: 'JavaScript standard runtime crypto engine.' },
  { id: 'lib-rustcrypto', label: 'RustCrypto sha2', type: 'library', criticality: 'Low', y: 430, x: 1150, description: 'Native Rust hashing and Merkle tree engine.' },

  // Layer 6: Cryptographic Algorithms
  { id: 'algo-rsa2048', label: 'RSA-2048 (Focus Asset)', type: 'algorithm', criticality: 'Critical', dnaId: 'ECDAT-CRYPTO-004382', quantumVulnerable: true, y: 530, x: 420, description: '2048-bit RSA algorithm. Solvable in polynomial time via Shor on CRQC.' },
  { id: 'algo-ecdsa256', label: 'ECDSA P-256', type: 'algorithm', criticality: 'High', quantumVulnerable: true, y: 530, x: 720, description: 'Elliptic curve digital signature algorithm using secp256r1.' },
  { id: 'algo-tls12', label: 'TLS 1.2 Handshake', type: 'algorithm', criticality: 'High', quantumVulnerable: true, y: 530, x: 920, description: 'Classical key exchange without post-quantum hybrid support.' },
  { id: 'algo-aes256', label: 'AES-256-GCM', type: 'algorithm', criticality: 'Low', quantumVulnerable: false, y: 530, x: 1080, description: '256-bit symmetric block cipher. Quantum resilient under Grover.' },
  { id: 'algo-sha256', label: 'SHA-256 Digest', type: 'algorithm', criticality: 'Low', quantumVulnerable: false, y: 530, x: 1220, description: 'Cryptographic hash function with 128 bits quantum pre-image margin.' },

  // Layer 7: Certificates & Keys
  { id: 'cert-auth023', label: 'AUTH-GOV-ROOT-023', type: 'certificate', criticality: 'Critical', y: 630, x: 380, description: 'Root CA certificate signing all authentication assertions.' },
  { id: 'cert-pay01', label: 'PAY-FINANCE-CERT-01', type: 'certificate', criticality: 'Critical', y: 630, x: 620, description: 'Payment gateway transport encryption certificate.' },
  { id: 'cert-web44', label: 'CITIZEN-WEB-CERT-44', type: 'certificate', criticality: 'High', y: 630, x: 860, description: 'Citizen portal public web server certificate.' },
  { id: 'cert-wildcard', label: 'DEMO-GOV-WILDCARD-25', type: 'certificate', criticality: 'High', y: 630, x: 1100, description: 'Wildcard ingress TLS certificate.' }
];

export const DEPENDENCY_GRAPH_LINKS: DependencyLink[] = [
  // Business to Applications
  { source: 'biz-01', target: 'app-citizen', explainer: 'Citizen Authentication provides login capabilities to the Citizen Portal.' },
  { source: 'biz-01', target: 'app-auth', explainer: 'Authentication Service is the primary authority implementing Citizen Authentication.' },
  { source: 'biz-02', target: 'app-payment', explainer: 'Payment Gateway executes financial settlement transactions for Treasury.' },
  { source: 'biz-03', target: 'app-procure', explainer: 'Procurement Portal manages official public tenders for government.' },

  // Applications to Services
  { source: 'app-auth', target: 'srv-token', explainer: 'Authentication Service utilizes Token Authority to mint signed identity assertions.' },
  { source: 'app-auth', target: 'srv-sso', explainer: 'Authentication Service interfaces with SSO Engine for protocol federation.' },
  { source: 'app-payment', target: 'srv-pay-settle', explainer: 'Payment Gateway dispatches settlement requests to Settlement Service.' },
  { source: 'app-doc', target: 'srv-doc-vault', explainer: 'Document Management archives files in Vault Storage.' },
  { source: 'app-procure', target: 'srv-audit', explainer: 'Procurement Portal writes tamper-evident audit records.' },

  // Services to APIs
  { source: 'srv-token', target: 'api-oauth', explainer: 'Token Authority serves tokens via /v2/oauth/authorize API.' },
  { source: 'srv-sso', target: 'api-oauth', explainer: 'SSO Engine handles authorization flows on /v2/oauth/authorize.' },
  { source: 'srv-pay-settle', target: 'api-checkout', explainer: 'Settlement Service exposes /v1/payments/process for banking partners.' },
  { source: 'srv-pay-settle', target: 'api-gateway-edge', explainer: 'Settlement Service routes traffic through Edge Reverse Proxy.' },
  { source: 'srv-doc-vault', target: 'api-doc-store', explainer: 'Vault Storage accepts uploads via /api/docs/archive.' },

  // APIs to Libraries
  { source: 'api-oauth', target: 'lib-openssl', explainer: 'OAuth endpoint invokes OpenSSL 1.1.1u for fast RSA signature verification.' },
  { source: 'api-checkout', target: 'lib-bouncycastle', explainer: 'Payment checkout endpoint uses BouncyCastle for JWE payload encryption.' },
  { source: 'api-gateway-edge', target: 'lib-openssl', explainer: 'Edge Reverse Proxy terminates TLS connections via OpenSSL.' },
  { source: 'api-doc-store', target: 'lib-webcrypto', explainer: 'Doc store verifies web signatures via WebCrypto runtime.' },

  // Libraries to Algorithms (Core affected path)
  { source: 'lib-openssl', target: 'algo-rsa2048', explainer: 'OpenSSL executes RSA-2048 signing routines (EVP_DigestSign).' },
  { source: 'lib-bouncycastle', target: 'algo-rsa2048', explainer: 'BouncyCastle performs RSA-2048 envelope key wrapping.' },
  { source: 'lib-webcrypto', target: 'algo-ecdsa256', explainer: 'WebCrypto runs ECDSA P-256 signature verification.' },
  { source: 'lib-openssl', target: 'algo-tls12', explainer: 'OpenSSL negotiates TLS 1.2 handshake cipher suites.' },
  { source: 'lib-bouncycastle', target: 'algo-aes256', explainer: 'BouncyCastle encrypts stored payloads with AES-256-GCM.' },
  { source: 'lib-rustcrypto', target: 'algo-sha256', explainer: 'RustCrypto builds Merkle tree leaves using SHA-256.' },

  // Algorithms to Certificates & Keys
  { source: 'algo-rsa2048', target: 'cert-auth023', explainer: 'RSA-2048 operations use private key corresponding to AUTH-GOV-ROOT-023.' },
  { source: 'algo-rsa2048', target: 'cert-pay01', explainer: 'RSA-2048 operations use PAY-FINANCE-CERT-01 public key.' },
  { source: 'algo-ecdsa256', target: 'cert-web44', explainer: 'ECDSA P-256 signs tokens under CITIZEN-WEB-CERT-44.' },
  { source: 'algo-tls12', target: 'cert-wildcard', explainer: 'TLS 1.2 sessions negotiate cipher under DEMO-GOV-WILDCARD-25.' }
];

export const MIGRATION_CONFLICTS_DETAILED: MigrationConflictDetail[] = [
  {
    id: 'conf-01',
    title: 'Legacy Crypto Library Incompatibility',
    affectedAsset: 'Authentication Service',
    affectedDependency: 'OpenSSL 1.1.1u',
    severity: 'Critical',
    reason: 'OpenSSL 1.1.1u EOL reached; lacks native post-quantum algorithm provider (FIPS 204 ML-DSA).',
    investigationAction: 'Deploy OpenSSL 3.3+ with liboqs provider or construct isolated dual-signature WASM bridge.'
  },
  {
    id: 'conf-02',
    title: 'Protocol Buffer & MTU Expansion',
    affectedAsset: 'OAuth / OIDC APIs',
    affectedDependency: 'Network Ingress MTU (1500 bytes)',
    severity: 'High',
    reason: 'ML-DSA-65 public keys and signatures expand HTTP authorization headers beyond default 8KB header buffer limits.',
    investigationAction: 'Increase NGINX large_client_header_buffers and tune ingress sidecar HTTP MTU thresholds.'
  },
  {
    id: 'conf-03',
    title: 'Certificate Pinning Rejection',
    affectedAsset: 'Citizen Mobile Application',
    affectedDependency: 'AUTH-GOV-ROOT-023',
    severity: 'Critical',
    reason: 'Hardcoded SPKI public key pins in compiled citizen mobile apps will fail TLS handshake upon certificate rotation.',
    investigationAction: 'Issue cross-signed transitional root certificate and roll out mobile app update with dynamic pin list.'
  },
  {
    id: 'conf-04',
    title: 'Commercial Partner API Inoperability',
    affectedAsset: 'Payment Gateway',
    affectedDependency: 'Commercial Banking Ingress APIs',
    severity: 'High',
    reason: '4 commercial partner banks strictly mandate PKCS#1 v1.5 RSA-2048 and cannot ingest post-quantum KEM envelopes.',
    investigationAction: 'Establish bilateral dual-stack sandbox with partner banks scheduled across a 180-day grace transition window.'
  }
];

export const IMPACT_SCENARIOS: ImpactScenario[] = [
  {
    id: 'scen-rsa2048',
    title: 'What if RSA-2048 is deprecated?',
    description: 'Models immediate deprecation or revocation of 2048-bit RSA across all digital signing, authentication, and session envelope key exchanges.',
    targetEntity: 'RSA-2048 (All Implementations)',
    dnaId: 'ECDAT-CRYPTO-004382',
    affectedArtefactsCount: 12,
    affectedAppsCount: 7,
    affectedServicesCount: 12,
    affectedApisCount: 3,
    criticalFunctionsCount: 2,
    migrationConflictsCount: 4,
    conflicts: MIGRATION_CONFLICTS_DETAILED,
    affectedNodeIds: [
      'algo-rsa2048', 'lib-openssl', 'lib-bouncycastle', 'api-oauth', 'api-checkout',
      'srv-token', 'srv-sso', 'srv-pay-settle', 'app-auth', 'app-payment', 'app-citizen',
      'app-procure', 'biz-01', 'biz-02', 'cert-auth023', 'cert-pay01'
    ],
    technicalImpacts: [
      'OpenSSL 1.1.1u crypto provider decoupling required in auth-service and edge proxy.',
      'SAML 2.0 / OIDC signing certificate invalidation across 14 downstream consumer microservices.',
      'BouncyCastle 1.68 key exchange failure on payment gateway payload decryption.',
      'Public JWKS endpoint schema breakage if replaced with non-standard key serialization.'
    ],
    businessImpacts: [
      'National Citizen Authentication: Complete outage of single sign-on across state citizen services.',
      'Treasury & Revenue Settlement: Automated transaction clearing halts at banking partner ingress gateways.',
      'Procurement Portal: Inability to notarize and seal active commercial procurement bids.',
      'Citizen Services Portal: Session token invalidation causing immediate mass user logout.'
    ],
    securityImpacts: [
      'Adversary certificate spoofing risk drops to zero post-migration.',
      'Temporary side-channel timing attack surface during dual-signature transition bridge deployment.'
    ],
    migrationImpacts: [
      'Estimated 180-day phased dual-signature rollout required to prevent client connection dropouts.',
      'Hardware security module (HSM) firmware upgrade required across 6 HSM appliances.'
    ],
    recommendedAction: 'Prioritize Authentication Service and Payment Gateway for migration planning because they are critical services with multiple downstream dependencies. Implement a dual-signature transition bridge (RSA-2048 + ML-DSA) to maintain legacy interoperability before full algorithm sunset.',
    candidateApproach: 'Deploy ML-DSA (FIPS 204) for signature services and ML-KEM-768 (FIPS 203) for key establishment via hybrid TLS 1.3 wrapper.'
  },
  {
    id: 'scen-tls12',
    title: 'What if TLS 1.2 is prohibited by policy?',
    description: 'Simulates disabling TLS 1.2 across all edge reverse proxies, enforcing TLS 1.3 only with hybrid post-quantum cipher suites.',
    targetEntity: 'TLS 1.2 (Ingress & Inter-Service Gateways)',
    dnaId: 'ECDAT-CRYPTO-001850',
    affectedArtefactsCount: 8,
    affectedAppsCount: 5,
    affectedServicesCount: 9,
    affectedApisCount: 4,
    criticalFunctionsCount: 2,
    migrationConflictsCount: 6,
    affectedNodeIds: [
      'algo-tls12', 'api-gateway-edge', 'lib-openssl', 'app-citizen', 'app-procure', 'cert-wildcard'
    ],
    technicalImpacts: [
      'Older partner bank microservices (running Java 7/8 without TLS 1.3 support) will fail handshake negotiation.',
      'Legacy ERP internal service mesh sidecars will lose mutual authentication with newer cloud pods.',
      'Hardware firewalls with deep packet inspection (DPI) expecting TLS 1.2 cipher structures will drop packets.'
    ],
    businessImpacts: [
      'Inter-departmental data exchanges with older provincial state servers will experience connectivity blackout.',
      'Roughly 8.4% of citizens on older mobile devices will receive SSL_VERSION_OR_CIPHER_MISMATCH errors.'
    ],
    recommendedAction: 'Establish an isolated legacy ingress egress proxy with strict mTLS rate-limiting rather than outright dropping TLS 1.2 connections immediately; schedule partner bank client upgrades over a 90-day window.',
    candidateApproach: 'Enable TLS 1.3 with X25519MLKEM768 hybrid key exchange on edge proxies while retaining sandboxed fallback for legacy internal bridges.'
  },
  {
    id: 'scen-root-ca',
    title: 'What if Root CA (AUTH-GOV-ROOT-023) expires or is revoked?',
    description: 'Analyzes trust chain revocation impact for the primary government root certificate authority.',
    targetEntity: 'Certificate AUTH-GOV-ROOT-023',
    affectedArtefactsCount: 16,
    affectedAppsCount: 6,
    affectedServicesCount: 11,
    affectedApisCount: 2,
    criticalFunctionsCount: 2,
    migrationConflictsCount: 5,
    affectedNodeIds: [
      'cert-auth023', 'algo-rsa2048', 'lib-openssl', 'srv-token', 'app-auth', 'biz-01'
    ],
    technicalImpacts: [
      'Container trust stores (Alpine/Debian /etc/ssl/certs) must be re-baked and rolled out across 400+ Kubernetes pods.',
      'Hardcoded certificate pins in native mobile citizen applications will reject connection handshakes until an app store update is published.'
    ],
    businessImpacts: [
      'Full administrative lock-out on inter-agency API federation until root certificates are refreshed.',
      'Citizen mobile app service outage for users with auto-update disabled.'
    ],
    recommendedAction: 'Issue cross-signed intermediate certificates supporting both old and new roots for a 180-day grace period; purge hardcoded certificate pinning in favor of dynamic public key hash pinning with backup pins.',
    candidateApproach: 'Issue new root under hybrid ML-DSA-65 / RSA-4096 dual-stack certificate structure.'
  }
];

export const MIGRATION_ROADMAP_ITEMS: MigrationRoadmapItem[] = [
  {
    id: 'rdm-01',
    dnaId: 'ECDAT-CRYPTO-004382',
    asset: 'Authentication Service (Signer)',
    currentCrypto: 'RSA-2048',
    purpose: 'Digital Signature / Auth',
    risk: 'Critical',
    dependencies: 18,
    migrationComplexity: 'High',
    recommendedAction: 'Deploy ML-DSA dual-signature bridge in staging testbed; upgrade OpenSSL provider.',
    candidatePqc: 'ML-DSA (FIPS 204)',
    hybridArchitecture: 'Composite RSA-2048 + ML-DSA-65 Dual Signature',
    status: 'P1 — Immediate Planning',
    currentPhase: 'Prioritization',
    targetHorizon: 'Q2 2027',
    owner: 'National Identity Directorate'
  },
  {
    id: 'rdm-02',
    dnaId: 'ECDAT-CRYPTO-003819',
    asset: 'Payment Gateway (Transport)',
    currentCrypto: 'RSA-2048',
    purpose: 'Key Establishment',
    risk: 'Critical',
    dependencies: 14,
    migrationComplexity: 'High',
    recommendedAction: 'Upgrade BouncyCastle to 1.78; enable ML-KEM-768 for envelope key encapsulation.',
    candidatePqc: 'ML-KEM (FIPS 203)',
    hybridArchitecture: 'Hybrid X25519 + ML-KEM-768',
    status: 'P1 — Immediate Planning',
    currentPhase: 'Prioritization',
    targetHorizon: 'Q3 2027',
    owner: 'Treasury Payments Group'
  },
  {
    id: 'rdm-03',
    dnaId: 'ECDAT-CRYPTO-002910',
    asset: 'Citizen Services Portal (JWT)',
    currentCrypto: 'ECDSA P-256',
    purpose: 'Session Authentication',
    risk: 'High',
    dependencies: 9,
    migrationComplexity: 'Medium',
    recommendedAction: 'Transition web session token validation to ML-DSA-44 via WASM worker.',
    candidatePqc: 'ML-DSA-44',
    hybridArchitecture: 'Dual JWT Header (ES256 + MLDSA44)',
    status: 'P2 — High Priority',
    currentPhase: 'Pilot',
    targetHorizon: 'Q4 2026',
    owner: 'Citizen Portal Web Engineering'
  },
  {
    id: 'rdm-04',
    dnaId: 'ECDAT-CRYPTO-001850',
    asset: 'API Gateway (Edge TLS)',
    currentCrypto: 'TLS 1.2 (ECDHE-RSA)',
    purpose: 'Transport Protocol',
    risk: 'High',
    dependencies: 22,
    migrationComplexity: 'Low',
    recommendedAction: 'Enable TLS 1.3 with post-quantum hybrid groups in NGINX ingress controller.',
    candidatePqc: 'TLS 1.3 Hybrid (X25519MLKEM768)',
    hybridArchitecture: 'TLS 1.3 Draft Group Hybrid Negotiation',
    status: 'P2 — High Priority',
    currentPhase: 'Pilot',
    targetHorizon: 'Q4 2026',
    owner: 'Cloud Infrastructure Ops'
  }
];

export const DISCOVERY_SOURCES = [
  { id: 'source-code', name: 'Source Code Repositories', icon: 'Code', count: '48 Repositories', description: 'AST & regex pattern analysis across Git repos (Go, Java, Python, C++, TS)' },
  { id: 'binaries', name: 'Binary Files & Shared Objects', icon: 'Binary', count: '1,420 Binaries', description: 'ELF, PE, and Mach-O symbol table scanning for linked crypto libraries' },
  { id: 'servers', name: 'Bare Metal & Virtual Servers', icon: 'Server', count: '312 Hosts', description: 'SSH agent-based inspection of installed OpenSSL, NSS, and libsodium packages' },
  { id: 'containers', name: 'Containers & Base Images', icon: 'Box', count: '840 Images', description: 'Container image layer analysis for vulnerable crypto primitives and static binaries' },
  { id: 'cloud', name: 'Cloud KMS & HSM Assets', icon: 'Cloud', count: '64 Vaults', description: 'Cloud key ring metadata, asymmetric key specs, and rotation policy inspection' },
  { id: 'configs', name: 'Configuration & TLS Profiles', icon: 'FileText', count: '2,890 Configs', description: 'Web server (NGINX, Apache, Envoy) cipher suites and protocol version audits' },
  { id: 'certificates', name: 'Certificates & PKI Stores', icon: 'Key', count: '512 X.509 Certs', description: 'X.509 certificate trust store expiration, key length, and signature algorithm audit' },
  { id: 'api-endpoints', name: 'API Endpoints & Gateways', icon: 'Network', count: '186 Endpoints', description: 'Active TLS handshake probing and HTTP header security policy extraction' }
];

// 20. BLOCKCHAIN-INSPIRED TAMPER-EVIDENT EVIDENCE LEDGER (NEW REQUIREMENT)
export const EVIDENCE_LEDGER_RECORDS: EvidenceLedgerRecord[] = [
  {
    recordNumber: '#004382',
    timestamp: '2026-09-05 13:48:12 UTC',
    dnaId: 'ECDAT-CRYPTO-004382',
    assetName: 'RSA-2048 (Authentication Service)',
    findingId: 'FIND-PQC-001',
    sourcePath: 'auth-service/src/security/signer.go:L114',
    evidenceHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    previousHash: 'sha256:3a1b94e229cfa089d812349098bcda0012891d4e5f6120384758129348123abc',
    cryptographicSignature: 'ECDSA-SECP256K1-VERIFIED',
    status: 'VERIFIED',
    summary: 'Discovered OpenSSL 1.1.1u RSA-2048 digital signing key pair; flagged as Shor CRQC vulnerable.'
  },
  {
    recordNumber: '#004381',
    timestamp: '2026-09-05 13:35:40 UTC',
    dnaId: 'ECDAT-CRYPTO-003819',
    assetName: 'RSA-2048 (Payment Gateway)',
    findingId: 'FIND-PQC-002',
    sourcePath: 'payment-gateway/services/crypto/transport_vault.c:L210',
    evidenceHash: 'sha256:3a1b94e229cfa089d812349098bcda0012891d4e5f6120384758129348123abc',
    previousHash: 'sha256:889123fa456bcde0192837465abcde12345678901234567890abcdef12345678',
    cryptographicSignature: 'ECDSA-SECP256K1-VERIFIED',
    status: 'VERIFIED',
    summary: 'BouncyCastle RSA-2048 transport key exchange flagged under HNDL exposure analysis.'
  },
  {
    recordNumber: '#004380',
    timestamp: '2026-09-05 13:10:15 UTC',
    dnaId: 'ECDAT-UNK-0001',
    symbol: 'CustomCryptoHandler',
    findingId: 'FIND-UNK-001',
    assetName: 'CustomCryptoHandler (Legacy ERP)',
    sourcePath: 'legacy-erp/src/native/security/CustomCryptoHandler.cpp:L142',
    evidenceHash: 'sha256:889123fa456bcde0192837465abcde12345678901234567890abcdef12345678',
    previousHash: 'sha256:11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
    cryptographicSignature: 'ECDSA-SECP256K1-VERIFIED',
    status: 'VERIFIED',
    summary: 'Detected proprietary 256-byte substitution matrix and XOR Feistel bit-shift loops.'
  },
  {
    recordNumber: '#004379',
    timestamp: '2026-09-05 12:45:00 UTC',
    dnaId: 'ECDAT-CRYPTO-001850',
    assetName: 'TLS 1.2 (Static Ingress)',
    findingId: 'FIND-PROT-001',
    sourcePath: 'infra/k8s/ingress-nginx-conf.d/ssl.conf:L22',
    evidenceHash: 'sha256:11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
    previousHash: 'sha256:99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa',
    cryptographicSignature: 'ECDSA-SECP256K1-VERIFIED',
    status: 'VERIFIED',
    summary: 'Perimeter NGINX ingress audit identified deprecated TLS 1.2 cipher suites.'
  },
  {
    recordNumber: '#004378',
    timestamp: '2026-09-05 11:30:22 UTC',
    dnaId: 'ECDAT-CRYPTO-000412',
    assetName: 'AES-256-GCM (Database KMS)',
    findingId: 'FIND-SYM-001',
    sourcePath: 'document-mgmt/services/storage/vault_kms.java:L204',
    evidenceHash: 'sha256:99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa',
    previousHash: 'sha256:aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899',
    cryptographicSignature: 'ECDSA-SECP256K1-VERIFIED',
    status: 'VERIFIED',
    summary: 'Verified AES-256 envelope keying conforms to CNSA 2.0 quantum margin criteria.'
  }
];

// 23. CRYPTOGRAPHIC POLICIES & VIOLATIONS (NEW REQUIREMENT)
export const CRYPTOGRAPHIC_POLICIES: CryptographicPolicy[] = [
  {
    id: 'pol-01',
    name: 'CNSA 2.0 Post-Quantum Mandate',
    framework: 'CNSA 2.0',
    description: 'Mandates migration away from classical asymmetric algorithms (RSA, ECDSA) to FIPS 203/204 standards before 2030.',
    status: 'Enforced',
    violationsCount: 317
  },
  {
    id: 'pol-02',
    name: 'NIST SP 800-131A Cryptographic Transitions',
    framework: 'NIST SP 800-131A',
    description: 'Prohibits key lengths with less than 112-bit classical security and restricts SHA-1 digital signature generation.',
    status: 'Enforced',
    violationsCount: 142
  },
  {
    id: 'pol-03',
    name: 'FIPS 140-3 Cryptographic Module Standards',
    framework: 'FIPS 140-3',
    description: 'Strictly forbids unvalidated in-house custom or proprietary encryption algorithms without NIST CAVP/CMVP certificates.',
    status: 'Enforced',
    violationsCount: 46
  },
  {
    id: 'pol-04',
    name: 'PCI-DSS 4.0 Transport & Storage Encryption',
    framework: 'PCI-DSS 4.0',
    description: 'Mandates TLS 1.3 or high-security TLS 1.2 for cardholder data environments; deprecates static CBC mode ciphers.',
    status: 'Transition Phase',
    violationsCount: 18
  }
];

export const POLICY_VIOLATIONS: PolicyViolation[] = [
  {
    id: 'viol-01',
    policyId: 'pol-01',
    policyName: 'CNSA 2.0 Post-Quantum Mandate',
    dnaId: 'ECDAT-CRYPTO-004382',
    asset: 'Authentication Service (Signer)',
    algorithm: 'RSA-2048',
    severity: 'Critical',
    violationReason: 'Uses classical 2048-bit RSA for public identity assertion signing; vulnerable to CRQC Shor factoring.',
    remediationTimeline: 'Priority 1 (Target: Q2 2027)',
    owner: 'National Identity Directorate'
  },
  {
    id: 'viol-02',
    policyId: 'pol-03',
    policyName: 'FIPS 140-3 Cryptographic Module Standards',
    dnaId: 'ECDAT-UNK-0001',
    asset: 'Legacy ERP',
    algorithm: 'CustomCryptoHandler (Proprietary)',
    severity: 'Critical',
    violationReason: 'Non-standard S-box and proprietary round permutation; not validated under NIST CMVP.',
    remediationTimeline: 'Immediate Security Review',
    owner: 'Enterprise ERP Maintenance'
  },
  {
    id: 'viol-03',
    policyId: 'pol-04',
    policyName: 'PCI-DSS 4.0 Transport Encryption',
    dnaId: 'ECDAT-CRYPTO-001850',
    asset: 'API Gateway (Edge)',
    algorithm: 'TLS 1.2 (Static Cipher)',
    severity: 'High',
    violationReason: 'Permits fallback to legacy CBC suites without perfect forward secrecy for partner bank traffic.',
    remediationTimeline: 'Priority 2 (Target: Q4 2026)',
    owner: 'Cloud Infrastructure Ops'
  },
  {
    id: 'viol-04',
    policyId: 'pol-02',
    policyName: 'NIST SP 800-131A Cryptographic Transitions',
    dnaId: 'ECDAT-CRYPTO-003819',
    asset: 'Payment Gateway',
    algorithm: 'RSA-2048 (Transport)',
    severity: 'High',
    violationReason: '2048-bit modulus provides only 112 bits of classical security margin.',
    remediationTimeline: 'Priority 1 (Target: Q3 2027)',
    owner: 'Treasury Payments Group'
  }
];

// 24. SECURITY POSTURE TIMELINE (NEW REQUIREMENT)
export const POSTURE_TIMELINE_DATA: PostureTimelinePoint[] = [
  {
    scanId: 'scan-01',
    label: 'Baseline Scan (Q1 2026)',
    date: '2026-03-01',
    totalArtefacts: 3920,
    criticalRisk: 412,
    highRisk: 920,
    mediumRisk: 1250,
    lowRisk: 1338,
    unclassified: 84,
    migrationReadiness: 18
  },
  {
    scanId: 'scan-02',
    label: 'Mid-Year Audit (Q2 2026)',
    date: '2026-06-01',
    totalArtefacts: 4110,
    criticalRisk: 380,
    highRisk: 890,
    mediumRisk: 1340,
    lowRisk: 1500,
    unclassified: 62,
    migrationReadiness: 28
  },
  {
    scanId: 'scan-03',
    label: 'Pre-Transition Review',
    date: '2026-08-01',
    totalArtefacts: 4290,
    criticalRisk: 345,
    highRisk: 865,
    mediumRisk: 1390,
    lowRisk: 1690,
    unclassified: 52,
    migrationReadiness: 35
  },
  {
    scanId: 'scan-04',
    label: 'Current Realtime Scan',
    date: '2026-09-05',
    totalArtefacts: 4382,
    criticalRisk: 317,
    highRisk: 842,
    mediumRisk: 1420,
    lowRisk: 1803,
    unclassified: 46,
    migrationReadiness: 42
  }
];

// 27. EXECUTIVE DECISION QUEUE (NEW REQUIREMENT)
export const EXECUTIVE_DECISION_QUEUE = [
  {
    rank: '01',
    priority: 'P1',
    dnaId: 'ECDAT-CRYPTO-004382',
    title: 'RSA-2048 Identity Signer Migration',
    asset: 'Authentication Service',
    whyNow: 'Shor algorithm vulnerability threatens national citizen single sign-on assertions across 7 downstream apps.',
    whatIsAffected: '7 Applications, 12 Microservices, 3 Public APIs, 2 Critical Functions.',
    recommendedNextStep: 'Authorize Q1 2027 testbed pilot for ML-DSA (FIPS 204) dual-signature bridge.',
    riskScore: 92
  },
  {
    rank: '02',
    priority: 'P1',
    dnaId: 'ECDAT-UNK-0001',
    title: 'Custom In-House Cipher Classification',
    asset: 'Legacy ERP',
    whyNow: 'Unverified 256-byte S-box violates FIPS 140-3 boundary rules and risks side-channel timing key recovery.',
    whatIsAffected: 'Core legacy procurement database records and inventory pricing tables.',
    recommendedNextStep: 'Commission reverse-analysis task force to swap primitive for CAVP-validated AES-256-GCM.',
    riskScore: 82
  },
  {
    rank: '03',
    priority: 'P2',
    dnaId: 'ECDAT-CRYPTO-001850',
    title: 'Perimeter TLS 1.3 Hybrid Key Exchange Rollout',
    asset: 'Edge Reverse Proxy',
    whyNow: 'HNDL exposure enables adversary capture of transit encrypted partner banking payloads.',
    whatIsAffected: '4 Ingress APIs, 22 microservices communicating over external edge gateways.',
    recommendedNextStep: 'Deploy NGINX TLS 1.3 update with X25519MLKEM768 draft group negotiation.',
    riskScore: 74
  },
  {
    rank: '04',
    priority: 'P2',
    dnaId: 'ECDAT-CRYPTO-002910',
    title: 'Citizen Portal JWT Signature Upgrade',
    asset: 'Citizen Services Portal',
    whyNow: 'ECDSA P-256 session tokens are forgeable under Shor with ~1,500 physical qubits.',
    whatIsAffected: 'Public citizen interaction sessions across state welfare portals.',
    recommendedNextStep: 'Integrate ML-DSA-44 WASM polyfill into web frontend auth headers.',
    riskScore: 78
  }
];

// 28. MIGRATION READINESS FACTOR BREAKDOWN (42% Aggregate Score)
export const MIGRATION_READINESS_FACTORS: MigrationReadinessFactor[] = [
  {
    name: 'Cryptographic Inventory Completeness',
    score: 94,
    maxScore: 100,
    weight: '20%',
    status: 'Ready',
    explanation: '4,382 artefacts mapped with verified source locations across 8 enterprise attack surfaces.'
  },
  {
    name: 'Post-Quantum Library Availability',
    score: 45,
    maxScore: 100,
    weight: '20%',
    status: 'In Progress',
    explanation: 'OpenSSL 1.1.1u lacks FIPS 204 bindings; OpenSSL 3.3 / liboqs evaluation testbed active in staging.'
  },
  {
    name: 'Application Architecture & Agility',
    score: 35,
    maxScore: 100,
    weight: '15%',
    status: 'In Progress',
    explanation: 'Authentication Service decoupled; citizen mobile app requires SPKI pinning dynamic update.'
  },
  {
    name: 'Protocol & Network Buffer Compatibility',
    score: 30,
    maxScore: 100,
    weight: '15%',
    status: 'Blocked',
    explanation: 'ML-DSA public keys expand HTTP headers beyond 1,500-byte default MTU bounds on edge proxies.'
  },
  {
    name: 'Interoperability & Partner Readiness',
    score: 25,
    maxScore: 100,
    weight: '15%',
    status: 'Pending',
    explanation: '4 commercial banking partner APIs strictly mandate PKCS#1 v1.5 RSA-2048 envelope ingest.'
  },
  {
    name: 'Testing & Validation Testbed Readiness',
    score: 20,
    maxScore: 100,
    weight: '15%',
    status: 'In Progress',
    explanation: 'Dual-signature test suite constructed; hardware security module (HSM) microcode updates pending.'
  }
];

// 29. CRYPTOGRAPHIC ATTACK SURFACE TOPOLOGY
export const ATTACK_SURFACE_NODES: AttackSurfaceNode[] = [
  {
    id: 'as-01',
    tier: 'Internet Entrypoint',
    label: 'Public Ingress Gateway (Reverse Proxy)',
    exposure: 'Public',
    quantumStatus: 'Quantum-Vulnerable',
    algorithm: 'TLS 1.2 Handshake (RSA-Kx)',
    dnaId: 'ECDAT-CRYPTO-001850',
    criticality: 'High',
    notes: 'Perimeter TLS termination point; vulnerable to Harvest Now Decrypt Later session recording.'
  },
  {
    id: 'as-02',
    tier: 'Public API Ingress',
    label: '/v2/oauth/authorize API',
    exposure: 'Public',
    quantumStatus: 'Quantum-Vulnerable',
    algorithm: 'RSA-2048 (Digital Signature)',
    dnaId: 'ECDAT-CRYPTO-004382',
    criticality: 'Critical',
    notes: 'Publicly exposed OAuth authorization endpoint serving citizen login claims.'
  },
  {
    id: 'as-03',
    tier: 'Public API Ingress',
    label: '/v1/payments/process API',
    exposure: 'Public',
    quantumStatus: 'Quantum-Vulnerable',
    algorithm: 'RSA-2048 (Envelope Kx)',
    dnaId: 'ECDAT-CRYPTO-003819',
    criticality: 'Critical',
    notes: 'Ingress endpoint for merchant and treasury payment dispatch.'
  },
  {
    id: 'as-04',
    tier: 'Internal Application',
    label: 'Authentication Service',
    exposure: 'Internal',
    quantumStatus: 'Quantum-Vulnerable',
    algorithm: 'RSA-2048 (Signing Key)',
    dnaId: 'ECDAT-CRYPTO-004382',
    criticality: 'Critical',
    notes: 'Root identity trust anchor; compromise breaks authentication across 7 downstream apps.'
  },
  {
    id: 'as-05',
    tier: 'Service Layer',
    label: 'Token Authority',
    exposure: 'Internal',
    quantumStatus: 'Quantum-Vulnerable',
    algorithm: 'ECDSA P-256',
    dnaId: 'ECDAT-CRYPTO-002910',
    criticality: 'High',
    notes: 'Issues JWT session assertions; Shor discrete logarithm allows forging user scopes.'
  },
  {
    id: 'as-06',
    tier: 'Crypto Provider',
    label: 'OpenSSL 1.1.1u (Deprecated)',
    exposure: 'Internal',
    quantumStatus: 'Quantum-Vulnerable',
    algorithm: 'RSA / ECDSA Provider',
    dnaId: 'ECDAT-CRYPTO-004382',
    criticality: 'Critical',
    notes: 'EOL library dependency without native post-quantum algorithm bindings.'
  },
  {
    id: 'as-07',
    tier: 'Crypto Provider',
    label: 'CustomCryptoHandler (Proprietary)',
    exposure: 'Internal',
    quantumStatus: 'Unknown',
    algorithm: 'Proprietary S-Box',
    dnaId: 'ECDAT-UNK-0001',
    criticality: 'Critical',
    notes: 'Unclassified 256-byte S-box; non-standard permutation violates FIPS 140-3 boundary controls.'
  },
  {
    id: 'as-08',
    tier: 'Sensitive Store',
    label: 'Citizen Biometric Vault & Credentials',
    exposure: 'Restricted',
    quantumStatus: 'Quantum-Resistant',
    algorithm: 'AES-256-GCM',
    dnaId: 'ECDAT-CRYPTO-000412',
    criticality: 'Critical',
    notes: 'Encrypted at rest with 256-bit symmetric key; quantum secure under Grover margin.'
  }
];

