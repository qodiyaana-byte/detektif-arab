"use client";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, LockKeyhole, MapPinned, Medal, Sparkles, Trophy, RotateCcw } from "lucide-react";
import { questions, type Question } from "@/lib/questions";

type Screen = "home" | "identity" | "map" | "learn" | "quiz" | "position-result" | "result";
type Player = { id: string; nickname: string; classCode: string };
type AnswerRecord = { questionId: string; category: string; answer: string; correct: boolean };
type PositionScore = { score: number; total: number };
type MaterialCard = { arabic: string; meaning: string; picture: string; note: string };

const learningScenes: Record<number, string> = {
  1: "/images/keluarga.jpg",
  2: "/images/kakek-nenek.jpg",
  3: "/images/ruang-keluarga.jpg",
  4: "/images/ruang-keluarga.jpg",
};

const positions = [
  { id: 1, title: "Rumah Kata", subtitle: "Kosakata kegiatan sehari-hari di rumah", icon: "🏡", color: "sand", kind: "materi" },
  { id: 2, title: "Rahasia Kosakata", subtitle: "Pendalaman kata dan ungkapan sederhana", icon: "🗝️", color: "mint", kind: "materi" },
  { id: 3, title: "Detektif Isim", subtitle: "Mengenali kata benda di sekitar rumah", icon: "🔎", color: "blue", kind: "materi + soal" },
  { id: 4, title: "Misi Perbandingan Isim dan Fi'il", subtitle: "Membedakan nama benda dan kata tindakan", icon: "⚖️", color: "peach", kind: "materi + soal" },
  { id: 5, title: "Tantangan Campuran", subtitle: "10 soal tebak gambar, isim, dan fi'il", icon: "🧩", color: "purple", kind: "10 soal" },
  { id: 6, title: "Misi Detektif", subtitle: "10 soal penerapan dalam konteks", icon: "🧭", color: "blue", kind: "10 soal" },
  { id: 7, title: "Tantangan Final", subtitle: "10 soal evaluasi seluruh materi", icon: "🏆", color: "gold", kind: "10 soal" },
] as const;

