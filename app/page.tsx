"use client";
import { useMemo, useState } from "react";
import { BookOpen, Volume2, Star, Trophy, Map, Home, ShieldCheck, ArrowLeft, ArrowRight, LockKeyhole, Users, Sparkles } from "lucide-react";
import { questions, type Question } from "@/lib/questions";

type Screen = "home" | "identity" | "map" | "learn" | "quiz" | "result";
type Player = { id: string; nickname: string; classCode: string };
const missions = [
  { title:"Rumahku", subtitle:"Kenali anggota keluarga", words:["أَبٌ","أُمٌّ","أَخٌ","أُخْتٌ"], icon:"🏡", unlocked:true },
  { title:"Rumah Kakek dan Nenek", subtitle:"Perluas kosakata keluarga", words:["جَدٌّ","جَدَّةٌ"], icon:"🌳", unlocked:true },
  { title:"Ruang Keluarga", subtitle:"Kenali isim dan fi'il", words:["بَيْتٌ","يَلْعَبُ","يَقْرَأُ","يَكْتُبُ"], icon:"🛋️", unlocked:true },
  { title:"Ruang Investigasi", subtitle:"Uji pemahamanmu", words:["هَذَا أَبِي","هَذِهِ أُمِّي"], icon:"🔎", unlocked:true }
];
const wordMeanings: Record<string,string> = {
  "أَبٌ":"Ayah","أُمٌّ":"Ibu","أَخٌ":"Saudara laki-laki","أُخْتٌ":"Saudara perempuan",
  "جَدٌّ":"Kakek","جَدَّةٌ":"Nenek","بَيْتٌ":"Rumah","يَلْعَبُ":"Bermain","يَقْرَأُ":"Membaca","يَكْتُبُ":"Menulis",
  "هَذَا أَبِي":"Ini ayahku","هَذِهِ أُمِّي":"Ini ibuku"
};
const allQuestions = questions;

