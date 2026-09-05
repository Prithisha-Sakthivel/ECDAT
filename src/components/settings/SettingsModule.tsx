import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Check } from 'lucide-react';
import { DEMO_ORGANIZATION } from '../../data/mockData';

export const SettingsModule: React.FC = () => {
  const [fipsStrict, setFipsStrict] = useState<boolean>(true);
  const [cnsa2Compliance, setCnsa2Compliance] = useState<boolean>(true);
  const [continuousScan, setContinuousScan] = useState<boolean>(true);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-defense-950 overflow-y-auto font-mono">
      {/* Header */}
      <div className="p-4 border-b border-defense-700/80 bg-defense-900/90 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
                Security & Policy Configuration
              </h1>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-defense-700 bg-defense-850 text-slate-300">
                L4 Clearance Required
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Manage cryptographic assurance baselines, regulatory schemas, and simulation environment parameters.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full p-4 space-y-4">
        {savedNotice && (
          <div className="p-2.5 rounded-sm bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>Configuration parameters successfully updated.</span>
          </div>
        )}

        <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide border-b border-defense-700 pb-2">
            Cryptographic Assurance Standards
          </h3>

          <div className="space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between p-2.5 rounded-sm bg-defense-850 border border-defense-700">
              <div>
                <p className="font-bold text-slate-200 font-mono text-[11px]">Enforce FIPS 203 & 204 Candidate Standards</p>
                <p className="text-slate-400 text-xs mt-0.5">Strictly map post-quantum candidate key establishment and digital signature algorithms to ML-KEM and ML-DSA.</p>
              </div>
              <input
                type="checkbox"
                checked={fipsStrict}
                onChange={(e) => setFipsStrict(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer shrink-0 ml-3"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-sm bg-defense-850 border border-defense-700">
              <div>
                <p className="font-bold text-slate-200 font-mono text-[11px]">Commercial National Security Algorithm (CNSA 2.0) Rules</p>
                <p className="text-slate-400 text-xs mt-0.5">Flag all 2048-bit RSA, ECDSA P-256, and SHA-1 implementations as requiring immediate migration prioritization.</p>
              </div>
              <input
                type="checkbox"
                checked={cnsa2Compliance}
                onChange={(e) => setCnsa2Compliance(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer shrink-0 ml-3"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-sm bg-defense-850 border border-defense-700">
              <div>
                <p className="font-bold text-slate-200 font-mono text-[11px]">Autonomous Telemetry & Heuristic Scanners</p>
                <p className="text-slate-400 text-xs mt-0.5">Continuously analyze AST trees and binary headers in background simulation cycles.</p>
              </div>
              <input
                type="checkbox"
                checked={continuousScan}
                onChange={(e) => setContinuousScan(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer shrink-0 ml-3"
              />
            </div>
          </div>
        </div>

        <div className="border border-defense-700 bg-defense-900 rounded-sm p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide border-b border-defense-700 pb-2">
            Target Organization & Simulation Environment
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-sm bg-defense-850 border border-defense-700">
              <span className="text-[10px] text-slate-400 uppercase">Target Enterprise</span>
              <p className="text-slate-200 font-bold mt-0.5">{DEMO_ORGANIZATION}</p>
            </div>

            <div className="p-2.5 rounded-sm bg-defense-850 border border-defense-700">
              <span className="text-[10px] text-slate-400 uppercase">Simulation Guardrails</span>
              <p className="text-slate-300 font-sans text-xs mt-0.5">
                Synthetic demonstration mode active. No actual government network credentials or real production infrastructure accessed.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-sm bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
