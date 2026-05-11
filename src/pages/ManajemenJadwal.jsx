import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManajemenJadwal = () => {
  // --- STATE UNTUK DOKTER ---
  const [idDokter, setIdDokter] = useState('');
  const [idRuangan, setIdRuangan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jamMulai, setJamMulai] = useState('');
  const [jamSelesai, setJamSelesai] = useState('');

  // --- STATE UNTUK ADMIN ---
  const [daftarJadwal, setDaftarJadwal] = useState([]);

  const fetchJadwal = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/jadwal');
      setDaftarJadwal(response.data.data);
    } catch (error) {
      console.error("Gagal menarik data jadwal", error);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  // Fungsi Dokter Mengajukan Jadwal
  const handlePengajuan = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/jadwal', {
        id_dokter: parseInt(idDokter),
        id_ruangan: parseInt(idRuangan),
        tanggal: tanggal,
        jam_mulai: jamMulai + ":00", // Format MySQL HH:MM:SS
        jam_selesai: jamSelesai + ":00"
      });
      alert("Jadwal berhasil diajukan! Menunggu validasi Admin.");
      fetchJadwal(); // Refresh tabel admin
    } catch (error) {
      alert("Gagal mengajukan jadwal.");
    }
  };

  // Fungsi Admin Validasi Jadwal
  const handleApprove = async (idJadwal) => {
    try {
      await axios.put(`http://localhost:8080/api/jadwal/${idJadwal}/approve`);
      alert("Jadwal berhasil divalidasi!");
      fetchJadwal(); // Refresh tabel
    } catch (error) {
      // Menangkap respon error 409 Conflict dari backend
      if (error.response && error.response.status === 409) {
        alert("VALIDASI DITOLAK: " + error.response.data.error);
      } else {
        alert("Terjadi kesalahan sistem saat validasi.");
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', marginTop: '30px', border: '1px solid #bdc3c7' }}>
      <h2 style={{ color: '#8e44ad', borderBottom: '2px solid #9b59b6', paddingBottom: '10px' }}>
        📅 Portal Pengelolaan Jadwal (Fase 1)
      </h2>

      <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
        
        {/* KOLOM KIRI: Portal Dokter */}
        <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#2980b9' }}>Portal Dokter: Ajukan Jadwal</h3>
          <form onSubmit={handlePengajuan}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <label>ID Dokter:</label>
                <input type="number" value={idDokter} onChange={(e)=>setIdDokter(e.target.value)} required style={{ width: '100%', padding: '5px' }}/>
              </div>
              <div>
                <label>ID Ruangan:</label>
                <input type="number" value={idRuangan} onChange={(e)=>setIdRuangan(e.target.value)} required style={{ width: '100%', padding: '5px' }}/>
              </div>
              <div>
                <label>Tanggal:</label>
                <input type="date" value={tanggal} onChange={(e)=>setTanggal(e.target.value)} required style={{ width: '100%', padding: '5px' }}/>
              </div>
              <div>
                <label>Jam Mulai:</label>
                <input type="time" value={jamMulai} onChange={(e)=>setJamMulai(e.target.value)} required style={{ width: '100%', padding: '5px' }}/>
              </div>
              <div style={{ gridColumn: '1 / span 2' }}>
                <label>Jam Selesai:</label>
                <input type="time" value={jamSelesai} onChange={(e)=>setJamSelesai(e.target.value)} required style={{ width: '100%', padding: '5px' }}/>
              </div>
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#8e44ad', color: 'white', border: 'none', cursor: 'pointer' }}>Ajukan Praktik</button>
          </form>
        </div>

        {/* KOLOM KANAN: Dashboard Admin */}
        <div style={{ flex: 2, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
          <h3 style={{ color: '#c0392b' }}>Portal Admin: Validasi Jadwal</h3>
          <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: 'collapse', textAlign: 'center', backgroundColor: 'white' }}>
            <thead style={{ backgroundColor: '#c0392b', color: 'white' }}>
              <tr>
                <th>ID</th>
                <th>Tgl</th>
                <th>Waktu</th>
                <th>Ruangan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarJadwal.map(j => (
                <tr key={j.id_jadwal}>
                  <td>{j.id_jadwal}</td>
                  <td>{j.tanggal.substring(0, 10)}</td>
                  <td>{j.jam_mulai} - {j.jam_selesai}</td>
                  <td>Ruang {j.id_ruangan}</td>
                  <td style={{ color: j.status_jadwal === 'Confirmed' ? '#27ae60' : '#f39c12', fontWeight: 'bold' }}>
                    {j.status_jadwal}
                  </td>
                  <td>
                    {j.status_jadwal === 'Draft' ? (
                      <button onClick={() => handleApprove(j.id_jadwal)} style={{ padding: '5px 10px', backgroundColor: '#2ecc71', color: 'white', border: 'none', cursor: 'pointer' }}>Validasi</button>
                    ) : (
                      <span>✔️ Disetujui</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManajemenJadwal;