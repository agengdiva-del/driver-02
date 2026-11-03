import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Power,
  Wallet,
  Sun,
  Moon,
  Smartphone,
  Maximize2,
  Sparkles,
  Star,
  FileText
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    driverProfile,
    driverEarnings,
    isDriverOnline,
    toggleDriverOnline,
    triggerSampleIncomingOrder,
    driverActiveOrder,
    driverIncomingOrder,
    setCurrentView,
    darkMode,
    toggleDarkMode,
    isDeviceFrame,
    toggleDeviceFrame,
    setIsDriverRegistrationModalOpen
  } = useApp();

  const isApproved = driverProfile?.status === 'Disetujui';

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 text-white shadow-xs shrink-0 select-none">
      <div className="w-full px-3 py-2 flex items-center justify-between gap-2 text-xs">
        
        {/* Identitas Driver */}
        <div
          onClick={() => setCurrentView('cockpit')}
          className="cursor-pointer flex items-center gap-2 min-w-0"
          title="Beranda Driver"
        >
          <div className="w-8 h-8 rounded-xl bg-white p-0.5 shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src="/assets/aistudio/Designer_b056b7f0.png"
              alt="AWD Driver"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-white tracking-wide truncate">
                AWD DRIVER
              </span>
              <span className="text-[9px] font-bold bg-amber-400 text-blue-950 px-1 rounded-full uppercase leading-none py-0.5 shrink-0">
                Wong Nangun
              </span>
            </div>
            <p className="text-[10px] text-blue-100 flex items-center gap-1 truncate mt-0.5">
              <span className="font-semibold truncate">{driverProfile?.fullName?.split(' ')[0] || 'Asep'}</span>
              <span>•</span>
              <span className="text-amber-300 font-bold flex items-center shrink-0">
                <Star className="w-2.5 h-2.5 fill-amber-300 inline mr-0.5" />
                {driverProfile?.rating || 4.9}
              </span>
              <span>•</span>
              <span className="text-[9px] bg-white/20 px-1 rounded text-white font-mono shrink-0">
                {driverProfile?.vehiclePlate || 'E 2917 AB'}
              </span>
            </p>
          </div>
        </div>

        {/* Tombol Online / Offline & Order Simulasi */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={toggleDriverOnline}
            disabled={!isApproved}
            className={`px-2.5 py-1 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-xs ${
              !isApproved
                ? 'bg-white/20 text-blue-200 cursor-not-allowed opacity-70'
                : isDriverOnline
                ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 ring-2 ring-emerald-300/60'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
            title={!isApproved ? 'Menunggu verifikasi admin' : isDriverOnline ? 'Klik untuk Offline' : 'Klik untuk Online'}
          >
            <div className={`w-2 h-2 rounded-full ${isDriverOnline && isApproved ? 'bg-slate-950 animate-ping' : 'bg-white/60'}`} />
            <Power className="w-3.5 h-3.5" />
            <span className="font-extrabold tracking-wide">
              {isDriverOnline && isApproved ? 'ONLINE' : 'OFFLINE'}
            </span>
          </button>

          {/* Tombol Demo Order Masuk saat Siap */}
          {isDriverOnline && isApproved && !driverActiveOrder && !driverIncomingOrder && (
            <button
              onClick={triggerSampleIncomingOrder}
              className="px-2 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-[10px] shadow-xs flex items-center gap-1 transition"
              title="Coba orderan baru masuk"
            >
              <Sparkles className="w-3 h-3 text-blue-950" />
              <span>+ Order</span>
            </button>
          )}

          {/* Saldo Dompet Driver */}
          <button
            onClick={() => setCurrentView('wallet')}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 border border-white/20 px-2 py-1 rounded-xl transition text-left"
            title="Buka Dompet Driver"
          >
            <Wallet className="w-3 h-3 text-amber-300 shrink-0" />
            <div className="leading-tight">
              <span className="text-[8px] font-medium text-blue-100 block">
                Saldo
              </span>
              <span className="font-extrabold text-[10px] text-white font-mono">
                Rp {driverEarnings.driverWalletBalance.toLocaleString('id-ID')}
              </span>
            </div>
          </button>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-blue-100" />}
          </button>

          {/* Toggle Ukuran Layar */}
          <button
            onClick={toggleDeviceFrame}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isDeviceFrame ? 'Layar Penuh' : 'Mode HP'}
          >
            {isDeviceFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
