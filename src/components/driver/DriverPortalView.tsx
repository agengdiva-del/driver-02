import React, { useState, useEffect } from 'react';
import { 
  Power, 
  MapPin, 
  Navigation, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight, 
  TrendingUp, 
  Bike, 
  Sparkles, 
  Bell, 
  AlertTriangle, 
  Star, 
  Wallet, 
  ArrowUpRight, 
  Compass, 
  User, 
  ShoppingBag, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DriverOrderStep } from '../../types';

export const DriverPortalView: React.FC = () => {
  const {
    driverProfile,
    driverEarnings,
    isDriverOnline,
    toggleDriverOnline,
    driverActiveOrder,
    driverStep,
    advanceDriverStep,
    driverIncomingOrder,
    acceptIncomingDriverOrder,
    rejectIncomingDriverOrder,
    triggerSampleIncomingOrder,
    updateDriverStatus,
    setIsDriverRegistrationModalOpen,
    setIsChatOpen,
    setCurrentView,
    showToast
  } = useApp();

  const [countdown, setCountdown] = useState(30);

  // Hitung mundur penawaran orderan baru (30 detik)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (driverIncomingOrder) {
      setCountdown(30);
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            rejectIncomingDriverOrder();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [driverIncomingOrder]);

  const stepsList: DriverOrderStep[] = [
    'Menuju Merchant',
    'Pesanan Diambil',
    'Menuju Pelanggan',
    'Pesanan Selesai'
  ];

  const currentStepIndex = stepsList.indexOf(driverStep);
  const isApproved = driverProfile?.status === 'Disetujui';

  return (
    <div className="space-y-3 pb-6 text-xs text-slate-800 dark:text-slate-100 max-w-md mx-auto">
      
      {/* PERINGATAN BILA AKUN BELUM DISETUJUI */}
      {!isApproved && (
        <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 shadow-xs text-xs ${
          driverProfile?.status === 'Ditolak' 
            ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200'
            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-[11px] font-medium leading-tight">
              {driverProfile?.status === 'Ditolak'
                ? (driverProfile?.rejectionReason || 'Akun dinonaktifkan atau ditolak.')
                : 'Pendaftaran mitra Anda sedang ditinjau.'}
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => setIsDriverRegistrationModalOpen(true)}
              className="px-2 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-700"
            >
              Cek Data
            </button>
            <button
              onClick={() => updateDriverStatus('Disetujui')}
              className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700"
              title="Aktifkan akun untuk demo"
            >
              Aktifkan
            </button>
          </div>
        </div>
      )}

      {/* RINGKASAN HARIAN DRIVER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 shadow-xs border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-2 text-left">
        
        {/* Status Kerja */}
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isDriverOnline && isApproved ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Status</span>
            <span className="font-extrabold text-[11px] text-slate-900 dark:text-white truncate block mt-0.5">
              {isDriverOnline && isApproved ? 'Siap Order' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Pendapatan Hari Ini */}
        <div 
          onClick={() => setCurrentView('wallet')}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <div className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Hari Ini (90%)</span>
            <span className="font-extrabold text-[11px] text-emerald-600 dark:text-emerald-400 font-mono truncate block mt-0.5">
              Rp {driverEarnings.todayEarnings.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Total Trip */}
        <div 
          onClick={() => setCurrentView('history')}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <div className="p-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Total Antar</span>
            <span className="font-extrabold text-[11px] text-slate-900 dark:text-white font-mono truncate block mt-0.5">
              {driverEarnings.totalTrips} Pesanan
            </span>
          </div>
        </div>

        {/* Saldo Dompet */}
        <div 
          onClick={() => setCurrentView('wallet')}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <div className="p-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 shrink-0">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">Dompet</span>
            <span className="font-extrabold text-[11px] text-slate-900 dark:text-white font-mono truncate block mt-0.5">
              Rp {driverEarnings.driverWalletBalance.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

      </div>

      {/* ORDERAN MASUK (POP-UP HITUNG MUNDUR 30 DETIK) */}
      {driverIncomingOrder && (
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-0.5 rounded-2xl shadow-lg">
          <div className="bg-white dark:bg-slate-900 rounded-[14px] p-3 space-y-2.5 text-slate-800 dark:text-white text-xs">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600">
                  <Bell className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-orange-600 block leading-none">
                    Pesanan Baru Masuk!
                  </span>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {driverIncomingOrder.orderNumber}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-black text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900">
                ⏱ {countdown}d
              </span>
            </div>

            {/* Rute Penjemputan & Pengantaran */}
            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                <div className="font-extrabold text-blue-600 dark:text-blue-400 text-[10px] uppercase">1. Ambil di Resto:</div>
                <div className="font-bold text-xs truncate mt-0.5">{driverIncomingOrder.merchantName}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{driverIncomingOrder.merchantAddress}</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase">2. Antar ke Pelanggan:</div>
                <div className="font-bold text-xs truncate mt-0.5">{driverIncomingOrder.deliveryAddress.recipientName}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{driverIncomingOrder.deliveryAddress.streetAddress}</div>
              </div>
            </div>

            {/* Ringkasan Menu */}
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[11px] flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 truncate">
                {driverIncomingOrder.items.map(i => `${i.product.name} (${i.quantity}x)`).join(', ')}
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0 ml-2">
                18 Menit
              </span>
            </div>

            {/* Komisi Bersih & Tombol Keputusan */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between gap-3">
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-100 block leading-tight">
                  Pendapatan Bersih (90%)
                </span>
                <span className="text-base font-black font-mono">
                  Rp {Math.round(driverIncomingOrder.deliveryFee * 0.9).toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={rejectIncomingDriverOrder}
                  className="py-1.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition"
                >
                  Lewati
                </button>
                <button
                  onClick={acceptIncomingDriverOrder}
                  className="py-1.5 px-4 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-black text-xs shadow-md transition transform active:scale-95"
                >
                  Terima
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ORDERAN YANG SEDANG BERJALAN */}
      {driverActiveOrder ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-xs border border-slate-200/80 dark:border-slate-800 space-y-2.5">
          
          {/* TAHAP PENGANTARAN */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-blue-600 dark:text-blue-400 font-black text-xs">
                  {driverActiveOrder.orderNumber}
                </span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  Upah: <strong>Rp {Math.round(driverActiveOrder.deliveryFee * 0.9).toLocaleString('id-ID')}</strong>
                </span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-[10px] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                Langkah {currentStepIndex + 1} dari 4
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {stepsList.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={step}
                    className={`p-1.5 rounded-xl text-center border transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 font-black shadow-xs ring-1 ring-blue-400/30'
                        : isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 font-bold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 font-medium'
                    }`}
                  >
                    <div className="text-[8px] uppercase tracking-wide leading-none mb-0.5">
                      {isCompleted ? '✓ Selesai' : isCurrent ? '▶ Aktif' : `${idx + 1}`}
                    </div>
                    <div className="text-[9px] leading-tight truncate">
                      {step === 'Menuju Merchant' ? 'Ke Resto' :
                       step === 'Pesanan Diambil' ? 'Ambil Menu' :
                       step === 'Menuju Pelanggan' ? 'Ke Pemesan' : 'Selesai'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KARTU RESTO & PEMESAN */}
          <div className="space-y-2 text-xs">
            
            {/* Resto Box */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              driverStep === 'Menuju Merchant' || driverStep === 'Pesanan Diambil'
                ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-extrabold uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  <span>1. LOKASI RESTO / PENJUAL</span>
                </span>
                <button
                  onClick={() => showToast('Menghubungi Resto...', 'info')}
                  className="p-1 rounded-md bg-white dark:bg-slate-700 text-blue-600 hover:bg-blue-50 transition border border-slate-200 dark:border-slate-600"
                  title="Telepon Resto"
                >
                  <PhoneCall className="w-3 h-3" />
                </button>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                {driverActiveOrder.merchantName}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {driverActiveOrder.merchantAddress}
              </p>
              <div className="text-[10px] text-slate-600 dark:text-slate-300 font-medium mt-1">
                Menu: {driverActiveOrder.items.map(i => `${i.product.name} (${i.quantity}x)`).join(', ')}
              </div>
            </div>

            {/* Pelanggan Box */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              driverStep === 'Menuju Pelanggan' || driverStep === 'Pesanan Selesai'
                ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>2. ALAMAT TUJUAN PEMESAN</span>
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => showToast(`Telepon: ${driverActiveOrder.deliveryAddress.phone}`, 'info')}
                    className="p-1 rounded-md bg-white dark:bg-slate-700 text-emerald-600 hover:bg-emerald-50 border border-slate-200 dark:border-slate-600"
                    title="Telepon Pelanggan"
                  >
                    <PhoneCall className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="p-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    title="Chat Pelanggan"
                  >
                    <MessageSquare className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                {driverActiveOrder.deliveryAddress.recipientName}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {driverActiveOrder.deliveryAddress.streetAddress}, {driverActiveOrder.deliveryAddress.village}
              </p>
              {driverActiveOrder.deliveryAddress.notes && (
                <p className="text-[9px] font-semibold text-amber-800 dark:text-amber-300 mt-1 bg-amber-50 dark:bg-amber-950/40 p-1 rounded border border-amber-200 dark:border-amber-900 truncate">
                  Patokan: {driverActiveOrder.deliveryAddress.notes}
                </p>
              )}
            </div>

            {/* PETA & NAVIGASI GPS */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-white relative h-32 shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
              
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 30 90 Q 110 20 200 60 T 320 30"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Pin Resto */}
              <div className="absolute left-6 bottom-3 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-blue-600 border border-white flex items-center justify-center shadow-md">
                  <ShoppingBag className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[7px] font-bold bg-blue-900/90 px-1 rounded mt-0.5">Resto</span>
              </div>

              {/* Pin Pelanggan */}
              <div className="absolute right-6 top-3 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-emerald-600 border border-white flex items-center justify-center shadow-md">
                  <User className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[7px] font-bold bg-emerald-900/90 px-1 rounded mt-0.5">Tujuan</span>
              </div>

              {/* Pin Driver */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-lg ring-2 ring-amber-400/30">
                  <Bike className="w-3.5 h-3.5 text-slate-950" />
                </div>
                <span className="text-[7px] font-black bg-amber-500 text-slate-950 px-1 rounded mt-0.5">Posisi Anda</span>
              </div>

              {/* Bar Petunjuk Arah */}
              <div className="absolute top-2 left-2 right-2 bg-slate-950/85 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 flex items-center justify-between text-[9px]">
                <div className="flex items-center gap-1.5 truncate">
                  <Compass className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="font-semibold text-white truncate">
                    {driverStep === 'Menuju Merchant' && 'Lurus 250m ke arah Resto'}
                    {driverStep === 'Pesanan Diambil' && 'Resto berada di sebelah kiri'}
                    {driverStep === 'Menuju Pelanggan' && 'Antar ke alamat pemesan'}
                    {driverStep === 'Pesanan Selesai' && 'Sampai di lokasi tujuan'}
                  </span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${driverActiveOrder.deliveryAddress.latitude},${driverActiveOrder.deliveryAddress.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-1.5 py-0.5 rounded bg-white/15 text-blue-300 font-bold shrink-0 text-[8px] flex items-center gap-0.5"
                >
                  <span>Peta</span>
                  <ExternalLink className="w-2 h-2" />
                </a>
              </div>
            </div>

            {/* TOMBOL LANJUTKAN TAHAP */}
            <button
              onClick={advanceDriverStep}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="truncate">
                {driverStep === 'Menuju Merchant' && 'Tiba di Resto & Ambil Menu'}
                {driverStep === 'Pesanan Diambil' && 'Menu Sesuai, Mulai Antar'}
                {driverStep === 'Menuju Pelanggan' && 'Tiba di Tujuan & Selesaikan'}
                {driverStep === 'Pesanan Selesai' && 'Pesanan Telah Selesai'}
              </span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>

          </div>

        </div>
      ) : (
        /* TAMPILAN STANDBY KETIKA TIDAK ADA PESANAN */
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-xs border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
          <div className="relative w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border border-dashed border-blue-300 dark:border-blue-700">
            {isDriverOnline && isApproved ? (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-25" />
                <Bike className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </>
            ) : (
              <Bike className="w-7 h-7 text-slate-400" />
            )}
          </div>

          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              {isDriverOnline && isApproved ? 'Standby Menunggu Orderan...' : 'Driver Sedang Offline'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-0.5 leading-relaxed">
              {isDriverOnline && isApproved
                ? 'Tetap di posisi siap jalan. Orderan dari resto & warga sekitar Arjawinangun akan langsung berdering.'
                : 'Nyalakan saklar ONLINE di bar atas untuk mulai menerima tawaran pengantaran.'}
            </p>
          </div>

          {isDriverOnline && isApproved && (
            <div className="pt-1 flex items-center justify-center">
              <button
                onClick={triggerSampleIncomingOrder}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition transform active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Simulasi Orderan Masuk</span>
              </button>
            </div>
          )}

          {/* Tips Ringkas */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[10px] text-slate-500 dark:text-slate-400 text-left">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">💡 Komisi 90%</span>
              Upah pengantaran 90% langsung masuk ke dompet Anda setiap orderan selesai.
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">⚡ Respon Cepat</span>
              Orderan masuk memiliki waktu 30 detik. Segera klik Terima Order.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
