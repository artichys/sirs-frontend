import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

// Import Pages
import Login from './pages/Login';
import FrontOffice from './pages/FrontOffice';
import MonitorAntrean from './pages/MonitorAntrean';
import PoliDashboard from './pages/PoliDashboard';
import DoctorPortal from './pages/DoctorPortal';
import AdminPanel from './pages/AdminPanel';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import HelpCenter from './pages/HelpCenter';

// --- KOMPONEN PELINDUNG RUTE (RBAC) ---
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(userRole)) {
    if (userRole === 'pasien') return <Navigate to="/resepsionis" replace />;
    if (userRole === 'dokter') return <Navigate to="/poli" replace />;
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
  }

  return element;
};

// --- TOMBOL BANTUAN MENGAMBANG (FLOATING HELP BUTTON) ---
const FloatingHelpButton = () => {
  const location = useLocation();
  
  // Sembunyikan tombol ini jika user berada di halaman Login atau sudah di halaman Bantuan
  if (location.pathname === '/login' || location.pathname === '/bantuan') {
    return null;
  }

  return (
    <Link 
      to="/bantuan" 
      className="fixed bottom-8 right-8 w-14 h-14 bg-[#0d3b66] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#0052cc] hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-50 border-4 border-white/50"
      title="Pusat Bantuan MedSystem Pro"
    >
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </Link>
  );
};

function App() {
  return (
    <Router>
      {/* Panggil tombol mengambangnya di sini agar selalu dirender */}
      <FloatingHelpButton />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* --- RUTE PASIEN --- */}
        <Route path="/resepsionis" element={<ProtectedRoute element={<FrontOffice />} allowedRoles={['pasien']} />} />
        
        {/* --- RUTE DOKTER/PERAWAT --- */}
        <Route path="/poli" element={<ProtectedRoute element={<PoliDashboard />} allowedRoles={['dokter']} />} />
        <Route path="/dokter" element={<ProtectedRoute element={<DoctorPortal />} allowedRoles={['dokter']} />} />

        {/* --- RUTE ADMIN --- */}
        <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} allowedRoles={['admin']} />} />
        <Route path="/manajemen" element={<ProtectedRoute element={<AnalyticsDashboard />} allowedRoles={['admin']} />} />

        {/* --- RUTE BERSAMA --- */}
        <Route path="/bantuan" element={<ProtectedRoute element={<HelpCenter />} allowedRoles={['pasien', 'dokter', 'admin']} />} />
        <Route path="/monitor" element={<ProtectedRoute element={<MonitorAntrean />} allowedRoles={['pasien', 'dokter', 'admin']} />} />
        
        {/* Fallback 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
            <h1 className="text-4xl font-black mb-2">404</h1>
            <p className="text-lg font-medium mb-6">Halaman tidak ditemukan.</p>
            <button onClick={() => {
              localStorage.removeItem('userRole');
              window.location.href = '/login';
            }} className="px-6 py-2 bg-[#0052cc] text-white font-bold rounded-lg hover:bg-blue-800">
              Kembali ke Login
            </button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App; 