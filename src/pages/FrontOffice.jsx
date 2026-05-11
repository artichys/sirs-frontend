import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FrontOffice = () => {
  // --- STATE MANAGEMENT ---
  const [showToast, setShowToast] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSchedules, setActiveSchedules] = useState([]);
  
  // Data Form Registrasi Pasien Baru
  const [regForm, setRegForm] = useState({
    nama_pasien: '',
    no_hp: '',
    tgl_lahir: '' // Opsional sesuai skema DB kamu
  });

  // Data Booking Antrean
  const [bookingData, setBookingData] = useState({
    nomor_rekam_medis: '', // Untuk mencari pasien yang sudah ada
    id_jadwal: ''
  });

  // Data Hasil Booking untuk Struk (Real dari DB)
  const [receiptInfo, setReceiptInfo] = useState(null);

  // --- FETCH DATA AWAL ---
  useEffect(() => {
    // Ambil jadwal dokter yang aktif untuk dropdown
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('https://sirs-backend.onrender.com/api/jadwal'); // Sesuaikan route backend kamu
        setActiveSchedules(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil jadwal:", error);
      }
    };
    fetchSchedules();
  }, []);

  // --- LOGIC FUNCTIONS ---

  // 1. Simpan Pasien Baru ke Database
  const handleRegister = async (e) => {
    e.preventDefault();
    if(!regForm.nama_pasien || !regForm.no_hp) return alert("Nama dan WA wajib diisi");
    
    setIsLoading(true);
    try {
      await axios.post('https://sirs-backend.onrender.com/api/pasien', {
        nama_pasien: regForm.nama_pasien,
        no_hp: regForm.no_hp,
        tipe_pasien: 'Pasien Baru'
      });
      
      setShowToast(true);
      setRegForm({ nama_pasien: '', no_hp: '', tgl_lahir: '' });
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      alert("Gagal registrasi pasien: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Buat Booking & Ambil Data Struk Real
  const handleBooking = async (e) => {
    e.preventDefault();
    if(!bookingData.id_jadwal || !bookingData.nomor_rekam_medis) {
        return alert("Lengkapi No. RM dan Pilih Jadwal");
    }

    setIsLoading(true);
    try {
      // Kirim data ke backend untuk generate antrean
      const response = await axios.post('https://sirs-backend.onrender.com/api/booking', {
        nomor_rekam_medis: bookingData.nomor_rekam_medis,
        id_jadwal: parseInt(bookingData.id_jadwal),
        status_booking: 'Menunggu'
      });

      // Data yang dikembalikan backend (Nomor Antrean, Nama Pasien, Poli, dll)
      const result = response.data.data;
      
      setReceiptInfo({
        nomorAntrean: `A-${String(result.nomor_antrean).padStart(3, '0')}`,
        poli: result.nama_ruangan || 'POLI UMUM',
        namaPasien: result.nama_pasien,
        waktu: new Date().toLocaleString('id-ID'),
        dokter: result.nama_dokter || 'Dokter Jaga'
      });
      
      setShowReceipt(true);
      setBookingData({ nomor_rekam_medis: '', id_jadwal: '' });
    } catch (error) {
      alert("Gagal booking antrean: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f9] flex font-sans text-slate-800 relative">
      
      {/* TOAST SUCCESS */}
      {showToast && (
        <div className="fixed top-8 right-8 z-50 bg-[#0052cc] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          <span className="font-bold text-sm">Pasien Berhasil Didaftarkan</span>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-20 flex flex-col justify-center px-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-[#0d3b66] tracking-tight">MedSystem Pro</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Central Hospital Unit</p>
        </div>
        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            <li><a href="#" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-[#0d3b66] bg-[#e6f0fa] border-l-4 border-[#0d3b66]">Registration</a></li>
            <li><a href="/poli" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Nurse Station</a></li>
            <li><a href="/dokter" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Doctor Portal</a></li>
            <li><a href="/admin" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Admin Panel</a></li>
            <li><a href="/manajemen" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Analytics</a></li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex justify-between items-center px-8 shrink-0">
          <h2 className="text-[#0d3b66] text-2xl font-black tracking-tighter italic">Hospital Management</h2>
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#0d3b66] font-bold">UA</div>
        </header>

        <div className="flex-1 overflow-y-auto p-12">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Receptionist Desk</h1>
            <p className="text-slate-500 font-medium">Register patients and manage clinic bookings.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* PANEL 1: REGISTRASI */}
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-[#0d3b66] mb-8">Registrasi Pasien Baru</h3>
              <form onSubmit={handleRegister} className="space-y-6">
                <input 
                  type="text" placeholder="Nama Lengkap" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                  value={regForm.nama_pasien}
                  onChange={(e) => setRegForm({...regForm, nama_pasien: e.target.value})}
                />
                <input 
                  type="text" placeholder="Nomor WhatsApp" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                  value={regForm.no_hp}
                  onChange={(e) => setRegForm({...regForm, no_hp: e.target.value})}
                />
                <button type="submit" disabled={isLoading} className="w-full bg-[#0d3b66] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition">
                  {isLoading ? 'Menyimpan...' : 'Daftarkan Pasien'}
                </button>
              </form>
            </div>

            {/* PANEL 2: BOOKING */}
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-[#0d3b66] mb-8">Booking & Antrean</h3>
              <form onSubmit={handleBooking} className="space-y-6">
                <input 
                  type="text" placeholder="Masukkan No. Rekam Medis (RM-xxxxx)" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500"
                  value={bookingData.nomor_rekam_medis}
                  onChange={(e) => setBookingData({...bookingData, nomor_rekam_medis: e.target.value})}
                />
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm bg-white"
                  value={bookingData.id_jadwal}
                  onChange={(e) => setBookingData({...bookingData, id_jadwal: e.target.value})}
                >
                  <option value="">Pilih Jadwal Poli Aktif...</option>
                  {activeSchedules.map(s => (
                    <option key={s.id_jadwal} value={s.id_jadwal}>
                      {s.nama_ruangan} - {s.nama_dokter} ({s.jam_mulai} - {s.jam_selesai})
                    </option>
                  ))}
                </select>
                <button type="submit" className="w-full bg-[#0052cc] text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition">
                  {isLoading ? 'Memproses...' : 'Masukkan ke Antrean & Cetak Struk'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* --- RECEIPT MODAL (REAL DATA) --- */}
      {showReceipt && receiptInfo && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in zoom-in duration-300">
            <div className="p-8 pb-4 text-center">
              <h3 className="text-[#0052cc] font-black text-xl">MedSystem Pro</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Central Hospital Unit</p>
            </div>
            <div className="px-10 flex gap-2">
               {[...Array(15)].map((_, i) => <div key={i} className="h-0.5 flex-1 bg-slate-100"></div>)}
            </div>
            <div className="p-8 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">NOMOR ANTREAN</p>
              <h1 className="text-8xl font-black text-[#0d3b66] tracking-tighter mb-2">{receiptInfo.nomorAntrean}</h1>
              <p className="text-[#0d3b66] font-black text-xl uppercase">{receiptInfo.poli}</p>
            </div>
            <div className="px-10 pb-8 space-y-4">
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Nama Pasien:</span>
                  <span className="text-slate-900 font-black text-xs uppercase">{receiptInfo.namaPasien}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Waktu:</span>
                  <span className="text-slate-900 font-black text-xs">{receiptInfo.waktu}</span>
               </div>
               <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">Dokter:</span>
                  <span className="text-slate-900 font-black text-xs uppercase">{receiptInfo.dokter}</span>
               </div>
            </div>
            <div className="p-8 pt-0 flex flex-col gap-3">
              <button onClick={() => window.print()} className="w-full bg-[#0052cc] text-white font-black py-4 rounded-2xl">Print Receipt</button>
              <button onClick={() => setShowReceipt(false)} className="w-full bg-white text-red-500 font-black py-4 rounded-2xl">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontOffice;