import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('pasien');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // --- DATA KREDENSIAL MANUAL (HARDCODED) UNTUK TESTING ---
  const validCredentials = {
    pasien: { id: 'RM-10045', pass: 'pasien123' },
    dokter: { id: 'NIP-001', pass: 'dokter123' },
    admin: { id: 'ADMIN-01', pass: 'admin123' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Cek apakah input kosong
    if (!userId || !password) {
      alert('Mohon isi ID dan Password!');
      return;
    }

    // 2. Validasi dengan data hardcoded sesuai role yang dipilih
    const correctData = validCredentials[activeRole];
    
    if (userId === correctData.id && password === correctData.pass) {
      // 3a. Jika BENAR: Simpan role ke localStorage
      localStorage.setItem('userRole', activeRole);
      
      // Arahkan ke halaman utama masing-masing
      if (activeRole === 'pasien') {
        navigate('/resepsionis');
      } else if (activeRole === 'dokter') {
        navigate('/poli');
      } else if (activeRole === 'admin') {
        navigate('/admin');
      }
    } else {
      // 3b. Jika SALAH: Tampilkan error
      alert(`ID atau Password SALAH untuk akses ${activeRole.toUpperCase()}!\nSilakan cek kotak Demo Credentials di bawah.`);
    }
  };

  // Fungsi untuk mengganti role dan mereset input
  const changeRole = (role) => {
    setActiveRole(role);
    setUserId('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] font-sans text-slate-800">
      
      {/* TOP HEADER */}
      <header className="h-20 px-8 flex justify-between items-center bg-transparent shrink-0">
        <div className="flex items-center gap-3 text-[#0d3b66]">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-4H5v-2h4V7h2v4h4v2h-4v4z"></path></svg>
          <h1 className="text-2xl font-black tracking-tight">MedSystem Pro</h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          <a href="#" className="hover:text-[#0052cc] transition">Emergency</a>
          <a href="#" className="hover:text-[#0052cc] transition">Find a Doctor</a>
          <button className="px-5 py-2 border border-slate-300 rounded-full hover:bg-slate-100 transition">Help</button>
        </div>
      </header>

      {/* MAIN LOGIN CARD AREA */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          
          {/* HEADER ICON & TITLE */}
          <div className="p-8 pb-4 text-center">
            <div className="w-16 h-16 bg-blue-50 text-[#0052cc] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Portal Login</h2>
            <p className="text-sm text-slate-500">Secure access to MedSystem Pro.</p>
          </div>

          {/* ROLE SELECTOR (TABS) */}
          <div className="px-8 mb-6">
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button 
                type="button"
                onClick={() => changeRole('pasien')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeRole === 'pasien' ? 'bg-white text-[#0052cc] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Pasien
              </button>
              <button 
                type="button"
                onClick={() => changeRole('dokter')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeRole === 'dokter' ? 'bg-white text-[#0052cc] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Dokter
              </button>
              <button 
                type="button"
                onClick={() => changeRole('admin')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeRole === 'admin' ? 'bg-white text-[#0052cc] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="px-8 pb-4 space-y-5">
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {activeRole === 'pasien' ? 'Nomor RM' : activeRole === 'dokter' ? 'ID Dokter / NIP' : 'ID Admin'}
                </label>
                <span className="text-[10px] font-bold text-[#0052cc] uppercase tracking-widest">Required</span>
              </div>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder={activeRole === 'pasien' ? 'RM-10045' : activeRole === 'dokter' ? 'NIP-001' : 'ADMIN-01'} 
                  className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052cc] transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-bold text-[#0052cc] hover:underline uppercase tracking-widest">Get OTP via SMS</a>
              </div>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052cc] transition"
                />
                <button type="button" className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#0d3b66] hover:bg-[#0052cc] text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 mt-2">
              Login to Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </form>

          {/* BOX CONTEKAN KREDENSIAL UNTUK TESTING */}
          <div className="mx-8 mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-[10px] font-black text-[#0052cc] uppercase tracking-widest mb-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Demo Credentials
            </p>
            <div className="text-xs text-slate-600 font-mono space-y-1">
              {activeRole === 'pasien' && <><p>ID   : RM-10045</p><p>Pass : pasien123</p></>}
              {activeRole === 'dokter' && <><p>ID   : NIP-001</p><p>Pass : dokter123</p></>}
              {activeRole === 'admin' && <><p>ID   : ADMIN-01</p><p>Pass : admin123</p></>}
            </div>
          </div>

          {/* BADGES FOOTER */}
          <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-center gap-6">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                HIPAA Compliant
             </div>
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                256-BIT AES
             </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
        <p>© 2026 MedSystem Pro. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-800 transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 transition">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 transition">Accessibility</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;