import React from 'react';

const HelpCenter = () => {
  // Data dummy untuk daftar topik bantuan
  const helpTopics = [
    { 
      id: 1, 
      title: 'Patient Admissions Workflow', 
      desc: 'Step-by-step guides for intake, demographic entry, and insurance verification.',
      isAlert: false 
    },
    { 
      id: 2, 
      title: 'Access & Credentials', 
      desc: 'Password resets, role permissions, and smart card badge assistance.',
      isAlert: false 
    },
    { 
      id: 3, 
      title: 'EHR Navigation', 
      desc: 'Finding patient charts, uploading lab results, and managing clinical notes.',
      isAlert: false 
    },
    { 
      id: 4, 
      title: 'Hardware Support', 
      desc: 'Troubleshooting workstations, barcode scanners, and ward printers.',
      isAlert: false 
    },
    { 
      id: 5, 
      title: 'Incident Reporting', 
      desc: 'Protocols for reporting system outages, data breaches, or critical EHR errors immediately.',
      isAlert: true // Memberikan warna merah pada nomor urut
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f4f7f9] flex font-sans text-slate-800">
      
      {/* SIDEBAR (Light Theme) */}
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
            <li><a href="/admin" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Admin Panel</a></li>
            <li><a href="/manajemen" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Analytics</a></li>
          </ul>
        </nav>

        {/* Profil Sidebar (Menggunakan profil Dr. Hendrawan sebagai contoh) */}
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
        
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex justify-between items-center px-8 shrink-0">
          <h2 className="text-[#0d3b66] text-2xl font-black tracking-tighter">Hospital Management</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search data..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition" />
              <svg className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            
            {/* Tombol Help Center yang Sedang Aktif */}
            <div className="w-9 h-9 rounded-full bg-[#0052cc] text-white flex items-center justify-center shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
               <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-10">
          
          <div className="max-w-4xl mx-auto py-8">
            {/* Title Section */}
            <div className="text-center mb-10">
              <h1 className="text-5xl font-black text-[#0052cc] tracking-tight mb-4">How can we assist you today?</h1>
              <p className="text-slate-500 text-lg">Access documentation, protocols, and IT support for MedSystem Pro.</p>
            </div>

            {/* Giant Search Bar */}
            <div className="relative mb-12 shadow-sm rounded-2xl">
              <svg className="w-6 h-6 absolute left-6 top-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                placeholder="Search for articles, protocols, or IT issues..." 
                className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-16 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#0052cc] transition shadow-sm"
              />
            </div>

            {/* Help Topics List */}
            <div className="space-y-4 mb-10">
              {helpTopics.map((topic) => (
                <div key={topic.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-6 cursor-pointer hover:border-blue-300 hover:shadow-md transition group">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl shrink-0 transition-colors
                    ${topic.isAlert ? 'bg-red-50 text-red-500 group-hover:bg-red-100' : 'bg-[#e6f0fa] text-[#0052cc] group-hover:bg-blue-100'}
                  `}>
                    {topic.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{topic.title}</h3>
                    <p className="text-slate-500 mt-1">{topic.desc}</p>
                  </div>
                  <div className="text-slate-300 group-hover:text-[#0052cc] transition pr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgent Assistance Banner */}
            <div className="bg-[#0052cc] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl shadow-blue-900/20">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Need urgent assistance?</h2>
                <p className="text-blue-100">IT Helpdesk is available 24/7 for critical system issues.</p>
              </div>
              <button className="bg-white text-[#0052cc] font-bold py-4 px-8 rounded-xl flex items-center gap-3 hover:bg-slate-50 transition shadow-sm shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                Call Helpdesk (Ext. 4455)
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default HelpCenter;