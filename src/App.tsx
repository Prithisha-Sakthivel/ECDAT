import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewCommandCenter } from './components/overview/OverviewCommandCenter';
import { DiscoveryModule } from './components/discovery/DiscoveryModule';
import { CryptoInventory } from './components/inventory/CryptoInventory';
import { DependencyGraph } from './components/graph/DependencyGraph';
import { QuantumRiskEngine } from './components/risk/QuantumRiskEngine';
import { ImpactSimulator } from './components/simulator/ImpactSimulator';
import { MigrationRoadmap } from './components/roadmap/MigrationRoadmap';
import { UnknownCryptoModule } from './components/unknown/UnknownCryptoModule';
import { ReportsModule } from './components/reports/ReportsModule';
import { SettingsModule } from './components/settings/SettingsModule';
import { EvidenceLedgerModule } from './components/ledger/EvidenceLedgerModule';
import { PolicyComplianceModule } from './components/policy/PolicyComplianceModule';
import { DecisionTraceModule } from './components/trace/DecisionTraceModule';
import { AttackSurfaceModule } from './components/attack/AttackSurfaceModule';
import { ArtefactDetailDrawer } from './components/inventory/ArtefactDetailDrawer';
import { WowMomentModal } from './components/common/WowMomentModal';
import { ECDATIntelligence } from './components/ai/ECDATIntelligence';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { GuidedDemoOverlay } from './components/common/GuidedDemoOverlay';

export const App: React.FC = () => {
  const { currentTab } = useApp();

  const renderActiveModule = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewCommandCenter />;
      case 'discovery':
        return <DiscoveryModule />;
      case 'inventory':
        return <CryptoInventory />;
      case 'graph':
        return <DependencyGraph />;
      case 'risk':
        return <QuantumRiskEngine />;
      case 'simulator':
        return <ImpactSimulator />;
      case 'roadmap':
        return <MigrationRoadmap />;
      case 'unknown':
        return <UnknownCryptoModule />;
      case 'ledger':
        return <EvidenceLedgerModule />;
      case 'policy':
        return <PolicyComplianceModule />;
      case 'trace':
        return <DecisionTraceModule />;
      case 'attack-surface':
        return <AttackSurfaceModule />;
      case 'reports':
        return <ReportsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <OverviewCommandCenter />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-defense-950 text-slate-100 overflow-hidden font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Bar */}
        <Header />

        {/* Dynamic Module Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {renderActiveModule()}
        </main>
      </div>

      {/* Global Cryptographic Asset SOC Drawer */}
      <ArtefactDetailDrawer />

      {/* Culmination WOW Moment Modal */}
      <WowMomentModal />

      {/* Contextual AI Copilot Drawer */}
      <ECDATIntelligence />

      {/* Guided Walkthrough Overlay for SIH Judges */}
      <GuidedDemoOverlay />

      {/* Global Search & Notifications Overlays */}
      <GlobalSearchModal />
      <NotificationsModal />
    </div>
  );
};