export default function Page() {
  const [screen,setScreen] = useState<Screen>("home");
  const [nickname,setNickname] = useState("");
  const [classCode,setClassCode] = useState("");
  const [player,setPlayer] = useState<Player|null>(null);
  const [mission,setMission] = useState(0);
  const [wordIndex,setWordIndex] = useState(0);
  const [qIndex,setQIndex] = useState(0);
  const [answers,setAnswers] = useState<{questionId:string;category:string;answer:string;correct:boolean}[]>([]);
  const [selected,setSelected] = useState("");
  const [saving,setSaving] = useState(false);
  const [saved,setSaved] = useState(false);
  const activeQuestions = useMemo(() => allQuestions,[ ]);
  const q = activeQuestions[qIndex];
  const score = answers.filter(a=>a.correct).length;
  const speak = (text:string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA"; utterance.rate = 0.78;
    window.speechSynthesis.speak(utterance);
  };
  const startPlayer = async () => {
    if (!nickname.trim()) return;
    const p = { id: crypto.randomUUID(), nickname: nickname.trim(), classCode: classCode.trim() || "UMUM" };
    setPlayer(p); setScreen("map");
    try {
      await fetch("/api/players",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});
    } catch {}
  };
  const submitAnswer = async () => {
    if (!selected || !q || !player) return;
    const correct = selected === q.answer;
    const record = { questionId:q.id, category:q.category, answer:selected, correct };
    const next = [...answers,record]; setAnswers(next); setSelected("");
    if (qIndex < activeQuestions.length-1) setQIndex(qIndex+1);
    else { setScreen("result"); saveResults(next); }
  };
  const saveResults = async (records: typeof answers) => {
    if (!player) return;
    setSaving(true);
    try {
      const res = await fetch("/api/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerId:player.id,answers:records,score:records.filter(x=>x.correct).length,total:records.length})});
      setSaved(res.ok);
    } catch { setSaved(false); }
    finally { setSaving(false); }
  };
  const beginQuiz = () => { setQIndex(0); setAnswers([]); setSaved(false); setScreen("quiz"); };
  const restart = () => { setScreen("map"); setMission(0); setWordIndex(0); };
  const categoryScore = (category:string) => {
    const items = answers.filter(a=>a.category===category);
    return `${items.filter(a=>a.correct).length}/${items.length}`;
  };

  return <main className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={()=>setScreen("home")}><span className="brand-mark">🔎</span><span><b>Detektif Arab</b><small>مُهِمَّةُ الْأُسْرَةِ</small></span></button>
      <nav><button onClick={()=>setScreen("home")}>Beranda</button><button onClick={()=>setScreen("map")}>Peta Misi</button><a href="/guru">Guru</a></nav>
      <div className="lang-pill">عربي · Indonesia</div>
    </header>

    {screen==="home" && <section className="hero">
      <div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> PETUALANGAN BAHASA ARAB KELAS VII</span>
        <h1>Jadilah Detektif,<br/><em>Temukan Kata!</em></h1>
        <p>Bantu Sami menemukan petunjuk yang hilang. Jelajahi rumah, kenali anggota keluarga, dan pecahkan tantangan bahasa Arab.</p>
        <div className="hero-actions"><button className="primary" onClick={()=>setScreen("identity")}>Mulai Petualangan <ArrowRight size={18}/></button><button className="secondary" onClick={()=>document.getElementById("cara-bermain")?.scrollIntoView({behavior:"smooth"})}>Cara Bermain</button></div>
        <div className="hero-stats"><span><b>4</b> Misi</span><span><b>10</b> Kosakata</span><span><b>2</b> Materi utama</span></div>
      </div>
      <div className="hero-art"><div className="sun"></div><div className="cloud cloud-one"></div><div className="house"><div className="roof"></div><div className="window"></div><div className="door"></div></div><div className="detective">🕵🏻</div><div className="plant">🌿</div><div className="floating-card"><span>أَبٌ</span><small>Ayah</small></div></div>
    </section>}

    {screen==="identity" && <section className="center-panel">
      <div className="panel-emoji">🕵🏻‍♂️</div><span className="eyebrow">IDENTITAS DETEKTIF</span><h2>Siapa nama detektif hari ini?</h2><p>Masukkan nama panggilan dan kode kelas untuk menyimpan hasil petualanganmu.</p>
      <label>Nama panggilan</label><input value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Contoh: Sami01" maxLength={30}/>
      <label>Kode kelas <span className="optional">(opsional)</span></label><input value={classCode} onChange={e=>setClassCode(e.target.value)} placeholder="Contoh: VII-A" maxLength={20}/>
      <button className="primary full" disabled={!nickname.trim()} onClick={startPlayer}>Masuk ke Peta Misi <ArrowRight size={18}/></button>
      <button className="text-button" onClick={()=>setScreen("home")}><ArrowLeft size={16}/> Kembali</button>
    </section>}

    {screen==="map" && <section className="content-section">
      <div className="section-heading"><div><span className="eyebrow">PETA PETUALANGAN</span><h2>Ayo, {player?.nickname || "Detektif"}!</h2><p>Pilih misi dan kumpulkan petunjuk untuk menyelesaikan penyelidikan.</p></div><div className="score-chip"><Star size={18} fill="currentColor"/> {score*10} poin</div></div>
      <div className="map-board"><div className="map-path"></div>{missions.map((m,i)=><button key={m.title} className={`mission-card mission-${i}`} onClick={()=>{setMission(i);setWordIndex(0);setScreen("learn");}}><span className="mission-icon">{m.icon}</span><span className="mission-number">MISI {i+1}</span><b>{m.title}</b><small>{m.subtitle}</small><span className="mission-status">{i===0?"Mulai misi":"Buka misi"} <ArrowRight size={14}/></span></button>)}</div>
      <div className="tip-box"><span>💡</span><p><b>Petunjuk Sami:</b> Dengarkan pelafalan kata Arab, baca artinya, lalu gunakan kata tersebut untuk menyelesaikan tantangan.</p></div>
    </section>}

    {screen==="learn" && <section className="content-section">
      <button className="back-link" onClick={()=>setScreen("map")}><ArrowLeft size={16}/> Kembali ke peta</button>
      <div className="section-heading"><div><span className="eyebrow">MISI {mission+1}</span><h2>{missions[mission].title}</h2><p>{missions[mission].subtitle}</p></div><span className="progress-label">{wordIndex+1} dari {missions[mission].words.length} kata</span></div>
      <div className="learning-card"><div className="learning-illustration">{["🏡","👵🏻👴🏻","🛋️","🔎"][mission]}</div><div className="word-content"><span className="eyebrow">KARTU KOSAKATA</span><div className="arabic-word" dir="rtl">{missions[mission].words[wordIndex]}</div><h3>{wordMeanings[missions[mission].words[wordIndex]] || "Kosakata bahasa Arab"}</h3><button className="audio-button" onClick={()=>speak(missions[mission].words[wordIndex])}><Volume2 size={18}/> Dengarkan pelafalan</button><p className="learning-note">Baca kata Arabnya, dengarkan pelafalannya, lalu ucapkan kembali dengan lantang.</p>
      <div className="word-dots">{missions[mission].words.map((_,i)=><span key={i} className={i<=wordIndex?"active":""}></span>)}</div>
      <button className="primary" onClick={()=>{if(wordIndex<missions[mission].words.length-1)setWordIndex(wordIndex+1);else if(mission<2){setScreen("map");}else beginQuiz();}}>{wordIndex<missions[mission].words.length-1?"Kata Berikutnya":"Selesaikan Materi"} <ArrowRight size={18}/></button></div></div>
      <div className="learning-footer"><BookOpen size={18}/> <span>Ingat: belajar bahasa Arab akan lebih mudah jika kamu melihat, mendengar, membaca, dan menggunakannya.</span></div>
    </section>}

    {screen==="quiz" && q && <section className="quiz-wrap">
      <div className="quiz-top"><button className="back-link" onClick={()=>setScreen("map")}><ArrowLeft size={16}/> Keluar dari tantangan</button><span>SOAL {qIndex+1} / {activeQuestions.length}</span></div>
      <div className="progress-track"><div style={{width:`${(qIndex/activeQuestions.length)*100}%`}}/></div>
      <div className="quiz-card"><span className="eyebrow">{q.category==="mufradat"?"TANTANGAN MUFRADAT":q.category==="isim-fiil"?"TANTANGAN ISIM DAN FI'IL":"TANTANGAN KONTEKS"}</span><h2>{q.prompt}</h2>{q.arabic && <div className="arabic-question" dir="rtl">{q.arabic}<button aria-label="Dengarkan" onClick={()=>speak(q.arabic!)}><Volume2 size={18}/></button></div>}
      <div className="answer-grid">{q.options.map((option,i)=><button key={option} className={`answer-option ${selected===option?"selected":""}`} onClick={()=>setSelected(option)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>
      <button className="primary full" disabled={!selected} onClick={submitAnswer}>Periksa Jawaban <ArrowRight size={18}/></button></div>
    </section>}

    {screen==="result" && <section className="result-panel"><div className="trophy">🏆</div><span className="eyebrow">MISI SELESAI</span><h2>Hebat, Detektif {player?.nickname}!</h2><p>Kamu sudah menyelesaikan tantangan Misi Keluargaku.</p><div className="big-score">{Math.round((score/activeQuestions.length)*100)}<small>/100</small></div><span className="muted">Nilai petualanganmu</span>
      <div className="result-breakdown"><div><span>📚</span><b>{categoryScore("mufradat")}</b><small>Kosakata</small></div><div><span>🧩</span><b>{categoryScore("isim-fiil")}</b><small>Isim dan fi'il</small></div><div><span>💬</span><b>{categoryScore("konteks")}</b><small>Pemahaman konteks</small></div></div>
      <div className="save-status">{saving?"Menyimpan hasil...":saved?"✓ Hasil berhasil disimpan.":"Hasil ditampilkan di perangkat ini. Periksa koneksi dan konfigurasi basis data untuk penyimpanan."}</div>
      <div className="hero-actions centered"><button className="primary" onClick={restart}>Kembali ke Peta</button><button className="secondary" onClick={()=>{setAnswers([]);setQIndex(0);setScreen("quiz");}}>Ulangi Tantangan</button></div>
    </section>}

    <section id="cara-bermain" className="how-section"><span className="eyebrow">BELAJAR SAMBIL BERMAIN</span><h2>Bagaimana cara bermain?</h2><div className="how-grid"><div><span>01</span><b>Kenali misi</b><p>Masuk sebagai detektif dan pilih lokasi petualangan.</p></div><div><span>02</span><b>Pelajari kosakata</b><p>Lihat kartu, baca tulisan Arab, dan dengarkan pelafalannya.</p></div><div><span>03</span><b>Pecahkan tantangan</b><p>Jawab pertanyaan dan buktikan pemahamanmu.</p></div><div><span>04</span><b>Raih penghargaan</b><p>Lihat hasil belajar dan ulangi materi yang perlu dilatih.</p></div></div></section>
    <footer><b>Detektif Arab</b><span>مُهِمَّةُ الْأُسْرَةِ</span><small>Media pembelajaran bahasa Arab • Kelas VII</small></footer>
  </main>;
}
