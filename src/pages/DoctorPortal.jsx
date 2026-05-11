import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorPortal = () => {
  // Simulasi ID Dokter yang sedang login (Sesuaikan dengan data seeding Anda)
  const idDokter = 1; 

  // --- STATE UNTUK FORM ---
  const [formData, setFormData] = useState({
    id_ruangan: '', // Diubah untuk menyimpan ID, bukan string nama ruangan
    tanggal: '',
    jamMulai: '',
    jamSelesai: '',
    catatan: ''
  });

  // --- STATE UNTUK TABEL RIWAYAT ---
  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // --- FETCH DATA RIWAYAT DARI BACKEND ---
  const fetchRiwayat = async () => {
    setIsFetching(true);
    try {
      // Asumsi route backend Anda untuk mengambil jadwal dokter
      const response = await axios.get(`http://localhost:8080/api/jadwal/dokter/${idDokter}`);
      setRiwayat(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil riwayat pengajuan:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Panggil fetchRiwayat saat halaman pertama kali dimuat
  useEffect(() => {
    fetchRiwayat();
  }, []);

  // --- KIRIM PENGAJUAN KE BACKEND ---
  const handleSubmit = async (e, status) => {
    e.preventDefault();
    if (!formData.id_ruangan || !formData.tanggal || !formData.jamMulai || !formData.jamSelesai) {
      alert("Mohon lengkapi data jadwal (Ruangan, Tanggal, Jam).");
      return;
    }

    setIsLoading(true);
    try {
      // Asumsi route backend Anda untuk membuat jadwal baru
      await axios.post('http://localhost:8080/api/jadwal', {
        id_dokter: idDokter,
        id_ruangan: parseInt(formData.id_ruangan),
        tanggal: formData.tanggal,
        jam_mulai: formData.jamMulai + ":00", // Format standar MySQL time (HH:MM:SS)
        jam_selesai: formData.jamSelesai + ":00",
        status_jadwal: status, // 'Draft' atau 'Pending'
        catatan: formData.catatan
      });

      alert(`Pengajuan berhasil dikirim dengan status: ${status}`);
      
      // Reset Form & Refresh Tabel
      setFormData({ id_ruangan: '', tanggal: '', jamMulai: '', jamSelesai: '', catatan: '' });
      fetchRiwayat();
      
    } catch (error) {
      alert("Gagal mengirim pengajuan: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f9] flex font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-20 flex flex-col justify-center px-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-[#0d3b66] tracking-tight">MedSystem Pro</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Central Hospital Unit</p>
        </div>
        
        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            <li><a href="/resepsionis" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Registration</a></li>
            <li><a href="/poli" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Nurse Station</a></li>
            <li><a href="/dokter" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-[#0d3b66] bg-[#e6f0fa] border-l-4 border-[#0d3b66]">Doctor Portal</a></li>
            <li><a href="/admin" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Admin Panel</a></li>
            <li><a href="/manajemen" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Analytics</a></li>
          </ul>
        </nav>

        <div className="p-6 border-t border-slate-200 bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80" alt="Dr. Hendrawan" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#0d3b66] truncate">Dr. Hendrawan</p>
            <p className="text-xs text-slate-500 truncate">Spesialis Bedah Umum</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white border-b border-slate-200 flex justify-between items-center px-8 shrink-0">
          <h2 className="text-[#0d3b66] text-2xl font-black tracking-tighter">Hospital Management</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search data..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition" />
              <svg className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs overflow-hidden">
               <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80" alt="Dr. Hendrawan" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-10">
          
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Doctor Portal</h1>
              <p className="text-slate-500 font-medium mt-1">Manage your practice schedule and view submission history.</p>
            </div>
            <div className="bg-[#0052cc] text-white px-6 py-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center gap-4">
              <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <div>
                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Active Schedule</p>
                <p className="font-bold mt-0.5">Mon, Wed, Fri - 08:00 to 14:00</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            
            {/* FORM PENGAJUAN */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-[#0052cc] rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </div>
                <h2 className="text-2xl font-black text-[#0d3b66] tracking-tight">Pengajuan Jadwal Praktik</h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Room selection</label>
                    <select 
                      value={formData.id_ruangan}
                      onChange={(e) => setFormData({...formData, id_ruangan: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    >
                      <option value="">Pilih Ruangan...</option>
                      {/* Sesuaikan Value ID ini dengan ID Ruangan di database Anda */}
                      <option value="1">Ruangan 01 (Poli Anak)</option>
                      <option value="2">Poliklinik Bedah A - Lt. 2</option>
                      <option value="3">Poliklinik Bedah B - Lt. 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Date Picker</label>
                    <input 
                      type="date" 
                      value={formData.tanggal}
                      onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Start Time</label>
                    <input 
                      type="time" 
                      value={formData.jamMulai}
                      onChange={(e) => setFormData({...formData, jamMulai: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">End Time</label>
                    <input 
                      type="time" 
                      value={formData.jamSelesai}
                      onChange={(e) => setFormData({...formData, jamSelesai: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button 
                    type="button" 
                    disabled={isLoading}
                    onClick={(e) => handleSubmit(e, 'Draft')}
                    className="px-8 py-4 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
                  >
                    Simpan sebagai Draft
                  </button>
                  <button 
                    type="button" 
                    disabled={isLoading}
                    onClick={(e) => handleSubmit(e, 'Pending')}
                    className="px-8 py-4 bg-[#0052cc] text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    {isLoading ? 'Mengirim...' : 'Kirim Pengajuan'}
                  </button>
                </div>
              </form>
            </div>

            {/* INFO CARDS (TETAP SAMA) */}
            <div className="space-y-6">
              <div className="bg-[#fef2f2] border border-[#fca5a5] rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 text-red-600 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  <h3 className="font-bold">Alasan Penolakan</h3>
                </div>
                <p className="text-sm text-red-700 leading-relaxed mb-6">
                  "Jadwal yang diajukan untuk tanggal 24 Mei berbenturan dengan agenda renovasi. Mohon ajukan kembali untuk ruangan Bedah B."
                </p>
              </div>
            </div>
          </div>

          {/* TABEL RIWAYAT PENGAJUAN */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="px-10 py-6 flex justify-between items-center border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Riwayat Pengajuan</h2>
              <button onClick={fetchRiwayat} className="text-[#0052cc] font-bold text-sm hover:underline flex items-center gap-1">
                {isFetching ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-10 py-5 w-32">ID JADWAL</th>
                    <th className="px-10 py-5">TANGGAL & WAKTU</th>
                    <th className="px-10 py-5">RUANGAN</th>
                    <th className="px-10 py-5 w-40">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {riwayat.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-10 py-8 text-center text-slate-500">Belum ada riwayat pengajuan jadwal.</td>
                    </tr>
                  ) : (
                    riwayat.map((item) => (
                      <tr key={item.id_jadwal} className="hover:bg-slate-50 transition">
                        <td className="px-10 py-6 font-bold text-[#0052cc]">#SCH-{item.id_jadwal}</td>
                        <td className="px-10 py-6">
                          <p className="font-bold text-slate-900">
                            {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </p>
                          <p className="text-slate-500 text-xs mt-1">{item.jam_mulai} - {item.jam_selesai}</p>
                        </td>
                        <td className="px-10 py-6 text-slate-600 font-medium">
                          {item.ruangan?.nama_ruangan || `Ruangan ID: ${item.id_ruangan}`}
                        </td>
                        <td className="px-10 py-6">
                          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border uppercase
                            ${item.status_jadwal === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                              item.status_jadwal === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-200' :
                              item.status_jadwal === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                              'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                            {item.status_jadwal}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DoctorPortal;