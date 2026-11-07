"use client";
import { useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, RotateCcw, Volume2, X } from "lucide-react";
import { questions } from "@/lib/questions";
import { mindmapRows, positions, slides, tableRows } from "@/lib/content";

type Screen = "home" | "identity" | "map" | "learn" | "quiz" | "review" | "result";
type Player = { id: string; nickname: string; classCode: string };

const TOTAL_POS = positions.length;
const QUIZ_POS = 5;

function Stars({ value, size = 56 }: { value: number; size?: number }) {
  // value 0-100 dibagi menjadi 5 bintang; bintang terakhir bisa terisi sebagian.
  const filled = Math.max(0, Math.min(5, (value / 100) * 5));
  return <div className="stars" role="img" aria-label={`${(Math.round(filled * 10) / 10)} dari 5 bintang`} style={{ fontSize: size }}>
    {[0, 1, 2, 3, 4].map((i) => {
      const pct = Math.round(Math.max(0, Math.min(1, filled - i)) * 100);
      return <span key={i} className="star" style={{ "--fill": `${pct}%`, animationDelay: `${i * 0.12}s` } as CSSProperties}>★</span>;
    })}
  </div>;
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [nickname, setNickname] = useState("");
  const [classCode, setClassCode] = useState("");
  const [player, setPlayer] = useState<Player | null>(null);
  const [position, setPosition] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const posQuestions = useMemo(() => questions.filter((item) => item.position === position), [position]);
  const currentQuestion = posQuestions[qIndex];
  const posSlides = slides[position] || [];
  const slide = posSlides[slideIndex];

  const isUnlocked = (id: number) => id === 1 || completed.includes(id - 1);
  const scoreOf = (pos: number) => {
    const list = questions.filter((item) => item.position === pos);
    const correct = list.filter((item) => answers[item.id] === item.answer).length;
    return { correct, total: list.length, percent: list.length ? Math.round((correct / list.length) * 100) : 0 };
  };
  const answeredPositions = [1, 2, 3, 4, 5].filter((id) => completed.includes(id));
  const totalCorrect = answeredPositions.reduce((sum, id) => sum + scoreOf(id).correct, 0);
  const totalAnswered = answeredPositions.reduce((sum, id) => sum + scoreOf(id).total, 0);
  const finalScore = Math.round((totalCorrect / questions.length) * 100);
  const nextPosition = positions.find((item) => !completed.includes(item.id) && isUnlocked(item.id));
  const progress = Math.round((completed.length / TOTAL_POS) * 100);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.78;
    window.speechSynthesis.speak(utterance);
  };

  const startPlayer = async () => {
    if (!nickname.trim()) return;
    const p: Player = { id: crypto.randomUUID(), nickname: nickname.trim(), classCode: classCode.trim() || "UMUM" };
    setPlayer(p);
    setScreen("map");
    try {
      await fetch("/api/players", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    } catch { /* Permainan tetap berjalan walau penyimpanan belum tersedia. */ }
  };

  const saveResults = async (record: Record<string, string>) => {
    if (!player) return;
    setSaving(true);
    try {
      const response = await fetch("/api/attempts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: player.id, answers: questions.map((item) => ({ questionId: item.id, answer: record[item.id] ?? "" })) }),
      });
      setSaved(response.ok);
    } catch { setSaved(false); }
    finally { setSaving(false); }
  };

  const openPosition = (id: number) => {
    if (!isUnlocked(id)) return;
    setPosition(id); setSlideIndex(0); setQIndex(0); setSelected("");
    if (id === TOTAL_POS) {
      setCompleted((list) => (list.includes(id) ? list : [...list, id]));
      setScreen("result");
    } else if (completed.includes(id)) setScreen("review");
    else if (slides[id]) setScreen("learn");
    else setScreen("quiz");
  };

  const submitAnswer = () => {
    if (!selected || !currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(nextAnswers);
    setSelected("");
    if (qIndex < posQuestions.length - 1) { setQIndex(qIndex + 1); return; }
    setCompleted((list) => (list.includes(position) ? list : [...list, position]));
    setScreen("review");
    if (position === QUIZ_POS) void saveResults(nextAnswers);
  };

  const resetAdventure = () => {
    setPosition(1); setSlideIndex(0); setQIndex(0); setSelected(""); setAnswers({});
    setCompleted([]); setSaved(false); setScreen("map");
  };

  const predicate = finalScore >= 90 ? "Detektif Super!" : finalScore >= 75 ? "Detektif Hebat!" : finalScore >= 60 ? "Detektif Handal" : "Detektif Pemula, Ayo Berlatih Lagi!";
  const goHome = () => setScreen(player ? "map" : "home");

  return <main className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={goHome}><span className="brand-mark">🕵️</span><span><b>Detektif Arab</b><small>الاِسْمُ وَالْفِعْلُ</small></span></button>
      <nav><button onClick={goHome}>Beranda</button><a href="/guru">Ruang Guru</a></nav>
    </header>

    {screen === "home" && <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">PETUALANGAN BAHASA ARAB KELAS VII</span>
        <h1>Detektif Arab:<br /><em>Misi Isim dan Fi&apos;il</em></h1>
        <p>Bantu Sami mengenali isim dan fi&apos;il. Jelajahi enam pos, pelajari materinya, jawab soal evaluasi, lalu kumpulkan bintang terbanyak.</p>
        <div className="hero-actions"><button className="primary" onClick={() => setScreen("identity")}>Mulai Petualangan <ArrowRight size={18} /></button></div>
        <div className="hero-stats"><span><b>6</b> Pos petualangan</span><span><b>30</b> Soal evaluasi</span><span><b>5</b> Bintang</span></div>
      </div>
      <div className="hero-art"><img src="/images/detektif-cover.jpg" alt="Ilustrasi detektif anak" /></div>
    </section>}

    {screen === "identity" && <section className="center-panel">
      <div className="panel-emoji">🕵🏻‍♀️</div><span className="eyebrow">IDENTITAS DETEKTIF</span>
      <h2>Siapa nama detektif hari ini?</h2><p>Masukkan nama panggilan dan kode kelas untuk membuka peta misi.</p>
      <label>Nama panggilan</label><input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Contoh: Sami01" maxLength={30} />
      <label>Kode kelas <span className="optional">(opsional)</span></label><input value={classCode} onChange={(e) => setClassCode(e.target.value)} placeholder="Contoh: VII-A" maxLength={20} />
      <button className="primary full" disabled={!nickname.trim()} onClick={startPlayer}>Lanjut ke Peta Misi <ArrowRight size={18} /></button>
      <button className="text-button" onClick={() => setScreen("home")}><ArrowLeft size={16} /> Kembali</button>
    </section>}

    {screen === "map" && <section className="map-screen">
      <div className="map-frame">
        <div className="hud hud-left"><span className="avatar">🕵️</span><span><b>{player?.nickname || "Detektif"}</b><small>{player?.classCode || "UMUM"}</small></span></div>
        <div className="hud hud-right"><span className="hud-star">★</span><span><b>{totalCorrect} benar</b><small>{completed.length}/{TOTAL_POS} pos · {progress}%</small></span></div>
        <div className="map-board">
          <div className="deco d1">🌳</div><div className="deco d2">🌲</div><div className="deco d3">🌴</div><div className="deco d4">⛰️</div><div className="deco d5">🌷</div><div className="deco d6">🏡</div><div className="deco d7">🌳</div><div className="deco d8">🐑</div><div className="pond" />
          <svg className="trail" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <path className="trail-edge" d="M110 420 C150 250 200 150 280 180 S400 400 470 410 S560 170 640 168 S760 380 810 396 S880 150 910 144" />
            <path className="trail-core" d="M110 420 C150 250 200 150 280 180 S400 400 470 410 S560 170 640 168 S760 380 810 396 S880 150 910 144" />
          </svg>
          {positions.map((item) => {
            const unlocked = isUnlocked(item.id);
            const done = completed.includes(item.id);
            const isNext = nextPosition?.id === item.id;
            return <button key={item.id} className={`pin ${unlocked ? "open" : "locked"} ${done ? "done" : ""} ${isNext ? "next" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} disabled={!unlocked} onClick={() => openPosition(item.id)} aria-label={`Pos ${item.id}: ${item.title}`}>
              <span className="pin-badge">{done ? <Check size={18} /> : unlocked ? item.id : <LockKeyhole size={16} />}</span>
              <span className="pin-icon">{unlocked ? item.icon : "🔒"}</span>
              <span className="pin-label"><small>POS {item.id}</small><b>{item.title}</b></span>
            </button>;
          })}
        </div>
        <div className="map-bottom">
          <button className="primary" onClick={() => (nextPosition ? openPosition(nextPosition.id) : setScreen("result"))}>{nextPosition ? <>Lanjutkan Misi: {nextPosition.title} <ArrowRight size={18} /></> : <>Lihat Skor Akhir <ArrowRight size={18} /></>}</button>
        </div>
      </div>
      <div className="map-legend"><span><i className="lg-open" /> Terbuka</span><span><i className="lg-done" /> Selesai</span><span><i className="lg-lock" /> Terkunci</span></div>
    </section>}

    {screen === "learn" && slide && <section className="content-section">
      <button className="back-link" onClick={() => setScreen("map")}><ArrowLeft size={16} /> Kembali ke peta</button>
      <div className="learning-heading"><div><span className="eyebrow">POS {position} · {positions[position - 1].title.toUpperCase()}</span><h2>{slide.title}</h2></div><span className="progress-label">Materi {slideIndex + 1} dari {posSlides.length}</span></div>
      <div className="slide-card">
        {slide.kind === "definition" && <div className="definition">
          <div className="arabic-big" dir="rtl">{slide.arabic}</div>
          <p className="definition-text">{slide.text}</p>
          <div className="example-row">{slide.examples.map((ex) => <button key={ex.arabic} className="example-chip" onClick={() => speak(ex.arabic)}><span dir="rtl">{ex.arabic}</span><small>{ex.meaning}</small><Volume2 size={15} /></button>)}</div>
        </div>}
        {slide.kind === "signs" && <div>
          <p className="slide-intro">{slide.intro}</p>
          <div className="sign-grid">{slide.items.map((item) => <div className="sign-card" key={item.name}>
            <b>{item.name}</b><small dir="ltr">{item.rule}</small>
            <button className="sign-example" onClick={() => speak(item.arabic)}><span dir="rtl">{item.arabic}</span><em>{item.meaning}</em><Volume2 size={15} /></button>
          </div>)}</div>
        </div>}
        {slide.kind === "words" && <div>
          <p className="slide-intro">{slide.intro}</p>
          <div className="word-grid">{slide.words.map((w) => <button className="word-card" key={w.arabic} onClick={() => speak(w.arabic)}><span className="word-ar" dir="rtl">{w.arabic}</span><span className="word-id">{w.meaning}</span><Volume2 size={15} /></button>)}</div>
        </div>}
        {slide.kind === "mindmap" && <div className="mindmap">
          <div className="mm-root">كَلِمَةٌ<small>Kata dalam bahasa Arab</small></div>
          <div className="mm-heads"><div className="mm-head isim"><b>الاِسْمُ</b><small>ISIM</small></div><div className="mm-vs">VS</div><div className="mm-head fiil"><b>الْفِعْلُ</b><small>FI&apos;IL</small></div></div>
          {mindmapRows.map((row) => <div className="mm-row" key={row.aspect}><div className="mm-node isim" dir="ltr">{row.isim}</div><div className="mm-aspect">{row.aspect}</div><div className="mm-node fiil" dir="ltr">{row.fiil}</div></div>)}
        </div>}
        {slide.kind === "table" && <div>
          <p className="slide-intro">Gunakan tabel ini untuk mengingat perbedaan isim dan fi&apos;il.</p>
          <div className="table-scroll"><table className="diff-table"><thead><tr><th>Aspek</th><th className="isim">Isim</th><th className="fiil">Fi&apos;il</th></tr></thead>
            <tbody>{tableRows.map((row) => <tr key={row.aspect}><th dir="ltr">{row.aspect}</th><td dir="ltr">{row.isim}</td><td dir="ltr">{row.fiil}</td></tr>)}</tbody></table></div>
        </div>}
        <div className="slide-nav">
          <button className="secondary" disabled={slideIndex === 0} onClick={() => setSlideIndex(slideIndex - 1)}><ArrowLeft size={16} /> Sebelumnya</button>
          <div className="word-dots">{posSlides.map((_, i) => <span key={i} className={i <= slideIndex ? "active" : ""} />)}</div>
          <button className="primary" onClick={() => { if (slideIndex < posSlides.length - 1) setSlideIndex(slideIndex + 1); else { setQIndex(0); setSelected(""); setScreen("quiz"); } }}>{slideIndex < posSlides.length - 1 ? "Berikutnya" : "Mulai Evaluasi"} <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>}

    {screen === "quiz" && currentQuestion && <section className="quiz-wrap">
      <div className="quiz-top"><button className="back-link" onClick={() => setScreen("map")}><ArrowLeft size={16} /> Kembali ke peta</button><span>POS {position} · SOAL {qIndex + 1}/{posQuestions.length}</span></div>
      <div className="progress-track"><div style={{ width: `${((qIndex + 1) / posQuestions.length) * 100}%` }} /></div>
      <div className="quiz-card">
        <span className="eyebrow">EVALUASI POS {position}</span>
        <h2>{currentQuestion.prompt}</h2>
        {currentQuestion.arabic && <div className="arabic-question" dir="rtl">{currentQuestion.arabic}<button aria-label="Dengarkan" onClick={() => speak(currentQuestion.arabic || "")}><Volume2 size={18} /></button></div>}
        <div className="answer-grid">{currentQuestion.options.map((option, index) => <button key={option} className={`answer-option ${selected === option ? "selected" : ""}`} onClick={() => setSelected(option)}><span>{String.fromCharCode(65 + index)}</span><i dir="auto">{option}</i></button>)}</div>
        <button className="primary full" disabled={!selected} onClick={submitAnswer}>{qIndex === posQuestions.length - 1 ? "Selesaikan dan Lihat Kunci Jawaban" : "Jawaban Berikutnya"} <ArrowRight size={18} /></button>
      </div>
    </section>}

    {screen === "review" && <section className="content-section">
      <div className="review-head"><span className="eyebrow">KUNCI JAWABAN · POS {position}</span><h2>{positions[position - 1].title}</h2>
        <div className="review-score"><b>{scoreOf(position).correct}</b>/{scoreOf(position).total} benar <em>· nilai {scoreOf(position).percent}</em></div></div>
      <div className="review-list">{posQuestions.map((item, index) => {
        const mine = answers[item.id] ?? "";
        const right = mine === item.answer;
        return <article key={item.id} className={`review-item ${right ? "right" : "wrong"}`}>
          <div className="review-q"><span className="review-no">{index + 1}</span><div><b>{item.prompt}</b>{item.arabic && <div className="review-ar" dir="rtl">{item.arabic}</div>}</div><span className="review-mark">{right ? <Check size={18} /> : <X size={18} />}</span></div>
          <div className="review-row"><small>Jawabanmu</small><p className={right ? "ok" : "bad"} dir="auto">{mine || "(tidak dijawab)"}</p></div>
          {!right && <div className="review-row"><small>Jawaban yang benar</small><p className="ok" dir="auto">{item.answer}</p></div>}
          <div className="review-reason"><small>Alasan</small><p>{item.reason}</p></div>
        </article>;
      })}</div>
      <div className="hero-actions centered"><button className="primary" onClick={() => setScreen("map")}>{position === QUIZ_POS ? "Kembali ke Peta, Buka Aula Bintang" : "Kembali ke Peta"} <ArrowRight size={18} /></button></div>
    </section>}

    {screen === "result" && <section className="result-panel">
      <span className="eyebrow">POS 6 · AULA BINTANG</span>
      <h2>Hebat, {player?.nickname || "Detektif"}!</h2>
      <Stars value={finalScore} />
      <div className="big-score">{finalScore}<small>/100</small></div>
      <div className="predicate">{predicate}</div>
      <p className="result-note">Bintang terisi sesuai nilai akhir: setiap 20 poin mengisi satu bintang penuh. Nilai akhir dihitung dari {totalCorrect} jawaban benar dari {questions.length} soal.</p>
      <div className="score-grid">{positions.slice(0, QUIZ_POS).map((item) => { const s = scoreOf(item.id); const done = completed.includes(item.id); return <div className="score-card" key={item.id}><span>{item.icon}</span><small>POS {item.id}</small><b>{done ? `${s.correct}/${s.total}` : "-"}</b><em>{done ? `Nilai ${s.percent}` : "Belum dikerjakan"}</em></div>; })}</div>
      <div className="result-summary"><div><span>Jawaban benar</span><b>{totalCorrect} dari {questions.length}</b></div><div><span>Soal sudah dikerjakan</span><b>{totalAnswered} dari {questions.length}</b></div><div><span>Nilai akhir</span><b>{finalScore} / 100</b></div></div>
      <div className="save-status">{saving ? "Menyimpan hasil petualangan..." : saved ? "✓ Hasil berhasil disimpan." : "Nilai tampil di perangkat ini. Penyimpanan server belum berhasil atau belum dikonfigurasi."}</div>
      <div className="hero-actions centered"><button className="primary" onClick={() => setScreen("map")}>Lihat Peta Petualangan</button><button className="secondary" onClick={resetAdventure}><RotateCcw size={16} /> Ulangi Petualangan</button></div>
    </section>}

    <footer><b>Detektif Arab</b><span>الاِسْمُ وَالْفِعْلُ</span><small>Media pembelajaran bahasa Arab • Kelas VII</small></footer>
  </main>;
}
