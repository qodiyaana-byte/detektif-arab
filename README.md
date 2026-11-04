# Detektif Arab: Peta Petualangan 7 Pos

Media pembelajaran bahasa Arab kelas VII dengan alur petualangan berurutan. Setelah siswa login, aplikasi menampilkan peta tujuh pos. Siswa harus menuntaskan pos sebelumnya untuk membuka pos berikutnya.

## Alur pembelajaran

1. **Pos 1: Rumah Kata.** Kosakata kegiatan sehari-hari di rumah. Terdapat 10 kartu materi dan 3 soal cek pemahaman.
2. **Pos 2: Rahasia Kosakata.** Pendalaman kosakata dalam frasa dan kalimat sederhana. Terdapat 6 kartu materi dan 3 soal cek pemahaman.
3. **Pos 3: Detektif Isim.** Materi isim yang terkait dengan benda dan tempat di rumah, lalu 10 soal.
4. **Pos 4: Detektif Fi'il.** Materi fi'il yang terkait dengan kegiatan sehari-hari, lalu 10 soal ringan.
5. **Pos 5: Tantangan Campuran.** 10 soal tebak gambar, isim, fi'il, dan kosakata.
6. **Pos 6: Misi Detektif.** 10 soal penerapan isim dan fi'il dalam konteks.
7. **Pos 7: Tantangan Final.** 10 soal evaluasi integratif.

Total terdapat 56 soal: 3 soal Pos 1, 3 soal Pos 2, dan masing-masing 10 soal pada Pos 3 sampai Pos 7. Soal Pos 1 dan 2 merupakan cek pemahaman singkat agar setiap pos memiliki nilai.

## Fitur

- Identitas siswa dan kode kelas.
- Peta petualangan dengan status pos terbuka, selesai, dan terkunci.
- Pembukaan pos secara berurutan.
- Kartu materi Arab berharakat, arti bahasa Indonesia, ilustrasi, dan pelafalan browser.
- Soal pilihan ganda dengan tipe tebak gambar, arti kosakata, isim, fi'il, dan pemahaman kalimat.
- Rekap nilai setiap pos dan nilai keseluruhan setelah Pos 7.
- Penyimpanan hasil ke Supabase dan dashboard guru di `/guru`.

## Teknologi

- Next.js 15 App Router + TypeScript
- Supabase PostgreSQL
- Vercel

## Persiapan lokal

Gunakan Node.js 20.9 atau lebih baru.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `.env.local` dengan konfigurasi Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
TEACHER_DASHBOARD_TOKEN=buat-token-rahasia-yang-panjang-dan-unik
```

Jalankan SQL pada `supabase/schema.sql` di Supabase SQL Editor. Service role key dan token guru hanya boleh disimpan sebagai environment variable server, bukan variabel `NEXT_PUBLIC_`.

## Deploy Vercel

1. Commit dan push source code ke GitHub.
2. Pastikan environment variables Supabase dan token guru telah diatur pada Vercel.
3. Jalankan deployment.
4. Uji login siswa, penyelesaian tujuh pos, rekap nilai, dan dashboard guru.

## Catatan penilaian

Nilai setiap pos dihitung dari jawaban benar dibandingkan jumlah soal pada pos tersebut. Nilai keseluruhan dihitung dari seluruh 56 soal. Server memvalidasi ulang kunci jawaban sebelum menyimpan hasil. Bank soal tetap perlu ditinjau guru agar selaras dengan tujuan pembelajaran dan kosakata yang diajarkan.


## Revisi tampilan berdasarkan Inovasi Media (INGG)

- Menggunakan ilustrasi rumah, keluarga, ruang keluarga, dan kakek-nenek dari dokumen referensi yang diberikan. Peta petualangan tetap memakai ilustrasi jalur tanpa tulisan bahasa Inggris.
- Palet warna diperbarui menjadi hijau, biru, kuning, dan aksen merah muda seperti referensi permainan pada dokumen.
- Teks antarmuka menggunakan bahasa Indonesia.
- Pada soal bertipe tebak gambar, pertanyaan hanya menampilkan gambar dan instruksi. Lafaz Arab tampil pada pilihan jawaban, bukan pada teks soal atau panel lafaz terpisah.
- Alur login, tujuh pos berurutan, penilaian per pos, nilai keseluruhan, dan API penyimpanan tetap dipertahankan.
