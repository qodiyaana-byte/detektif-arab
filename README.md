# Detektif Arab: Misi Isim dan Fi'il

Media pembelajaran bahasa Arab kelas VII dengan enam pos petualangan yang fokus pada isim dan fi'il.

## Alur pos

| Pos | Isi | Soal |
| --- | --- | --- |
| 1. Rumah Isim | Definisi isim, ciri-ciri, contoh mufradat beserta arti, lalu evaluasi | 5 |
| 2. Taman Fi'il | Definisi fi'il, tanda-tanda, contoh mufradat beserta arti, lalu evaluasi | 5 |
| 3. Ruang Peta Konsep | Peta konsep perbedaan isim dan fi'il, tabel perbedaan, lalu evaluasi | 7 |
| 4. Ruang Investigasi | Evaluasi keseluruhan materi | 6 |
| 5. Menara Tantangan | Soal akhir, satu tingkat lebih sulit dari Pos 4 | 7 |
| 6. Aula Bintang | Skor tiap pos, nilai akhir /100, dan bintang | - |

Setelah setiap evaluasi tampil kunci jawaban: jawaban siswa, jawaban yang benar, dan alasannya.
Nilai akhir = jawaban benar dari 30 soal dibagi 30 dikali 100. Setiap 20 poin mengisi satu bintang (5 bintang = 100).
Teks soal dan alasan ada di `lib/questions.ts`; materi, peta konsep, dan tabel ada di `lib/content.ts`.

## Cara deploy (GitHub lalu Vercel)

1. Ekstrak zip. Upload ISI folder ke GitHub lewat Add file > Upload files, sehingga `package.json`, `app`, `lib`, dan `public` berada langsung di akar repo (bukan di dalam subfolder).
2. Di Vercel, import repo tersebut. Framework akan terdeteksi sebagai Next.js.
3. Isi Environment Variables di Vercel (Settings > Environment Variables), lalu Redeploy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TEACHER_DASHBOARD_TOKEN`
4. Jalankan `supabase/schema.sql` di Supabase SQL Editor.

Tanpa Supabase, permainan tetap berjalan dan nilai tampil di perangkat siswa, tetapi hasil tidak tersimpan ke Ruang Guru (`/guru`).

## Lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Gunakan Node.js 20.9 atau lebih baru.
