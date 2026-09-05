import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Workflow,
  Lock,
  ChevronRight,
  FileText
} from 'lucide-react';

interface StructuredAnalysis {
  observation: string;
  evidence: string;
  implication: string;
  recommendation: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  query?: string;
  analysis?: StructuredAnalysis;
  timestamp: string;
}

export const ECDATIntelligence: React.FC = () => {
  const { 
    isCopilotOpen, 
    setIsCopilotOpen, 
    copilotQuery, 
    setCopilotQuery,
    selectedArtefact,
    currentTab
  } = useApp();

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      sender: 'assistant',
      timestamp: '14:00:00',
      analysis: {
        observation: "ECDAT Intelligence online. Grounded in enterprise cryptographic inventory (4,382 artefacts), 7-layer dependency topology, and FIPS 203/204 standards.",
        evidence: "Telemetry synchronized across 48 repositories, 1,420 binaries, and 112 certificates for Demo Government Enterprise.",
        implication: "317 artefacts flagged as quantum-vulnerable; 46 custom implementations require classification review.",
        recommendation: "Select an inquiry pill below or type a query to inspect cryptographic blast radius and candidate migration approaches."
      }
    }
  ]);

  // The 5 mandatory inquiry pills (Requirement #11)
  const inquiryPills = [
    "Why was this flagged?",
    "What depends on RSA-2048?",
    "What is the blast radius?",
    "Why is this P1?",
    "What migration approach should be evaluated?"
  ];

  useEffect(() => {
    if (copilotQuery && isCopilotOpen) {
      handleUserSubmit(copilotQuery);
      setCopilotQuery('');
    }
  }, [copilotQuery, isCopilotOpen]);

  const generateStructuredResponse = (query: string): StructuredAnalysis => {
    const q = query.toLowerCase();

    if (q.includes('why was this flagged') || q.includes('why was rsa-2048 flagged') || q.includes('flagged')) {
      return {
        observation: "RSA-2048 in Authentication Service (Citizen Services Portal) flagged as Critical Quantum-Vulnerable primitive.",
        evidence: "Detected in OpenSSL 1.1.1u binding (auth-service/src/crypto/token_signer.c:L84). Modulus length is 2048 bits. Polynomial-time solvable under Shor's algorithm on cryptographically relevant quantum computer (CRQC).",
        implication: "Compromise of private signing key enables state-wide forgery of citizen authentication assertions (SAML/OIDC), compromising trust across all relying government services.",
        recommendation: "Evaluate FIPS 204 (ML-DSA) candidate signature approach; deploy dual-signature bridge in staging environment before 2027 CNSA 2.0 transition mandate."
      };
    }

    if (q.includes('what depends on rsa-2048') || q.includes('what depends on') || q.includes('systems depend')) {
      return {
        observation: "RSA-2048 serves as the root authentication trust anchor across the enterprise digital ecosystem.",
        evidence: "Dependency topology confirms direct reliance by 7 Applications (Citizen Portal, Payment Gateway, Procurement Portal, Document Management, Legacy ERP, API Gateway), 12 Microservices (SSO Engine, Token Authority, Settlement Ingress), 3 Public APIs (/oauth, /payments), and 2 Critical Functions.",
        implication: "Direct deprecation without a transitional dual-signature bridge breaks token verification downstream across all 7 applications simultaneously.",
        recommendation: "Establish a coordinated dual-stack signature verification layer in the API Gateway before altering the signing algorithm in the root Authentication Service."
      };
    }

    if (q.includes('blast') || q.includes('blast radius')) {
      return {
        observation: "Blast radius calculated at Maximum Critical Impact across operational services.",
        evidence: "7 Applications affected, 12 Microservices impacted, 3 Exposed Public APIs (/v2/oauth/authorize, /v1/payments/process, Edge Proxy), and 2 Critical Business Functions (Citizen Authentication & Treasury Settlement). Downstream severity: Critical (2), High (5), Medium (5).",
        implication: "Uncoordinated deprecation causes unhandled BadSignatureException errors, dropping live citizen sessions and halting revenue settlements.",
        recommendation: "Run deprecation simulations in What-If Impact Simulator; prioritize pilot upgrades on non-critical ingress endpoints before touching root token authorities."
      };
    }

    if (q.includes('why is this p1') || q.includes('why is payment gateway p1') || q.includes('p1')) {
      return {
        observation: "Asset ranked P1 — Immediate Planning with a Composite Risk Score of 92 / 100.",
        evidence: "7-factor model score: Quantum Vulnerability (23/25), Business Criticality (20/20 root auth truth), Data Sensitivity (18/20 citizen PII), External Exposure (13/15 public SSO), Dependency Complexity (8/10), Migration Complexity (6/10), Cryptographic Strength (4/10).",
        implication: "High internet exposure paired with root identity authority maximizes both likelihood and impact of retrospective decrypt/forge attacks.",
        recommendation: "Schedule immediate migration planning architecture review in Q4 2026 to align with CNSA 2.0 timeline requirements."
      };
    }

    if (q.includes('migration approach') || q.includes('what migration approach should be evaluated') || q.includes('candidate')) {
      return {
        observation: "Cryptographic role is Digital Signature & Authentication, not key encapsulation.",
        evidence: "Usage pattern is session token generation and validation. NIST standards specify FIPS 204 (ML-DSA) for digital signatures and FIPS 203 (ML-KEM) for key encapsulation.",
        implication: "Naive algorithm swaps fail because signature payload size expands from 256 bytes (RSA) to 2,420–3,293 bytes (ML-DSA-44/65), impacting network MTU and token cookies.",
        recommendation: "Candidate Approach: Evaluate ML-DSA (FIPS 204). Implement dual-signature tokens during transition. For separate key establishment assets (e.g. Payment Gateway), evaluate ML-KEM (FIPS 203)."
      };
    }

    return {
      observation: `Analytical evaluation grounded in active ${currentTab.toUpperCase()} context.`,
      evidence: `Cryptographic entity ${selectedArtefact?.name ?? 'RSA-2048'} impacts 7 applications and 12 services across enterprise inventory.`,
      implication: "Classical asymmetric primitives require phased replacement under CNSA 2.0 and FIPS 203/204 guidelines.",
      recommendation: "Validate ripple impacts in What-If Impact Simulator and inspect candidate migration options in the Migration Roadmap."
    };
  };

  const handleUserSubmit = (queryText?: string) => {
    const textToSend = queryText ?? input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      query: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    const analysis = generateStructuredResponse(textToSend);

    const assistantMsg: ChatMessage = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      analysis,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    if (!queryText) setInput('');
  };

  if (!isCopilotOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-defense-950/70 backdrop-blur-[2px] select-none">
      <div className="w-full max-w-xl bg-defense-900 border-l border-defense-700 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 font-mono">
        {/* Header (Requirement #11) */}
        <div className="p-3.5 border-b border-defense-700 bg-defense-850 flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-sm font-bold tracking-wider text-slate-100 uppercase">
                ECDAT Intelligence
              </h2>
              <span className="text-[9px] px-1 py-0.2 rounded border border-cyan-700/50 bg-cyan-950/40 text-cyan-300">
                Security Analyst Mode
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              "Evidence-grounded analysis from enterprise cryptographic inventory."
            </p>
          </div>

          <button
            onClick={() => setIsCopilotOpen(false)}
            className="p-1 rounded hover:bg-defense-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inquiry Pills (Requirement #11) */}
        <div className="p-2.5 border-b border-defense-700 bg-defense-950/60 flex flex-wrap gap-1.5">
          {inquiryPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleUserSubmit(pill)}
              className="px-2 py-1 rounded-sm border border-defense-700 hover:border-cyan-600/50 bg-defense-900 hover:bg-defense-800 text-[10px] text-slate-300 hover:text-cyan-300 transition-colors text-left"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-md p-2.5 rounded-sm border border-defense-700 bg-defense-800 text-slate-200 text-xs">
                    <div className="text-[9px] text-slate-400 mb-0.5 uppercase">Inquiry // {msg.timestamp}</div>
                    <div className="font-sans text-[11px]">{msg.query}</div>
                  </div>
                </div>
              );
            }

            if (msg.analysis) {
              return (
                <div key={msg.id} className="border border-defense-700 bg-defense-950/80 rounded-sm p-3 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-defense-700/60 pb-1 text-[10px] text-slate-400">
                    <span className="text-cyan-400 font-bold uppercase">Intelligence Assessment</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* OBSERVATION */}
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>Observation</span>
                    </div>
                    <p className="text-[11px] text-slate-200 font-sans pl-3 leading-relaxed">
                      {msg.analysis.observation}
                    </p>
                  </div>

                  {/* EVIDENCE */}
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Evidence</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans pl-3 leading-relaxed">
                      {msg.analysis.evidence}
                    </p>
                  </div>

                  {/* IMPLICATION */}
                  <div className="space-y-0.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>Implication</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans pl-3 leading-relaxed">
                      {msg.analysis.implication}
                    </p>
                  </div>

                  {/* RECOMMENDATION */}
                  <div className="space-y-0.5 pt-1 border-t border-defense-700/50">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Recommendation</span>
                    </div>
                    <p className="text-[11px] text-emerald-300 font-sans pl-3 leading-relaxed">
                      {msg.analysis.recommendation}
                    </p>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-defense-700 bg-defense-850">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSubmit();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask an analytical question..."
              className="flex-1 bg-defense-900 border border-defense-700 rounded-sm px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-3 py-1.5 rounded-sm bg-defense-800 hover:bg-defense-750 disabled:opacity-40 text-slate-200 border border-defense-700 text-xs font-mono font-bold uppercase transition-colors"
            >
              Analyze
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
