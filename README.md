# ECDAT — Enterprise Cryptographic Discovery & Analysis Tool
**Smart India Hackathon | NTRO Problem Statement PS-26164**

> *"From Hidden Cryptography to Quantum-Ready Decisions."*  
> **Environment:** `SIMULATION ENVIRONMENT — ALL DATA IS SYNTHETIC`  
> **Target:** Government & Enterprise Cybersecurity Operations

---

## 1. Executive Summary & Objective
**ECDAT** is a Cryptographic Bill of Materials (CBOM) intelligence platform designed for national cyber defense and enterprise operations. Rather than acting as a simple passive scanner, ECDAT performs end-to-end cryptographic lifecycle assessment:

$$\text{DISCOVER} \rightarrow \text{UNDERSTAND} \rightarrow \text{CONNECT} \rightarrow \text{ASSESS} \rightarrow \text{PRIORITIZE} \rightarrow \text{SIMULATE} \rightarrow \text{MIGRATE}$$

It discovers cryptographic artefacts across source code, compiled binaries, container images, certificates, and cloud KMS/HSMs, maps dependency blast radiuses, evaluates quantum vulnerability using **Mosca's Theorem ($X + Y > Z$)**, and generates standards-compliant **CycloneDX 1.6 CBOMs** and **NIST Post-Quantum Cryptography (PQC)** migration roadmaps.

---

## 2. System Architecture

```
                                  [ User / Security Analyst / CISO ]
                                                   |
                     +-----------------------------+-----------------------------+
                     |                                                           |
           [ Web Command Center ]                                     [ Standalone CLI ]
        (React 18 + Vite + Tailwind)                                (Python 3.10 Engine)
                     |                                                           |
                     v                                                           v
       +----------------------------+                             +----------------------------+
       |   Frontend Intelligence    |                             |      Discovery Engine      |
       |  - 7-Factor Risk Engine    |                             |  - Source AST Scanner      |
       |  - Mosca Calculator        |                             |  - Binary Symbol / S-Box   |
       |  - App Risk Heatmap        |                             |  - Container / Layer SBOM  |
       |  - PQC Tradeoff Engine     |                             |  - X.509 Keystore Parser   |
       |  - What-If Simulator       |                             |  - Cloud KMS & HSM Stubs   |
       +--------------+-------------+                             +--------------+-------------+
                      |                                                          |
                      +-----------------------------+----------------------------+
                                                    |
                                                    v
                                    +-------------------------------+
                                    |     Normalization Layer       |
                                    | - Cryptographic DNA Assign    |
                                    | - Shor / Grover Flagging      |
                                    | - Mosca Evaluation (X+Y > Z)  |
                                    +---------------+---------------+
                                                    |
                      +-----------------------------+-----------------------------+
                      |                                                           |
                      v                                                           v
       +-------------------------------+                           +-------------------------------+
       |   PQC Recommendation Engine   |                           |    CBOM & Reporting Engine    |
       | - ML-KEM-768 (NIST FIPS 203)  |                           | - CycloneDX 1.6 JSON Schema   |
       | - ML-DSA-65  (NIST FIPS 204)  |                           | - Executive Audit JSON Report |
       | - SLH-DSA    (NIST FIPS 205)  |                           | - Tamper-Evident SHA-256 Link |
       | - Dual-Signature Hybrid Bridge|                           | - Printable Audit Briefing    |
       +-------------------------------+                           +-------------------------------+
```

---

## 3. Five Core Modules (End-to-End Scope)

### Module A — Discovery Engine
- **Source Code Scanner:** Static analysis (AST/regex-based) detecting cryptographic API invocations across **5 languages**:
  - **Python:** PyCryptodome (`RSA.generate`, `AES.new`, `ssl.SSLContext`)
  - **Java:** JCA / Bouncy Castle (`KeyPairGenerator.getInstance("RSA")`, `DiffieHellman`, `DESede`)
  - **C/C++:** OpenSSL EVP core (`EVP_PKEY_RSA`, `EVP_DigestSignInit`, `SSL_CTX_new`)
  - **Go:** Standard crypto (`rsa.GenerateKey`, `tls.Config`, `x509.ParseCertificate`)
  - **JavaScript/TypeScript:** Node `crypto` & browser `window.crypto.subtle`
- **Binary Scanner:**
  - Symbol table inspection (`libcrypto.so`, `libssl.so`, `libsodium`)
  - Exported/imported symbols (`RSA_new`, `EVP_DigestSignInit`, `DH_new`)
  - Embedded constant signature search: detects raw **256-byte AES S-Box tables** (`0x63, 0x7c, 0x77, 0x7b...`) at binary offsets.
