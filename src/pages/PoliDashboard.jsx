import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- ICONS ---
const IconMic = () => <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>;
const IconCheck = () => <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
const IconSkip = () => <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>;

const PoliDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('queue'); // 'queue', 'records', 'detail'
  const [selectedPatient, setSelectedPatient] = useState(null); // Menyimpan data pasien untuk halaman detail

  // State untuk Halaman Queue (Antrean Real-time)
  const idJadwal = 1; 
  const [antrean, setAntrean] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Data Dummy untuk Patient Records Database (Sesuai Gambar 2)
  const patientRecords = [
    { rm: 'RM-10045', name: 'Eleanor Vance', gender: 'Female', dob: '12 May 1982', lastVisit: '10 Oct 2023' },
    { rm: 'RM-10046', name: 'Marcus Holloway', gender: 'Male', dob: '05 Nov 1975', lastVisit: '12 Oct 2023' },
    { rm: 'RM-10047', name: 'Sarah Connor', gender: 'Female', dob: '28 Feb 1990', lastVisit: '14 Oct 2023' },
    { rm: 'RM-10048', name: 'John Smith', gender: 'Male', dob: '15 Aug 1968', lastVisit: '15 Oct 2023' },
  ];

  // --- LOGIC FUNGSI ANTREAN (Tetap sama seperti sebelumnya) ---
  const fetchAntrean = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/monitor/antrean/${idJadwal}`);
      if (response.data && response.data.data) {
        setAntrean(response.data.data);
      }
    } catch (error) {
      console.error("Gagal memuat data dari API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (idBooking, statusBaru) => {
    try {
      await axios.put(`http://localhost:8080/api/booking/${idBooking}/status`, { status_booking: statusBaru });
      fetchAntrean();
    } catch (error) {
      alert(`Gagal Update! Cek koneksi backend.`);
    }
  };

  useEffect(() => {
    fetchAntrean();
    const intervalData = setInterval(fetchAntrean, 3000);
    return () => clearInterval(intervalData);
  }, []);

  const pasienDiperiksa = antrean.find(p => p.status_booking === 'Diperiksa');
  const pasienMenunggu = antrean.filter(p => p.status_booking === 'Menunggu');
  
  // --- NAVIGATION HANDLERS ---
  const handleViewDetail = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('detail');
  };

  // --- RENDER VIEWS ---

  // VIEW 1: QUEUE MANAGEMENT (Sesuai Gambar 1)
  const renderQueueManagement = () => (
    <div className="animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Card dr. Andi */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-[#0052cc] rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">dr. Andi Sp.A</h2>
              <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                Ruangan 01
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-[#0052cc] tracking-widest uppercase mb-1">ANTREAN SAAT INI</p>
            <h1 className="text-7xl font-black text-[#0052cc] tracking-tighter">
              {pasienDiperiksa ? `A-${String(pasienDiperiksa.nomor_antrean).padStart(3, '0')}` : 'A-024'}
            </h1>
          </div>
        </div>

        {/* Card Sisa Antrean */}
        <div className="bg-[#0d3b66] rounded-2xl p-8 flex flex-col items-center justify-center text-white shadow-lg">
          <p className="text-xs font-bold opacity-80 tracking-widest uppercase">SISA ANTREAN</p>
          <h1 className="text-[100px] font-black leading-none tracking-tighter my-2">{pasienMenunggu.length || 8}</h1>
          <p className="text-sm font-medium opacity-90 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Pasien Menunggu
          </p>
        </div>
      </div>

      {/* Tabel Antrean Pasien */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="px-8 py-5 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#0d3b66]">Daftar Antrean Pasien</h3>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-lg text-sm flex items-center hover:bg-slate-50 transition">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
              Filter
            </button>
            <button onClick={fetchAntrean} className="px-5 py-2.5 bg-[#0052cc] text-white font-bold rounded-lg text-sm flex items-center hover:bg-blue-800 transition">
              <svg className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Refresh Data
            </button>
          </div>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
            <tr>
              <th className="px-8 py-4">NO. ANTREAN</th>
              <th className="px-8 py-4">NO. RM</th>
              <th className="px-8 py-4">NAMA PASIEN</th>
              <th className="px-8 py-4">STATUS</th>
              <th className="px-8 py-4 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Fallback dummy data if API is empty to show the design */}
            {(antrean.length > 0 ? antrean.filter(p => p.status_booking !== 'Selesai') : [
              { id_booking: 991, nomor_antrean: 24, nomor_rekam_medis: '24-11-0082', nama_pasien: 'Ananda Rizky Pratama', status_booking: 'Diperiksa' },
              { id_booking: 992, nomor_antrean: 25, nomor_rekam_medis: '24-11-0083', nama_pasien: 'Siti Aminah Zahra', status_booking: 'Menunggu' },
              { id_booking: 993, nomor_antrean: 26, nomor_rekam_medis: '24-11-0085', nama_pasien: 'Budi Satria Utama', status_booking: 'Menunggu' },
              { id_booking: 994, nomor_antrean: 27, nomor_rekam_medis: '24-11-0090', nama_pasien: 'Dewi Lestari Kusuma', status_booking: 'Menunggu' },
            ]).map((pasien) => (
              <tr key={pasien.id_booking} className="hover:bg-slate-50 transition">
                <td className="px-8 py-5">
                  <span className="text-xl font-black text-[#0052cc] tracking-tight">
                    A-{String(pasien.nomor_antrean).padStart(3, '0')}
                  </span>
                </td>
                <td className="px-8 py-5 text-slate-500 font-medium">{pasien.nomor_rekam_medis}</td>
                <td className="px-8 py-5 font-bold text-slate-900 text-base">{pasien.nama_pasien}</td>
                <td className="px-8 py-5">
                  {pasien.status_booking === 'Diperiksa' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#dcfce7] text-[#16a34a]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] mr-1.5 animate-pulse"></span> Diperiksa
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#fef3c7] text-[#d97706]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] mr-1.5"></span> Menunggu
                    </span>
                  )}
                </td>
                <td className="px-8 py-5 text-right space-x-2">
                  {pasien.status_booking === 'Menunggu' ? (
                    <>
                      <button onClick={() => updateStatus(pasien.id_booking, 'Diperiksa')} className="px-4 py-2 bg-[#0d3b66] hover:bg-blue-900 text-white font-bold rounded-lg text-sm transition inline-flex items-center">
                        <IconMic /> Panggil & Periksa
                      </button>
                      <button className="px-4 py-2 bg-white border border-red-200 text-red-500 hover:bg-red-50 font-bold rounded-lg text-sm transition inline-flex items-center">
                        <IconSkip /> Lewati
                      </button>
                    </>
                  ) : (
                    <button onClick={() => updateStatus(pasien.id_booking, 'Selesai')} className="px-6 py-2 bg-[#10b981] hover:bg-green-600 text-white font-bold rounded-lg text-sm transition inline-flex items-center">
                      <IconCheck /> Selesai
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Metric Cards Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm flex flex-col items-center">
          <div className="text-[#0052cc] mb-3"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Rata-Rata Layanan</p>
          <h2 className="text-5xl font-black text-[#0d3b66] tracking-tighter">12 <span className="text-xl">mnt</span></h2>
          <p className="text-xs text-slate-400 mt-2 font-medium">Per pasien hari ini</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm flex flex-col items-center">
          <div className="text-[#c2410c] mb-3"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Pasien Dilewati</p>
          <h2 className="text-5xl font-black text-[#c2410c] tracking-tighter">2</h2>
          <p className="text-xs text-slate-400 mt-2 font-medium">Memerlukan tindak lanjut</p>
        </div>

        <div className="bg-[#0052cc] rounded-2xl p-8 shadow-sm flex flex-col justify-between text-white">
          <div>
            <h3 className="text-xl font-bold mb-3">Informasi Poli</h3>
            <p className="text-sm opacity-90 leading-relaxed">Jadwal dokter berakhir pukul 14:00 WIB. Pastikan semua antrean terlayani.</p>
          </div>
          <button className="mt-4 px-6 py-2 border-2 border-white/30 hover:bg-white/10 rounded-lg text-sm font-bold w-max transition">
            Pengumuman
          </button>
        </div>
      </div>
    </div>
  );

  // VIEW 2: PATIENT RECORDS DATABASE (Sesuai Gambar 2)
  const renderPatientRecords = () => (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Patient Records Database</h1>
      
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search by RM Number or Patient Name..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="px-6 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl text-sm flex items-center hover:bg-slate-50 transition">
            <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filter
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">NO. RM</th>
                <th className="px-6 py-4">PATIENT NAME</th>
                <th className="px-6 py-4">GENDER</th>
                <th className="px-6 py-4">DATE OF BIRTH</th>
                <th className="px-6 py-4">LAST VISIT</th>
                <th className="px-6 py-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patientRecords.map((patient, index) => (
                <tr key={index} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900">{patient.rm}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{patient.name}</td>
                  <td className="px-6 py-4 text-slate-500">{patient.gender}</td>
                  <td className="px-6 py-4 text-slate-500">{patient.dob}</td>
                  <td className="px-6 py-4 text-slate-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleViewDetail(patient)} className="text-[#0052cc] font-bold hover:underline text-sm">View Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // VIEW 3: PATIENT DETAIL (Sesuai Gambar 3)
  const renderPatientDetail = () => {
    if (!selectedPatient) return null;
    return (
      <div className="animate-in slide-in-from-right-8 duration-300 pb-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('records')} className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Patient Detail: {selectedPatient.name} ({selectedPatient.rm})</h1>
              <p className="text-slate-500 text-sm mt-1">Last updated: Today, 08:45 AM</p>
            </div>
          </div>
          <button className="px-6 py-3 border border-slate-300 bg-white text-slate-700 font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 shadow-sm transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print Medical Summary
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KIRI: Profile & Medications */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Patient" className="w-32 h-32 rounded-2xl object-cover mb-4 shadow-md" />
              <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedPatient.name}</h2>
              <span className="px-4 py-1.5 bg-[#e6f0fa] text-[#0052cc] rounded-full text-xs font-bold tracking-widest">{selectedPatient.rm}</span>
              
              <div className="w-full border-t border-slate-100 my-6"></div>
              
              <div className="w-full grid grid-cols-2 gap-y-6 text-sm">
                <div>
                  <p className="text-slate-400 font-bold mb-1">Age</p>
                  <p className="font-bold text-slate-800">41 Years</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold mb-1">Gender</p>
                  <p className="font-bold text-slate-800">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold mb-1">Blood Type</p>
                  <p className="font-bold text-red-600 flex items-center gap-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg> O+</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold mb-1">Allergies</p>
                  <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold">Penicillin</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0052cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                Active Medications
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800">Lisinopril</p>
                    <p className="text-xs text-slate-500 mt-1">10mg, Oral, Daily</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800">Atorvastatin</p>
                    <p className="text-xs text-slate-500 mt-1">20mg, Oral, Nightly</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN: Vitals & History */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0052cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                Latest Vitals
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Blood Pressure</p>
                  <h2 className="text-4xl font-black text-slate-900 mb-1">120<span className="text-2xl text-slate-400">/80</span></h2>
                  <p className="text-xs text-slate-500 mb-4">mmHg</p>
                  <span className="text-xs font-bold text-[#0052cc] flex items-center gap-1"><IconCheck /> Normal</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Heart Rate</p>
                  <h2 className="text-4xl font-black text-slate-900 mb-1">72</h2>
                  <p className="text-xs text-slate-500 mb-4">bpm</p>
                  <span className="text-xs font-bold text-[#0052cc] flex items-center gap-1"><IconCheck /> Normal</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Temp</p>
                  <h2 className="text-4xl font-black text-slate-900 mb-1">36.6</h2>
                  <p className="text-xs text-slate-500 mb-4">°C</p>
                  <span className="text-xs font-bold text-[#0052cc] flex items-center gap-1"><IconCheck /> Normal</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">SPO2</p>
                  <h2 className="text-4xl font-black text-slate-900 mb-1">98</h2>
                  <p className="text-xs text-slate-500 mb-4">%</p>
                  <span className="text-xs font-bold text-[#0052cc] flex items-center gap-1"><IconCheck /> Normal</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#0052cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Medical History
                </h3>
                <a href="#" className="text-sm font-bold text-[#0052cc] hover:underline flex items-center">View Full Timeline <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></a>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">DATE</th>
                    <th className="px-6 py-4">DIAGNOSIS / REASON</th>
                    <th className="px-6 py-4">ATTENDING DOCTOR</th>
                    <th className="px-6 py-4 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-5 text-slate-600">Mei 10, 2026</td>
                    <td className="px-6 py-5"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium text-xs">Routine Checkup</span></td>
                    <td className="px-6 py-5 font-bold flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=50&q=80" alt="dr" /></div> Dr. A. Smith</td>
                    <td className="px-6 py-5 text-center text-slate-400 hover:text-slate-800 cursor-pointer"><svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-5 text-slate-600">Jun 05, 2026</td>
                    <td className="px-6 py-5"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-md font-medium text-xs">Hypertension Follow-up</span></td>
                    <td className="px-6 py-5 font-bold flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=50&q=80" alt="dr" /></div> Dr. N. Patel</td>
                    <td className="px-6 py-5 text-center text-slate-400 hover:text-slate-800 cursor-pointer"><svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-5 text-slate-600">Mei 06, 2026</td>
                    <td className="px-6 py-5"><span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-medium text-xs">Mild Sprain (Ankle)</span></td>
                    <td className="px-6 py-5 font-bold flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=50&q=80" alt="dr" /></div> Dr. A. Smith</td>
                    <td className="px-6 py-5 text-center text-slate-400 hover:text-slate-800 cursor-pointer"><svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f9] flex font-sans text-slate-800">
      
      {/* SIDEBAR (Light Theme Sesuai Halaman Resepsionis & Desain Baru) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-20 flex flex-col justify-center px-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-[#0d3b66] tracking-tight">MedSystem Pro</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Central Hospital Unit</p>
        </div>
        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            <li><a href="/resepsionis" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50">Registration</a></li>
            <li><a href="/poli" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-[#0d3b66] bg-[#e6f0fa] border-l-4 border-[#0d3b66]">Nurse Station</a></li>
            <li><a href="/dokter" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50">Doctor Portal</a></li>
            <li><a href="/admin" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50">Admin Panel</a></li>
            <li><a href="/manajemen" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50">Analytics</a></li>
          </ul>
        </nav>
        <div className="p-6 border-t border-slate-200 bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80" alt="Poli" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#0d3b66] truncate">Unit: Poli Anak</p>
            <p className="text-xs text-slate-500 truncate">Shift: Morning</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER DENGAN TAB NAVIGASI */}
        <header className="h-20 bg-white border-b border-slate-200 flex justify-between items-center px-8 shrink-0">
          <div className="flex items-center gap-12">
            <h2 className="text-[#0d3b66] text-2xl font-black tracking-tighter">Nurse Dashboard</h2>
            
            {/* Hanya Tampilkan Tab jika bukan di halaman Detail */}
            {activeTab !== 'detail' && (
              <nav className="flex gap-6 h-20 items-end">
                <button 
                  onClick={() => setActiveTab('queue')}
                  className={`pb-4 px-1 border-b-[3px] font-bold text-sm transition-colors ${activeTab === 'queue' ? 'border-[#0052cc] text-[#0052cc]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Queue Management
                </button>
                <button 
                  onClick={() => setActiveTab('records')}
                  className={`pb-4 px-1 border-b-[3px] font-bold text-sm transition-colors ${activeTab === 'records' ? 'border-[#0052cc] text-[#0052cc]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Patient Records
                </button>
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search RM or Name..." className="pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#0052cc]" />
              <svg className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200"><img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-full h-full object-cover" /></div>
          </div>
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-10">
          {activeTab === 'queue' && renderQueueManagement()}
          {activeTab === 'records' && renderPatientRecords()}
          {activeTab === 'detail' && renderPatientDetail()}
        </div>

      </main>
    </div>
  );
};

export default PoliDashboard;