import React, { useState } from 'react';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('By Capacity');

  // Data Dummy untuk Tabel Bawah
  const utilizationData = [
    { room: 'Emergency Hall B', staff: '12 Nurses, 4 Doctors', patients: 145, wait: '12m', util: 88, status: 'HIGH LOAD' },
    { room: 'Maternity Suite', staff: '6 Nurses, 2 Doctors', patients: 42, wait: '25m', util: 52, status: 'STABLE' },
    { room: 'Pediatrics Ward', staff: '8 Nurses, 3 Doctors', patients: 89, wait: '18m', util: 74, status: 'STABLE' },
    { room: 'General Checkup 1-5', staff: '10 Nurses, 5 Doctors', patients: 210, wait: '30m', util: 92, status: 'OVERLOAD' },
  ];

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
            <li><a href="/dokter" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Doctor Portal</a></li>
            <li><a href="/admin" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 transition">Admin Panel</a></li>
            {/* ACTIVE MENU: Analytics */}
            <li>
              <a href="/manajemen" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-[#0d3b66] bg-[#e6f0fa] border-l-4 border-[#0d3b66]">
                Analytics
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-slate-200 bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-[#0052cc] flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#0d3b66] truncate">Dr. Amanda Lee</p>
            <p className="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest">Administrator</p>
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
            <button className="p-2 text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-10">
          
          {/* HEADER SECTION */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Analytics Dashboard</h1>
              <p className="text-slate-500 font-medium mt-1">Real-time patient flow and room utilization statistics.</p>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select className="appearance-none bg-white border border-slate-300 text-slate-700 py-3 pl-6 pr-12 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>Mei 2026</option>
                  <option>April 2026</option>
                  <option>Maret 2026</option>
                </select>
                <svg className="w-4 h-4 absolute right-4 top-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <button className="bg-[#0052cc] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition flex items-center gap-2 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Unduh Laporan PDF/Excel
              </button>
            </div>
          </div>

          {/* TOP KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-blue-50 text-[#0052cc] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div className="flex items-center gap-1 text-[#ea580c] font-bold text-xs bg-orange-50 px-2 py-1 rounded-md">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  +12.5%
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Total Pasien Terlayani</p>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">2,840</h2>
              </div>
              {/* Progress bar line at bottom */}
              <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0052cc] w-[70%] rounded-full"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                  Critical Load
                </span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Ruangan Paling Sibuk</p>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">ICU - Block A</h2>
                <p className="text-xs text-slate-400 mt-1 italic">98% Capacity Reached</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-orange-50 text-[#ea580c] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="flex items-center gap-1 text-[#0052cc] font-bold text-xs bg-blue-50 px-2 py-1 rounded-md">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                  -4m
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Average Waiting Time</p>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">18.5 Min</h2>
                <p className="text-xs text-slate-400 mt-1">Target: &lt; 20 Minutes</p>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION (CHART & ROOM AVAILABILITY) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* LEFT: CHART */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">Patients Served Per Department</h3>
                <button className="text-slate-400 hover:text-slate-700">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </button>
              </div>
              
              {/* CSS-based Bar Chart representation */}
              <div className="h-64 flex items-end justify-between gap-2 border-b border-slate-100 pb-2 px-4 relative">
                {/* Y-Axis lines (Decorative) */}
                <div className="absolute w-full border-t border-slate-100 bottom-1/4 left-0"></div>
                <div className="absolute w-full border-t border-slate-100 bottom-2/4 left-0"></div>
                <div className="absolute w-full border-t border-slate-100 bottom-3/4 left-0"></div>

                {/* Bars */}
                <div className="w-1/6 flex flex-col items-center gap-2 z-10 group">
                  <div className="w-full max-w-[60px] bg-[#0052cc] rounded-t-md h-[55%] transition-all duration-300 group-hover:bg-blue-800"></div>
                </div>
                <div className="w-1/6 flex flex-col items-center gap-2 z-10 group">
                  <div className="w-full max-w-[60px] bg-[#0052cc] rounded-t-md h-[80%] transition-all duration-300 group-hover:bg-blue-800"></div>
                </div>
                <div className="w-1/6 flex flex-col items-center gap-2 z-10 group">
                  <div className="w-full max-w-[60px] bg-[#0052cc] rounded-t-md h-[40%] transition-all duration-300 group-hover:bg-blue-800"></div>
                </div>
                <div className="w-1/6 flex flex-col items-center gap-2 z-10 group">
                  <div className="w-full max-w-[60px] bg-[#0052cc] rounded-t-md h-[90%] transition-all duration-300 group-hover:bg-blue-800"></div>
                </div>
                <div className="w-1/6 flex flex-col items-center gap-2 z-10 group">
                  <div className="w-full max-w-[60px] bg-[#0052cc] rounded-t-md h-[65%] transition-all duration-300 group-hover:bg-blue-800"></div>
                </div>
                <div className="w-1/6 flex flex-col items-center gap-2 z-10 group">
                  <div className="w-full max-w-[60px] bg-[#0052cc] rounded-t-md h-[30%] transition-all duration-300 group-hover:bg-blue-800"></div>
                </div>
              </div>
              
              {/* X-Axis Labels */}
              <div className="flex justify-between px-4 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                <span className="w-1/6">General</span>
                <span className="w-1/6">Pediatrics</span>
                <span className="w-1/6">Dental</span>
                <span className="w-1/6">ICU</span>
                <span className="w-1/6">ER</span>
                <span className="w-1/6">Lab</span>
              </div>

              {/* Legend */}
              <div className="flex justify-center items-center gap-8 mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0052cc]"></div>
                  <span className="text-sm text-slate-600 font-medium">Active Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                  <span className="text-sm text-slate-600 font-medium">Discharged</span>
                </div>
              </div>
            </div>

            {/* RIGHT: ROOM AVAILABILITY */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Room Availability</h3>
              
              <div className="flex-1 space-y-4">
                <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h4 className="font-bold text-slate-900">Surgery Hall A</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Occupied</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h4 className="font-bold text-slate-900">Dental Unit 2</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Available</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#0052cc]"></div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h4 className="font-bold text-slate-900">Radiology RM 4</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Maintenance</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                     <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-4 border border-blue-200 bg-blue-50 text-[#0052cc] font-bold rounded-xl hover:bg-blue-100 transition">
                Manage All Units
              </button>
            </div>
          </div>

          {/* BOTTOM SECTION: TABLE */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Room Utilization Breakdown</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('By Department')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition border ${activeTab === 'By Department' ? 'bg-blue-50 text-[#0052cc] border-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                >
                  By Department
                </button>
                <button 
                  onClick={() => setActiveTab('By Capacity')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition border ${activeTab === 'By Capacity' ? 'bg-blue-50 text-[#0052cc] border-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                >
                  By Capacity
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-5">ROOM NAME</th>
                    <th className="px-8 py-5">STAFF ASSIGNED</th>
                    <th className="px-8 py-5">DAILY PATIENTS</th>
                    <th className="px-8 py-5">AVG. WAIT</th>
                    <th className="px-8 py-5 w-64">UTILIZATION</th>
                    <th className="px-8 py-5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {utilizationData.map((data, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition">
                      <td className="px-8 py-6 font-medium text-slate-900">{data.room}</td>
                      <td className="px-8 py-6 text-slate-600">{data.staff}</td>
                      <td className="px-8 py-6 font-bold text-slate-800">{data.patients}</td>
                      <td className="px-8 py-6 text-slate-600">{data.wait}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0052cc] rounded-full" style={{ width: `${data.util}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-8">{data.util}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                          data.status === 'HIGH LOAD' || data.status === 'OVERLOAD' ? 'bg-[#fef2f2] text-red-600 border border-red-100' :
                          'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          {data.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/50 p-6 text-center">
              <a href="#" className="text-[#0052cc] font-bold text-sm hover:underline">View All Departmental Data</a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;