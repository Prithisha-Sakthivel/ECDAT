import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X } from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, setCurrentTab } = useApp();

  if (!isNotificationsOpen) return null;

  const alerts = [
    {
      id: 'alt-1',
      title: 'CRITICAL: RSA-2048 Deprecation Flagged',
      desc: 'Shor algorithm vulnerability affects Identity Management Service and Payment Gateway. 7 downstream applications affected.',
      type: 'critical',
      time: '12m ago',
      tab: 'graph'
    },
    {
      id: 'alt-2',
      title: 'SECURITY: 46 Unknown Cryptographic Implementations Detected',
      desc: 'Static-analysis scanner identified non-standard S-box substitution matrices and custom Feistel loops in legacy-erp.',
      type: 'warning',
      time: '45m ago',
      tab: 'unknown'
    },
    {
      id: 'alt-3',
      title: 'PROTOCOL: TLS 1.2 Handshake Downgrades Monitored',
      desc: 'External API Gateway reverse proxy observed 8.4% legacy cipher negotiation on incoming banking integration endpoints.',
      type: 'info',
      time: '2h ago',
      tab: 'simulator'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px] flex items-start justify-center pt-20 px-4 font-mono select-none">
      <div className="w-full max-w-lg bg-defense-900 border border-defense-700 rounded-sm shadow-2xl overflow-hidden flex flex-col">
        <div className="p-3 border-b border-defense-700 bg-defense-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wide">Threat & Telemetry Notifications</h3>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1 rounded hover:bg-defense-800 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 space-y-2 max-h-96 overflow-y-auto text-xs">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              onClick={() => {
                setIsNotificationsOpen(false);
                setCurrentTab(alt.tab as any);
              }}
              className="p-2.5 rounded-sm bg-defense-850 hover:bg-defense-800 border border-defense-700 cursor-pointer transition-colors space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold ${
                  alt.type === 'critical' ? 'text-red-400' : alt.type === 'warning' ? 'text-amber-400' : 'text-cyan-400'
                }`}>
                  {alt.title}
                </span>
                <span className="text-[9px] text-slate-500">{alt.time}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-snug">{alt.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-2.5 border-t border-defense-700 bg-defense-850 text-[10px] text-slate-400 flex items-center justify-between">
          <span>All telemetry synchronized</span>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="text-cyan-400 hover:underline"
          >
            Mark all read
          </button>
        </div>
      </div>
    </div>
  );
};