const materials: Record<number, MaterialCard[]> = {
  1: [
    { arabic: "أَسْتَيْقِظُ", meaning: "Saya bangun tidur", picture: "🌅", note: "Kegiatan pertama ketika memulai hari." },
    { arabic: "أُصَلِّي", meaning: "Saya salat", picture: "🤲", note: "Ungkapan kegiatan beribadah." },
    { arabic: "أَغْسِلُ وَجْهِي", meaning: "Saya mencuci wajah", picture: "🚿", note: "Kegiatan membersihkan diri pada pagi hari." },
    { arabic: "أَغْسِلُ يَدَيَّ", meaning: "Saya mencuci kedua tangan", picture: "🧼", note: "Biasakan mencuci tangan sebelum makan." },
    { arabic: "أَتَنَاوَلُ الْفُطُورَ", meaning: "Saya sarapan", picture: "🥣", note: "Kegiatan makan pada pagi hari." },
    { arabic: "أَشْرَبُ الْمَاءَ", meaning: "Saya minum air", picture: "🥛", note: "Kegiatan minum untuk memenuhi kebutuhan tubuh." },
    { arabic: "أَقْرَأُ الْكِتَابَ", meaning: "Saya membaca buku", picture: "📚", note: "Kegiatan belajar di rumah." },
    { arabic: "أَكْتُبُ الدَّرْسَ", meaning: "Saya menulis pelajaran", picture: "✍️", note: "Kegiatan mengerjakan atau mencatat pelajaran." },
    { arabic: "أُرَتِّبُ الْغُرْفَةَ", meaning: "Saya merapikan kamar", picture: "🧹", note: "Kegiatan menjaga rumah tetap rapi." },
    { arabic: "أَنَامُ", meaning: "Saya tidur", picture: "🌙", note: "Kegiatan beristirahat pada malam hari." },
  ],
  2: [
    { arabic: "أَنَا أَسْتَيْقِظُ مُبَكِّرًا", meaning: "Saya bangun lebih awal", picture: "⏰", note: "أَنَا berarti saya. أَسْتَيْقِظُ menunjukkan kegiatan bangun tidur." },
    { arabic: "أَنَا أَغْسِلُ يَدَيَّ", meaning: "Saya mencuci kedua tangan", picture: "🫧", note: "Kata أَغْسِلُ menunjukkan tindakan mencuci." },
    { arabic: "أَنَا أَتَنَاوَلُ الْفُطُورَ", meaning: "Saya sarapan", picture: "🍞", note: "الْفُطُورَ berkaitan dengan sarapan atau makanan pagi." },
    { arabic: "أَنَا أَقْرَأُ الْكِتَابَ", meaning: "Saya membaca buku", picture: "📖", note: "الْكِتَابَ adalah benda yang dibaca." },
    { arabic: "أَنَا أُرَتِّبُ الْغُرْفَةَ", meaning: "Saya merapikan kamar", picture: "🛏️", note: "الْغُرْفَةَ berarti kamar. أُرَتِّبُ menunjukkan kegiatan merapikan." },
    { arabic: "أَنَا أَنَامُ لَيْلًا", meaning: "Saya tidur pada malam hari", picture: "🌜", note: "لَيْلًا berarti pada malam hari." },
  ],
  3: [
    { arabic: "الِاسْمُ", meaning: "Pengertian isim", picture: "🏷️", note: "Isim adalah kata yang menunjukkan nama orang, hewan, benda, tempat, atau sesuatu. Contoh: طَالِبٌ (siswa), بَيْتٌ (rumah), مَدْرَسَةٌ (sekolah)." },
    { arabic: "كِتَابٌ ← الْكِتَابُ", meaning: "Ciri isim: tanwin dan ال", picture: "📘", note: "Banyak isim dapat menerima tanwin, seperti كِتَابٌ. Isim juga dapat memakai ال, menjadi الْكِتَابُ." },
    { arabic: "الطَّالِبُ", meaning: "Siswa", picture: "🧑🏻‍🎓", note: "الطَّالِبُ adalah isim karena menamai orang. Isim juga dapat menunjukkan nama orang atau profesi." },
    { arabic: "الْمَدْرَسَةُ", meaning: "Sekolah", picture: "🏫", note: "الْمَدْرَسَةُ adalah isim karena menamai tempat." },
    { arabic: "الْفِعْلُ", meaning: "Pengertian fi'il", picture: "🏃🏻", note: "Fi'il adalah kata yang menunjukkan pekerjaan, tindakan, atau kejadian. Contoh: يَكْتُبُ (menulis), يَقْرَأُ (membaca)." },
    { arabic: "يَكْتُبُ", meaning: "Dia sedang/akan menulis", picture: "✍️", note: "Fi'il mudhari' menunjukkan kegiatan yang sedang atau akan dilakukan. Salah satu cirinya sering diawali أ، ن، ي، atau ت." },
    { arabic: "يَقْرَأُ", meaning: "Dia sedang/akan membaca", picture: "📖", note: "يَقْرَأُ adalah fi'il karena menyatakan tindakan membaca, bukan nama benda." },
  ],
  4: [
    { arabic: "كِتَابٌ", meaning: "Buku (isim)", picture: "📚", note: "Isim menamai benda. Buku dapat dilihat dan dipegang. Kata كِتَابٌ menjawab pertanyaan: benda apa?" },
    { arabic: "يَقْرَأُ", meaning: "Membaca (fi'il)", picture: "📖", note: "Fi'il menunjukkan tindakan. يَقْرَأُ menjawab pertanyaan: sedang melakukan apa?" },
    { arabic: "قَلَمٌ", meaning: "Pena (isim)", picture: "🖊️", note: "قَلَمٌ adalah nama benda sehingga termasuk isim." },
    { arabic: "يَكْتُبُ", meaning: "Menulis (fi'il)", picture: "✍️", note: "يَكْتُبُ menunjukkan tindakan menulis sehingga termasuk fi'il." },
    { arabic: "الطَّالِبُ يَكْتُبُ", meaning: "Siswa sedang menulis", picture: "🧑🏻‍🎓", note: "الطَّالِبُ = isim (orang). يَكْتُبُ = fi'il (tindakan). Satu kalimat dapat memuat keduanya." },
  ],
};

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [nickname, setNickname] = useState("");
  const [classCode, setClassCode] = useState("");
  const [player, setPlayer] = useState<Player | null>(null);
  const [position, setPosition] = useState(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selected, setSelected] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<number, PositionScore>>({});
  const [lastPosition, setLastPosition] = useState(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const activeQuestions = useMemo(() => questions.filter((item) => item.position === position), [position]);
  const currentQuestion: Question | undefined = activeQuestions[questionIndex];
  const currentMaterials = materials[position] || [];
  const totalCorrect = Object.values(scores).reduce((sum, item) => sum + item.score, 0);
  const totalQuestions = Object.values(scores).reduce((sum, item) => sum + item.total, 0);
  const totalScore = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const isUnlocked = (id: number) => id === 1 || completed.includes(id - 1);
  const progress = Math.round((completed.length / 7) * 100);

  const startPlayer = async () => {
    if (!nickname.trim()) return;
    const p = { id: crypto.randomUUID(), nickname: nickname.trim(), classCode: classCode.trim() || "UMUM" };
    setPlayer(p);
    setScreen("map");
    try {
      await fetch("/api/players", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    } catch { /* Permainan tetap dapat berjalan saat penyimpanan belum tersedia. */ }
  };

  const openPosition = (id: number) => {
    if (!isUnlocked(id)) return;
    setPosition(id);
    setCardIndex(0);
    setQuestionIndex(0);
    setSelected("");
    if (id <= 4) setScreen("learn");
    else setScreen("quiz");
  };

  const saveResults = async (records: AnswerRecord[]) => {
    if (!player) return;
    setSaving(true);
    try {
      const response = await fetch("/api/attempts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: player.id, answers: records.map((item) => ({ questionId: item.questionId, answer: item.answer })) }),
      });
      setSaved(response.ok);
    } catch { setSaved(false); }
    finally { setSaving(false); }
  };

  const beginPositionQuiz = () => { setQuestionIndex(0); setSelected(""); setScreen("quiz"); };

  const submitAnswer = () => {
    if (!selected || !currentQuestion || !player) return;
    const record: AnswerRecord = { questionId: currentQuestion.id, category: currentQuestion.category, answer: selected, correct: selected === currentQuestion.answer };
    const nextAnswers = [...answers, record];
    setAnswers(nextAnswers);
    setSelected("");
    if (questionIndex < activeQuestions.length - 1) {
      setQuestionIndex((value) => value + 1);
      return;
    }
    const positionAnswers = nextAnswers.filter((item) => activeQuestions.some((question) => question.id === item.questionId));
    const positionScore = { score: positionAnswers.filter((item) => item.correct).length, total: activeQuestions.length };
    const nextScores = { ...scores, [position]: positionScore };
    const nextCompleted = completed.includes(position) ? completed : [...completed, position];
    setScores(nextScores);
    setCompleted(nextCompleted);
    setLastPosition(position);
    setScreen("position-result");
    if (position === 7) void saveResults(nextAnswers);
  };

  const finishMaterial = () => {
    if (position === 1 || position === 2) beginPositionQuiz();
    else beginPositionQuiz();
  };

  const resetAdventure = () => {
    setPosition(1); setCardIndex(0); setQuestionIndex(0); setAnswers([]); setSelected("");
    setCompleted([]); setScores({}); setSaved(false); setScreen("map");
  };

  const questionLabel = (question: Question) => question.type === "picture" ? "TEBAK GAMBAR" : question.type === "isim" ? "MENGENALI ISIM" : question.type === "fiil" ? "MENGENALI FI'IL" : question.type === "meaning" ? "ARTI KOSAKATA" : "PEMAHAMAN KALIMAT";

  return <main className="app-shell adventure-app">
    <header className="topbar">
      <button className="brand" onClick={() => setScreen(player ? "map" : "home")}><span className="brand-mark">🕵️</span><span><b>Detektif Arab</b><small>مُغَامَرَةُ اللُّغَةِ الْعَرَبِيَّةِ</small></span></button>
      <nav><button onClick={() => setScreen(player ? "map" : "home")}>Beranda</button><a href="/guru">Ruang Guru</a></nav>
      <div className="lang-pill">عربي · Indonesia</div>
    </header>

    {screen === "home" && <section className="hero adventure-hero">
      <div className="hero-copy"><span className="eyebrow"><Sparkles size={15} /> PETUALANGAN BAHASA ARAB KELAS VII</span>
        <h1>Detektif Arab:<br /><em>Misi di Rumah!</em></h1>
        <p>Bantu Sami menjelajahi rumah, menemukan kosakata kegiatan sehari-hari, mengenali isim dan fi'il, lalu menyelesaikan tujuh pos petualangan.</p>
        <div className="hero-actions"><button className="primary" onClick={() => setScreen("identity")}>Mulai Petualangan <ArrowRight size={18} /></button><button className="secondary" onClick={() => document.getElementById("cara-bermain")?.scrollIntoView({ behavior: "smooth" })}>Cara Bermain</button></div>
        <div className="hero-stats"><span><b>7</b> Pos petualangan</span><span><b>56</b> Soal latihan dan evaluasi</span><span><b>Bahasa Arab</b> dan Indonesia</span></div>
      </div>
      <div className="hero-art adventure-art"><img className="hero-reference-image" src="/images/detektif-cover.jpg" alt="Ilustrasi detektif anak menjelajahi rumah keluarga" /></div>
    </section>}

    {screen === "identity" && <section className="center-panel identity-panel">
      <div className="panel-emoji">🕵🏻‍♀️</div><span className="eyebrow">IDENTITAS DETEKTIF</span><h2>Siapa nama detektif hari ini?</h2><p>Masukkan nama panggilan dan kode kelas. Setelah masuk, peta petualangan akan terbuka.</p>
      <label>Nama panggilan</label><input value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="Contoh: Sami01" maxLength={30} />
      <label>Kode kelas <span className="optional">(opsional)</span></label><input value={classCode} onChange={(event) => setClassCode(event.target.value)} placeholder="Contoh: VII-A" maxLength={20} />
      <button className="primary full" disabled={!nickname.trim()} onClick={startPlayer}>Masuk ke Peta Petualangan <ArrowRight size={18} /></button>
      <button className="text-button" onClick={() => setScreen("home")}><ArrowLeft size={16} /> Kembali</button>
    </section>}

    {screen === "map" && <section className="content-section map-screen">
      <div className="map-welcome"><div><span className="eyebrow"><MapPinned size={15} /> PETA PETUALANGAN</span><h2>Siap menjelajah, {player?.nickname || "Detektif"}?</h2><p>Selesaikan setiap pos secara berurutan. Pos berikutnya terbuka setelah pos sebelumnya tuntas.</p></div><div className="map-progress-card"><div className="progress-ring"><b>{completed.length}/7</b></div><span>Pos terselesaikan</span><div className="map-progress-track"><i style={{ width: `${progress}%` }} /></div><small>{progress}% petualangan selesai</small></div></div>
      <div className="adventure-map">
        <div className="map-scenery scenery-one">🌳</div><div className="map-scenery scenery-two">⛰️</div><div className="map-scenery scenery-three">🌴</div><div className="map-river" />
        <svg className="trail-svg" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true"><path d="M110 110 C240 35 300 185 405 170 S550 45 650 140 S810 260 875 365 S690 450 535 390 S310 460 150 365" /></svg>
        {positions.map((item) => {
          const unlocked = isUnlocked(item.id);
          const done = completed.includes(item.id);
          return <button key={item.id} className={`map-stop stop-${item.id} ${unlocked ? "unlocked" : "locked"} ${done ? "done" : ""}`} disabled={!unlocked || done} onClick={() => openPosition(item.id)}>
            <span className="stop-marker">{done ? <Check size={25} /> : unlocked ? item.icon : <LockKeyhole size={22} />}</span>
            <span className="stop-copy"><small>POS {String(item.id).padStart(2, "0")}</small><b>{item.title}</b><em>{done ? "Selesai" : unlocked ? item.kind : "Terkunci"}</em></span>
          </button>;
        })}
        <div className="map-treasure">🏆<small>TAMAT</small></div>
      </div>
      <div className="map-legend"><span><i className="legend-open" /> Pos terbuka</span><span><i className="legend-done" /> Pos selesai</span><span><i className="legend-lock" /> Pos terkunci</span></div>
      <div className="tip-box"><span>🧭</span><p><b>Petunjuk perjalanan:</b> Mulailah dari Pos 1. Pelajari materi, kerjakan cek pemahaman, lalu lanjutkan ke pos berikutnya. Kamu dapat membuka kembali pos yang sudah selesai.</p></div>
    </section>}

    {screen === "learn" && <section className="content-section learning-screen">
      <button className="back-link" onClick={() => setScreen("map")}><ArrowLeft size={16} /> Kembali ke peta</button>
      <div className="learning-heading"><div><span className="eyebrow">POS {String(position).padStart(2, "0")} · TAHAP BELAJAR</span><h2>{positions[position - 1].title}</h2><p>{positions[position - 1].subtitle}</p></div><span className="progress-label">Materi {cardIndex + 1} dari {currentMaterials.length}</span></div>
      <div className="learning-card adventure-learning-card"><div className={`learning-illustration scene-position-${position}`} role="img" aria-label={`Ilustrasi ${currentMaterials[cardIndex]?.meaning}`}><div className="scene-sky"><span>☀️</span><span>☁️</span></div><div className="scene-action">{position === 2 && cardIndex === 0 ? <><span className="scene-bed">🛏️</span><span className="scene-person">🧒🏻</span><span className="scene-clock">05.00</span></> : position === 3 ? <><span>🧑🏻‍🎓</span><span>📚</span></> : position === 4 ? <><span>🧒🏻</span><span>{cardIndex % 2 === 0 ? "📖" : "✍️"}</span></> : <><span>{currentMaterials[cardIndex]?.picture}</span><span className="scene-person">🧒🏻</span></>}</div><div className="scene-caption"><b>{currentMaterials[cardIndex]?.meaning}</b><small>{position === 2 && cardIndex === 0 ? "Pagi hari • siswa bangun dari tempat tidur" : "Amati aktivitas dan benda pada ilustrasi"}</small></div></div><div className="word-content"><span className="eyebrow"><BookOpen size={14} /> KARTU MATERI</span><div className="arabic-word" dir="rtl">{currentMaterials[cardIndex]?.arabic}</div><h3>{currentMaterials[cardIndex]?.meaning}</h3><p className="learning-note">{currentMaterials[cardIndex]?.note}</p>
        <div className="word-dots">{currentMaterials.map((_, index) => <span key={index} className={index <= cardIndex ? "active" : ""} />)}</div>
        <button className="primary" onClick={() => { if (cardIndex < currentMaterials.length - 1) setCardIndex(cardIndex + 1); else finishMaterial(); }}>{cardIndex < currentMaterials.length - 1 ? "Materi Berikutnya" : "Mulai Cek Pemahaman"} <ArrowRight size={18} /></button>
      </div></div>
      {position === 3 && <div className="concept-note"><b>Ingat:</b> Isim menamai orang, benda, tempat, atau sesuatu. Fi'il menunjukkan pekerjaan atau tindakan. Pelajari definisi dan cirinya sebelum mengerjakan soal.</div>}
      {position === 4 && <div className="concept-note"><b>Bandingkan:</b> كِتَابٌ (buku) adalah isim, sedangkan يَقْرَأُ (membaca) adalah fi'il. Isim menjawab “apa/siapa?”, fi'il menjawab “melakukan apa?”.</div>}
    </section>}

    {screen === "quiz" && currentQuestion && <section className="quiz-wrap adventure-quiz-wrap">
      <div className="quiz-top"><button className="back-link" onClick={() => setScreen("map")}><ArrowLeft size={16} /> Kembali ke peta</button><span>POS {position} · SOAL {questionIndex + 1}/{activeQuestions.length}</span></div>
      <div className="progress-track"><div style={{ width: `${((questionIndex + 1) / activeQuestions.length) * 100}%` }} /></div>
      <div className="quiz-card adventure-quiz-card"><div className="quiz-card-meta"><span className="eyebrow">{questionLabel(currentQuestion)}</span><span className="question-counter">{questionIndex + 1} / {activeQuestions.length}</span></div>
        {currentQuestion.type === "picture" && currentQuestion.picture && <div className="question-picture" role="img" aria-label="Ilustrasi petunjuk soal"><span>{currentQuestion.picture}</span></div>}
        <h2>{currentQuestion.prompt}</h2>
        {currentQuestion.type !== "picture" && currentQuestion.picture && <div className="question-picture" role="img" aria-label="Ilustrasi petunjuk soal"><span>{currentQuestion.picture}</span></div>}
        {currentQuestion.type !== "picture" && currentQuestion.arabic && <div className="arabic-question" dir="rtl">{currentQuestion.arabic}</div>}
        <div className="answer-grid">{currentQuestion.options.map((option, index) => <button key={option} className={`answer-option ${selected === option ? "selected" : ""}`} onClick={() => setSelected(option)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
        <button className="primary full" disabled={!selected} onClick={submitAnswer}>{questionIndex === activeQuestions.length - 1 ? position === 7 ? "Selesaikan Petualangan" : "Selesaikan Pos" : "Jawaban Berikutnya"} <ArrowRight size={18} /></button>
      </div>
    </section>}

    {screen === "position-result" && <section className="result-panel position-result-panel"><div className="trophy">{scores[lastPosition]?.score === scores[lastPosition]?.total ? "🌟" : "📝"}</div><span className="eyebrow">HASIL POS {lastPosition}</span><h2>Hasil latihanmu, {player?.nickname}!</h2><div className="big-score">{scores[lastPosition]?.score || 0}<small>/{scores[lastPosition]?.total || 0}</small></div><span className="muted">Jawaban benar</span><div className="wrong-number-summary">Nomor soal yang perlu dipelajari kembali: {activeQuestions.reduce((numbers, question, index) => { const record = answers.find((item) => item.questionId === question.id); if (!record?.correct) numbers.push(index + 1); return numbers; }, [] as number[]).join(", ") || "Tidak ada, semua jawaban benar!"}</div><div className="review-list">{activeQuestions.map((question, index) => { const record = answers.find((item) => item.questionId === question.id); const correct = record?.correct; return <article className={`review-item ${correct ? "review-correct" : "review-wrong"}`} key={question.id}><div className="review-heading"><b>Soal {index + 1}</b><span>{correct ? "✓ Benar" : "✕ Salah"}</span></div><p>{question.prompt}</p>{question.arabic && <div className="review-arabic" dir="rtl">{question.arabic}</div>}<div className="review-answer"><small>Jawaban siswa</small><b>{record?.answer || "Tidak dijawab"}</b></div><div className="review-answer"><small>Jawaban yang tepat</small><b>{question.answer}</b></div><p className="review-explanation">{question.explanation}</p></article>; })}</div><div className="hero-actions centered"><button className="primary" onClick={() => setScreen(lastPosition === 7 ? "result" : "map")}>{lastPosition === 7 ? "Lihat Rekap Akhir" : "Lanjutkan Petualangan"} <ArrowRight size={17}/></button></div></section>}

    {screen === "result" && <section className="result-panel adventure-result-panel"><div className="trophy"><Trophy size={54} /></div><span className="eyebrow"><Medal size={15} /> PETUALANGAN SELESAI</span><h2>Selamat, Detektif {player?.nickname}!</h2><p>Kamu telah menuntaskan tujuh pos petualangan bahasa Arab. Berikut rekap pencapaianmu.</p>
      <div className="big-score">{totalScore}<small>/100</small></div><span className="muted">Nilai keseluruhan</span>
      <div className="achievement-grid">{positions.map((item) => { const result = scores[item.id]; return <div className="achievement-card" key={item.id}><span>{item.icon}</span><small>POS {item.id}</small><b>{result ? `${result.score}/${result.total}` : "-"}</b><em>{result ? `${Math.round((result.score / result.total) * 100)}%` : "Belum ada nilai"}</em></div>; })}</div>
      <div className="result-summary"><div><span>Jawaban benar</span><b>{totalCorrect} dari {totalQuestions}</b></div><div><span>Pos selesai</span><b>{completed.length} dari 7</b></div><div><span>Predikat</span><b>{totalScore >= 90 ? "Sangat Hebat" : totalScore >= 80 ? "Hebat" : totalScore >= 70 ? "Terus Berlatih" : "Semangat Belajar"}</b></div></div>
      <div className="save-status">{saving ? "Menyimpan hasil petualangan..." : saved ? "✓ Hasil berhasil disimpan." : "Nilai tampil di perangkat ini. Penyimpanan server belum berhasil atau belum dikonfigurasi."}</div>
      <div className="hero-actions centered"><button className="primary" onClick={() => setScreen("map")}>Lihat Peta Petualangan</button><button className="secondary" onClick={resetAdventure}><RotateCcw size={16} /> Ulangi Petualangan</button></div>
    </section>}

    {screen !== "map" && screen !== "learn" && screen !== "quiz" && screen !== "position-result" && screen !== "result" && <section id="cara-bermain" className="how-section"><span className="eyebrow">BELAJAR SAMBIL BERMAIN</span><h2>Bagaimana cara bermain?</h2><div className="how-grid"><div><span>01</span><b>Masuk sebagai detektif</b><p>Isi nama dan kode kelas untuk memulai petualangan.</p></div><div><span>02</span><b>Ikuti tujuh pos</b><p>Selesaikan pos secara berurutan. Pos berikutnya terbuka setelah pos sebelumnya selesai.</p></div><div><span>03</span><b>Pelajari dan jawab</b><p>Amati ilustrasi, pelajari materi, lalu kerjakan tantangan.</p></div><div><span>04</span><b>Lihat pencapaian</b><p>Periksa nilai setiap pos dan nilai keseluruhan setelah tantangan final.</p></div></div></section>}
    <footer><b>Detektif Arab</b><span>مُغَامَرَةُ اللُّغَةِ الْعَرَبِيَّةِ</span><small>Media pembelajaran bahasa Arab • Kelas VII</small></footer>
  </main>;
}