- **Container / Image Scanner:**
  - Layer-by-layer manifest analysis inspecting for shared cryptographic libraries, OpenSSL versions, and root certificates.
- **Cert / Keystore Scanner:**
  - Parsers for X.509 PEM certificates, JKS, PKCS#12, and TLS server protocol contexts.
- **Cloud KMS & HSM Stubs:**
  - Detects AWS KMS (`boto3.client('kms')`), Azure Key Vault (`@azure/keyvault-keys`), GCP KMS (`google-cloud-kms`), and PKCS#11 HSM interfaces (`libCryptoki2.dll`, `SunPKCS11`).
- **Normalized Artefact Output:** Type, Location, Algorithm, Key Size, Mode, Library Version.

---

### Module B — Classification Engine
- **Type Tagging:** algorithm / key / certificate / protocol / library / hardware module / cloud service.
- **Cryptographic Property:** Symmetric vs Asymmetric, Key Size, Mode of Operation (GCM, CBC, ECB, CTR, OAEP), Hash Digest Length.
- **Lifetime:** Certificate validity expiration, key rotation policy (`Annual (365d)`, `Bi-Annual`, `Quarterly`, `None`).
- **User-Input Business Criticality:** Interactive GUI tagging per application/repo (`Critical`, `High`, `Medium`, `Low`) directly altering composite risk calculations.

---

### Module C — Quantum Risk Assessment (Mosca's Theorem)
Implements Prof. Michele Mosca's Theorem:

$$\text{Risk} = (X + Y) > Z$$

- **$X$ (Security Shelf-Life):** Years the data/key must remain secure (e.g., 15–25 years for citizen identity/biometrics).
- **$Y$ (PQC Migration Time):** Estimated time required to migrate the system (factoring LOC touching crypto, 14 dependent services, protocol type).
- **$Z$ (CRQC Horizon):** Estimated years until a Cryptographically Relevant Quantum Computer arrives (configurable, default 8 years $\implies$ 2034).
- **Evaluation Status:**
  - If $(X + Y) > Z \implies$ **CRITICAL QUANTUM RISK (Harvest Now Decrypt Later Threat)**.
  - Data captured by adversaries today will be decryptable before the required security lifetime expires.
- **Cryptographic Breakdown Flags:**
  - **Shor's Algorithm Flag:** Polynomial-time break ($O((\log N)^3)$) on RSA, ECDSA, and Diffie-Hellman.
  - **Grover's Algorithm Flag:** Quadratic speedup ($O(\sqrt{N})$) halving effective symmetric security:
    - $\text{AES-128} \rightarrow 64\text{ bits}$ (**INSECURE** against quantum brute-force).
    - $\text{AES-256} \rightarrow 128\text{ bits}$ (**QUANTUM SAFE**).
- **Application Risk Heatmap:** Matrix grid evaluating all 8 government applications across Criticality tiers, displaying total artefacts, shelf-life, and Mosca violation status.

---

### Module D — PQC Recommendation Engine
Multi-factor decision rule engine (not a simple 1:1 lookup) that maps classical primitives to **NIST FIPS standards (ratified August 2024)**:

| Classical Primitive | NIST PQC Replacement | Standard Specification | Hybrid Transition Mode |
| :--- | :--- | :--- | :--- |
| **RSA-2048 / 3072 / 4096** (Signature) | **ML-DSA-65** | NIST FIPS 204 (Dilithium) | Dual-Signature (RSA-2048 + ML-DSA-65) |
| **ECDSA P-256 / Ed25519** (Signature) | **ML-DSA-44 or Falcon-512** | NIST FIPS 204 / Round 4 | Hybrid Ed25519 + ML-DSA-44 |
| **Diffie-Hellman / ECDH** (Key Exchange) | **ML-KEM-768** | NIST FIPS 203 (Kyber) | Hybrid X25519 + ML-KEM-768 |
| **Long-Term Document Archival** | **SLH-DSA-SHA2-128s** | NIST FIPS 205 (SPHINCS+) | Composite RSA-4096 + SLH-DSA |
| **AES-128** (Symmetric Cipher) | **AES-256-GCM** | NIST SP 800-38D / CNSA 2.0 | Grover Quantum Security Margin |

