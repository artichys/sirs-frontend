import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardManajemen = () => {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk menarik data laporan utilisasi dari backend
  const fetchLaporan = async () => {
    try {
      // Menarik laporan untuk bulan 05 tahun 2026 (Bisa dibuat dinamis dengan input filter jika mau)
      const response = await axios.get('http://localhost:8080/api/laporan/utilisasi?bulan=05&tahun=2026');
      setLaporan(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil laporan:", error);
      setLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchLaporan();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#34495e', borderRadius: '10px', marginTop: '30px', color: 'white' }}>
      <h2 style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '10px', marginBottom: '20px' }}>
        📊 Dashboard Direksi (Laporan Utilisasi Ruangan)
      </h2>
      
      <p style={{ marginBottom: '20px', color: '#bdc3c7' }}>Periode Laporan: Mei 2026</p>

      {loading ? (
        <p>Memuat laporan...</p>
      ) : (
        <table border="1" width="100%" cellPadding="12" style={{ borderCollapse: 'collapse', backgroundColor: '#2c3e50' }}>
          <thead style={{ backgroundColor: '#e67e22', color: 'white' }}>
            <tr>
              <th>ID Ruangan</th>
              <th>Nama Ruangan</th>
              <th>Total Sesi Jadwal Aktif</th>
              <th>Total Pasien Dilayani</th>
              <th>Status Utilisasi</th>
            </tr>
          </thead>
          <tbody>
            {laporan && laporan.length > 0 ? (
              laporan.map((item) => (
                <tr key={item.id_ruangan} style={{ textAlign: 'center' }}>
                  <td>{item.id_ruangan}</td>
                  <td style={{ fontWeight: 'bold' }}>{item.nama_ruangan}</td>
                  <td>{item.total_jadwal} Sesi</td>
                  <td style={{ fontSize: '18px', fontWeight: 'bold', color: '#2ecc71' }}>{item.total_pasien} Pasien</td>
                  <td>
                    {/* Logika sederhana: Jika pasien >= 10, ruangan sibuk. Jika tidak, sepi */}
                    <span style={{
                      padding: '5px 10px', 
                      borderRadius: '5px',
                      backgroundColor: item.total_pasien >= 10 ? '#e74c3c' : '#f39c12',
                      color: 'white'
                    }}>
                      {item.total_pasien >= 10 ? 'Padat' : 'Normal / Sepi'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Belum ada data transaksi bulan ini.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardManajemen;