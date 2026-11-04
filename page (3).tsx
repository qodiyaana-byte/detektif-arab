"use client";
import { useState } from "react";
import { Download, LockKeyhole, RefreshCw, Users } from "lucide-react";
type Row = {id:string;score:number;total:number;created_at:string;players:any;attempt_answers:{category:string;correct:boolean}[]};
export default function GuruPage(){
  const [token,setToken]=useState(""); const [rows,setRows]=useState<Row[]>([]);
  const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const [authorized,setAuthorized]=useState(false);
  async function load(){
    setLoading(true);setError("");
    try{const res=await fetch("/api/reports",{headers:{Authorization:`Bearer ${token}`}});const data=await res.json();if(!res.ok)throw new Error(data.error||"Tidak dapat memuat laporan.");setRows(data.rows);setAuthorized(true);}
    catch(e:any){setError(e.message);setAuthorized(false);}finally{setLoading(false);}
  }
  const average=rows.length?Math.round(rows.reduce((n,r)=>n+(r.total?100*r.score/r.total:0),0)/rows.length):0;
  const exportCsv=()=>{
    const header=["Nama pemain","Kode kelas","Nilai","Benar","Total soal","Tanggal"];
    const data=rows.map(r=>[r.players?.nickname||"",r.players?.class_code||"",Math.round(100*r.score/Math.max(1,r.total)),r.score,r.total,new Date(r.created_at).toLocaleString("id-ID")]);
    const csv=[header,...data].map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const url=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="laporan-detektif-arab.csv";a.click();URL.revokeObjectURL(url);
  };
  return <main className="teacher-page"><header className="teacher-header"><a href="/">← Kembali ke permainan</a><b>Detektif Arab / Dasbor Guru</b></header>
    <section className="teacher-content"><span className="eyebrow">RUANG GURU</span><h1>Rekap hasil belajar siswa</h1><p>Pantau hasil evaluasi dan identifikasi materi yang perlu diperkuat.</p>
    {!authorized?<div className="teacher-login"><LockKeyhole size={30}/><h2>Akses khusus guru</h2><p>Masukkan token dashboard yang telah diatur pada konfigurasi server.</p><input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="Kode akses guru"/><button className="primary full" onClick={load} disabled={!token||loading}>{loading?"Memeriksa...":"Masuk Dashboard"}</button>{error&&<small className="error">{error}</small>}</div>:
    <><div className="teacher-stats"><div><Users/><small>Jumlah pengerjaan</small><b>{rows.length}</b></div><div><span>◎</span><small>Rata-rata nilai</small><b>{average}/100</b></div></div>
      <div className="table-actions"><button className="secondary" onClick={load}><RefreshCw size={16}/> Perbarui</button><button className="primary" onClick={exportCsv}><Download size={16}/> Unduh CSV</button></div>
      <div className="table-wrap"><table><thead><tr><th>Nama pemain</th><th>Kelas</th><th>Nilai</th><th>Jawaban benar</th><th>Tanggal</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.players?.nickname||"—"}</td><td>{r.players?.class_code||"—"}</td><td><b>{Math.round(100*r.score/Math.max(1,r.total))}</b></td><td>{r.score}/{r.total}</td><td>{new Date(r.created_at).toLocaleString("id-ID")}</td></tr>)}</tbody></table>{!rows.length&&<p className="empty">Belum ada hasil evaluasi yang tersimpan.</p>}</div>
      <p className="teacher-note">Catatan: nilai merupakan hasil latihan pada media ini, bukan satu-satunya ukuran kemampuan bahasa Arab siswa.</p>
    </>}</section>
  </main>
}
