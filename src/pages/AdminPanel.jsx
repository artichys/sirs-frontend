import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [jadwal, setJadwal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE UNTUK MODAL REJECT ---
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // --- FUNGSI MENGAMBIL DATA DARI BACKEND ---
  const fetchSemuaJadwal = async () => {
    setIsLoading(true);
    try {
      // Endpoint untuk mengambil semua jadwal (dari semua dokter)
      const response = await axios.get('https://sirs-backend.onrender.com/api/jadwal');
      setJadwal(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data jadwal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSemuaJadwal();
  }, []);

  // --- FUNGSI SETUJUI (APPROVE) ---
  const handleApprove = async (id) => {
    if (!window.confirm("Yakin ingin menyetujui jadwal ini?")) return;

    try {
      await axios.put(`https://sirs-backend.onrender.com/api/jadwal/${id}/status`, {
        status_jadwal: 'Confirmed'
      });
      alert(`Jadwal ID ${id} berhasil DISETUJUI.`);
      fetchSemuaJadwal(); // Refresh tabel
    } catch (error) {
      alert("Gagal menyetujui jadwal: " + (error.response?.data?.message || error.message));
    }
  };

  // --- FUNGSI TOLAK (REJECT) ---
  const handleOpenRejectModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectionReason) {
      alert("Mohon masukkan alasan penolakan.");
      return;
    }

    try {
      await axios.put(`https://sirs-backend.onrender.com/api/jadwal/${selectedId}/status`, {
        status_jadwal: 'Rejected',
        catatan: rejectionReason // Opsional: jika database Anda ingin menyimpan alasannya
      });
      
      alert(`Jadwal ID ${selectedId} berhasil DITOLAK.`);
      setShowModal(false);
      setRejectionReason("");
      fetchSemuaJadwal(); // Refresh tabel
    } catch (error) {
      alert("Gagal menolak jadwal: " + (error.response?.data?.message || error.message));
    }
  };

  // Helper function untuk mengambil inisial nama dokter (Misal: "Dr. Andi" -> "DA")
  const getInitials = (name) => {
    if (!name) return "DR";
    const words = name.replace("Dr. ", "").replace("dr. ", "").split(" ");
    if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f9] flex font-sans text-slate-800">
      
      {/* SIDEBAR (TETAP SAMA SEPERTI SEBELUMNYA) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-20 flex flex-col justify-center px-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-[#0d3b66] tracking-tight">MedSystem Pro</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Central Hospital Unit</p>
        </div>
        
        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            <li><a href="/resepsionis" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Registration</a></li>
            <li><a href="/poli" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Nurse Station</a></li>
            <li><a href="/dokter" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Doctor Portal</a></li>
            <li><a href="/admin" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-[#0d3b66] bg-[#e6f0fa] border-l-4 border-[#0d3b66]">Admin Panel</a></li>
            <li><a href="/manajemen" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Analytics</a></li>
          </ul>
        </nav>

        <div className="p-6 border-t border-slate-200 bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Admin Staff" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#0d3b66] truncate">Admin Staff</p>
            <p className="text-xs text-slate-500 truncate">Unit Tata Usaha</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex justify-between items-center px-8 shrink-0">
          <h2 className="text-[#0d3b66] text-2xl font-black tracking-tighter">Hospital Management</h2>
          <div className="flex items-center gap-4">
            <button onClick={fetchSemuaJadwal} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg text-sm hover:bg-slate-200 transition">
              {isLoading ? 'Loading...' : 'Refresh Data'}
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-10">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Validasi Jadwal Dokter</h1>
            <p className="text-slate-500 font-medium mt-1">Confirm or reject new scheduling requests from medical staff.</p>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-5">DOCTOR NAME</th>
                    <th className="px-8 py-5">DATE</th>
                    <th className="px-8 py-5">TIME SLOT</th>
                    <th className="px-8 py-5">ROOM</th>
                    <th className="px-8 py-5">STATUS</th>
                    <th className="px-8 py-5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jadwal.length === 0 ? (
                     <tr><td colSpan="6" className="text-center py-8 text-slate-500">Tidak ada data jadwal ditemukan.</td></tr>
                  ) : (
                    jadwal.map((item) => (
                      <tr key={item.id_jadwal} className="hover:bg-slate-50 transition">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0052cc] font-black text-xs tracking-wider">
                              {getInitials(item.dokter?.nama_dokter)}
                            </div>
                            <p className="font-bold text-slate-900">{item.dokter?.nama_dokter || `ID Dokter: ${item.id_dokter}`}</p>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-slate-600">
                          {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-8 py-5 text-slate-600">{item.jam_mulai} - {item.jam_selesai}</td>
                        <td className="px-8 py-5 text-slate-600">{item.ruangan?.nama_ruangan || `ID Ruangan: ${item.id_ruangan}`}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                            item.status_jadwal === 'Pending' || item.status_jadwal === 'Draft' ? 'bg-[#ffedd5] text-[#ea580c]' :
                            item.status_jadwal === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.status_jadwal}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right space-x-3">
                          {/* Hanya tampilkan tombol jika statusnya bukan Confirmed/Rejected */}
                          {(item.status_jadwal === 'Pending' || item.status_jadwal === 'Draft') ? (
                            <>
                              <button onClick={() => handleApprove(item.id_jadwal)} className="bg-[#10b981] hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg text-xs transition">
                                Setujui
                              </button>
                              <button onClick={() => handleOpenRejectModal(item.id_jadwal)} className="bg-[#ef4444] hover:bg-red-600 text-white font-bold py-2 px-5 rounded-lg text-xs transition">
                                Tolak
                              </button>
                            </>
                          ) : (
                             <span className="text-slate-400 text-xs font-bold italic">Tervalidasi</span>
                          )}
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

      {/* MODAL ALASAN PENOLAKAN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[450px] border border-slate-200">
            <div className="flex items-center gap-3 text-red-600 mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              <h2 className="text-xl font-bold">Konfirmasi Penolakan</h2>
            </div>
            <p className="text-slate-600 text-sm mb-4">Berikan alasan mengapa jadwal ini ditolak agar dokter dapat melakukan pengajuan ulang.</p>
            <textarea 
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 h-32 mb-6"
              placeholder="Contoh: Ruangan Sedang Direnovasi..."
            ></textarea>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl text-sm transition">Batal</button>
              <button onClick={handleConfirmReject} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-red-100">Kirim Penolakan</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;