- **Tradeoff Factors Weighed:**
  - **Latency Overhead:** ML-KEM encapsulation <0.05ms; ML-DSA verification ~0.15ms.
  - **Public Key & Signature Size Expansion:** ML-DSA expands signatures to 3.3 KB; requires network MTU verification.
  - **Library Maturity:** FIPS final standard ratification vs experimental implementations.
  - **Re-engineering Cost:** Low / Medium / High compatibility impact.

---

### Module E — Reporting & CBOM Generation
- **CycloneDX 1.6 CBOM Export:** Standardized JSON file containing native `cryptoProperties`, `algorithmProperties`, `detectionContext`, and `quantumRisk`.
- **Executive & Technical Audit Report:** Downloadable JSON and printable PDF-ready format.
- **Interactive Schema Inspector:** View and copy verified CycloneDX 1.6 JSON directly inside the browser.

---

## 4. Invariants & Data Baseline (Strictly Preserved)
- **Total Discovered Cryptographic Artefacts:** `4,382`
- **Critical Risk:** `317`
- **High Risk:** `842`
- **Medium Risk:** `1,420`
- **Low Risk:** `1,803`
- **Unclassified / In-House Symbols:** `46` (explicitly marked as subset of 4,382)
- **Primary Showcase Asset:** **RSA-2048** in `Authentication Service` (Composite Score: `92/100`, `P1 — Immediate Planning`, Library: `OpenSSL 1.1.1u`, Blast Radius: 7 Apps, 12 Services, 3 APIs, 2 Critical Business Functions).

---

## 5. Quickstart & Installation

### A. Web Command Center (React + TypeScript + Vite)
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build on port 3000
npm run preview -- --port 3000 --host
```
Open **`http://localhost:3000/`** in your browser.

---

### B. Standalone Python Discovery Scanner CLI
```bash
# 1. Inspect test samples (Python, Java, C, Go, JS, Binary with S-box, X.509, Cloud KMS)
python scanner/ecdat_scanner.py scan --path scanner/test_samples --output scanner/output_cbom.cdx.json --crqc-years 8

# 2. Scan custom codebase or binary directory
python scanner/ecdat_scanner.py scan --path /path/to/source_or_binary --output cbom_result.json --crqc-years 10
```

---

## 6. Deliverables Checklist Verification

| Requirement / Deliverable | Status | Implementation Detail |
| :--- | :---: | :--- |
| **Scanner covering $\ge$ 3 languages** | **COMPLETE** | Python, Java, C/C++, Go, and JavaScript static AST/regex parsers in `ecdat_scanner.py` & `DiscoveryModule.tsx`. |
| **Binary-level inspection** | **COMPLETE** | Symbol inspection for `libcrypto.so`, `RSA_new`, plus embedded **256-byte AES S-Box** constant matching at binary offsets. |
| **Container & Cloud KMS / HSM detection** | **COMPLETE** | Layer inspection plus AWS KMS, Azure Key Vault, GCP KMS, and PKCS#11 SDK stub detectors. |
| **Mosca's Theorem Calculation ($X+Y > Z$)** | **COMPLETE** | Interactive engine with $X$, $Y$, $Z$ sliders, live inequality evaluation, Shor and Grover flags in `QuantumRiskEngine.tsx`. |
| **PQC Recommendation Engine** | **COMPLETE** | Multi-factor tradeoff engine (ML-KEM, ML-DSA, SLH-DSA, Falcon, Hybrid) in `PqcRecommendationModule.tsx`. |
| **CycloneDX 1.6 CBOM Export** | **COMPLETE** | 100% compliant CycloneDX 1.6 schema export in browser (`ReportsModule.tsx`) and Python CLI. |
| **Interactive Dashboard & Heatmap** | **COMPLETE** | Posture overview, inventory table, Application Risk Heatmap, 7-tier attack surface, and Gantt roadmap. |
| **Sample Report Generated** | **COMPLETE** | Real CycloneDX 1.6 JSON generated end-to-end at `scanner/output_cbom.cdx.json`. |

---

## 7. Key Differentiators for Judges (NTRO PS-26164)
1. **Binary & S-Box Detection:** Scans compiled ELF/PE binaries for embedded constants and shared library symbol tables without requiring source code.
2. **Real Mosca's Theorem Engine:** User-configurable $Z$ (CRQC arrival horizon), dynamic $X$ (shelf life), and $Y$ (migration time) calculating actual quantum risk timelines.
3. **Justified Recommendations:** Evaluates latency vs signature size vs cost tradeoffs, explaining *why* an algorithm is chosen.
4. **Standards Compliant:** Native CycloneDX 1.6 CBOM output ensuring interoperability with national SBOM platforms.
