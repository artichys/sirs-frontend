import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonitorAntrean = () => {
  // Hardcode ID Jadwal untuk simulasi (misal: Poliklinik Anak Ruang 01)
  const idJadwal = 1;
  const [antrean, setAntrean] = useState([]);
  const [waktu, setWaktu] = useState(new Date());

  // Polling data dari Backend
  const fetchAntrean = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/monitor/antrean/${idJadwal}`);
      setAntrean(response.data.data);
    } catch (error) {
      console.error("Gagal memuat data", error);
    }
  };

  useEffect(() => {
    fetchAntrean();
    const intervalData = setInterval(fetchAntrean, 3000); // Refresh data tiap 3 detik
    const intervalWaktu = setInterval(() => setWaktu(new Date()), 1000); // Refresh jam tiap detik

    return () => {
      clearInterval(intervalData);
      clearInterval(intervalWaktu);
    };
  }, []);

  // Memisahkan pasien yang "Diperiksa" dan yang "Menunggu"
  const pasienDiperiksa = antrean?.find(p => p.status_booking === 'Diperiksa');
  const pasienMenunggu = antrean?.filter(p => p.status_booking === 'Menunggu') || [];

  // Format jam (HH:MM)
  const jamFormat = waktu.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const tanggalFormat = waktu.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      
      {/* HEADER Tampilan TV */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px', backgroundColor: 'white', borderBottom: '2px solid #e0e0e0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#1565c0', color: 'white', padding: '15px', borderRadius: '10px', fontSize: '30px' }}>🏥</div>
          <div>
            <h1 style={{ margin: 0, color: '#0d47a1', fontSize: '40px' }}>Poliklinik Anak - Ruang 01</h1>
            <p style={{ margin: 0, color: '#7f8c8d', fontSize: '20px' }}>Central Hospital Unit • MedSystem Pro</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h1 style={{ margin: 0, color: '#0d47a1', fontSize: '50px' }}>{jamFormat}</h1>
          <p style={{ margin: 0, color: '#7f8c8d', fontSize: '20px', fontWeight: 'bold' }}>{tanggalFormat}</p>
        </div>
      </header>

      {/* KONTEN UTAMA (Kiri: Media, Kanan: Antrean) */}
      <main style={{ display: 'flex', flex: 1, padding: '40px 50px', gap: '40px' }}>
        
        {/* Sisi Kiri: Video & Informasi */}
        <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ flex: 1, backgroundColor: '#000', borderRadius: '15px', overflow: 'hidden', position: 'relative' }}>
            {/* Placeholder Gambar/Video Dokter */}
            <img src="https://images.unsplash.com/photo-1605684954998-685c79d6a018?auto=format&fit=crop&w=800&q=80" alt="Video Edukasi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ backgroundColor: '#1565c0', color: 'white', padding: '30px', borderRadius: '15px' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>Tips Kesehatan Anak</h2>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.5' }}>Pentingnya imunisasi dasar lengkap untuk tumbuh kembang optimal.</p>
          </div>
        </div>

        {/* Sisi Kanan: Panel Antrean */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Kartu Antrean Utama (Sedang Dilayani) */}
          <div style={{ backgroundColor: '#2e7d32', color: 'white', padding: '50px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(46, 125, 50, 0.3)' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px 30px', borderRadius: '30px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '20px' }}>
              SEDANG DILAYANI
            </div>
            {pasienDiperiksa ? (
              <>
                <h1 style={{ margin: 0, fontSize: '120px', fontWeight: '900', letterSpacing: '5px' }}>
                  A-{String(pasienDiperiksa.nomor_antrean).padStart(3, '0')}
                </h1>
                <h2 style={{ margin: '10px 0 0 0', fontSize: '45px', textTransform: 'uppercase' }}>
                  {pasienDiperiksa.nama_pasien}
                </h2>
              </>
            ) : (
              <>
                <h1 style={{ margin: 0, fontSize: '120px', fontWeight: '900' }}>---</h1>
                <h2 style={{ margin: '10px 0 0 0', fontSize: '45px' }}>SILAKAN TUNGGU</h2>
              </>
            )}
          </div>

          {/* Antrean Berikutnya */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #bdc3c7', paddingBottom: '10px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#1565c0', fontSize: '22px' }}>ANTREAN BERIKUTNYA</h3>
              <span style={{ color: '#7f8c8d', fontSize: '20px' }}>Sisa: {pasienMenunggu.length} Pasien</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {pasienMenunggu.slice(0, 4).map((pasien) => (
                <div key={pasien.id_booking} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '16px' }}>Pasien</p>
                    <h2 style={{ margin: 0, color: '#0d47a1', fontSize: '35px' }}>A-{String(pasien.nomor_antrean).padStart(3, '0')}</h2>
                  </div>
                  <div style={{ backgroundColor: '#e3f2fd', color: '#1565c0', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>
                    MENUNGGU
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ padding: '20px 50px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e0e0e0', backgroundColor: 'white', color: '#7f8c8d' }}>
        <div>🟢 Server Connected &nbsp;&nbsp;|&nbsp;&nbsp; 📶 System Latency: 12ms</div>
        <div><strong>MedSystem Pro</strong> | Powered by Central IT Unit</div>
      </footer>

    </div>
  );
};

export default MonitorAntrean;