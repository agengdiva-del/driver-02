/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';

// Dedicated Driver Views
import { DriverPortalView } from './components/driver/DriverPortalView';
import { DriverWalletView } from './components/driver/DriverWalletView';
import { DriverHistoryView } from './components/driver/DriverHistoryView';
import { DriverProfileView } from './components/driver/DriverProfileView';
import { DriverNotificationsView } from './components/driver/DriverNotificationsView';

// Driver Modals
import { DriverRegistrationModal } from './components/driver/DriverRegistrationModal';
import { ChatModal } from './components/chat/ChatModal';

const AppContent: React.FC = () => {
  const { currentView, isDeviceFrame } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'cockpit':
      case 'driver':
      case 'orders':
        return <DriverPortalView />;
      case 'wallet':
        return <DriverWalletView />;
      case 'history':
        return <DriverHistoryView />;
      case 'notifications':
        return <DriverNotificationsView />;
      case 'profile':
      case 'account':
        return <DriverProfileView />;
      default:
        return <DriverPortalView />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-900 dark:text-slate-100 flex justify-center items-center ${isDeviceFrame ? 'py-2 sm:py-6' : 'p-0'}`}>
      {/* Smartphone mockup container */}
      <div
        className={`w-full bg-slate-50 dark:bg-slate-950 transition-all flex flex-col relative ${
          isDeviceFrame
            ? 'max-w-[400px] h-[844px] rounded-[48px] shadow-2xl border-[10px] border-slate-900 ring-1 ring-white/10 overflow-hidden'
            : 'max-w-md mx-auto min-h-screen shadow-lg'
        }`}
      >
        {/* BAR ATAS BAWAAN HP (STATUS BAR NATIVE) */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 text-white pt-2.5 pb-1 px-6 flex items-center justify-between text-[11px] font-semibold tracking-tight shrink-0 select-none z-40">
          {/* Jam Status Bar */}
          <span className="font-bold tracking-tight text-white/95 w-12 text-left">09:41</span>
          
          {/* Kamera Depan / Dynamic Island Cutout */}
          <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-end pr-2.5 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-blue-950/80 border border-blue-900/60" />
          </div>

          {/* Sinyal, Wifi & Baterai HP */}
          <div className="flex items-center gap-1.5 w-12 justify-end text-white/95">
            {/* Sinyal Seluler 4 Bar */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M2 20h2v-4H2v4zm4 0h2v-8H6v8zm4 0h2V8h-2v12zm4 0h2V4h-2v16z"/>
            </svg>
            {/* Wi-Fi */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.5 0 6.67 1.34 9.07 3.53L12 19.34 2.93 11.03C5.33 8.84 8.5 7.5 12 7.5z"/>
            </svg>
            {/* Baterai */}
            <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
              <div className="h-full w-full bg-emerald-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Header Aplikasi AWD */}
        <Header />

        {/* Area Konten Utama Driver */}
        <main className="flex-1 px-3 py-3 overflow-y-auto overscroll-contain pb-6">
          {renderActiveView()}
        </main>

        {/* Navigasi Bawah */}
        <BottomNav />

        {/* BAR BAWAAH BAWAAN HP (HOME GESTURE BAR) */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md pt-1 pb-2 flex justify-center items-center shrink-0 z-30 select-none">
          <div className="w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
        </div>

        {/* Modals */}
        <DriverRegistrationModal />
        <ChatModal />
        <ToastContainer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
