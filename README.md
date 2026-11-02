# Detektif Arab — Misi Keluargaku

Aplikasi permainan edukasi bahasa Arab untuk siswa kelas VII. Antarmuka menggunakan **Bahasa Indonesia dan Bahasa Arab** saja.

## Fitur yang tersedia

- Halaman pembuka dan identitas pemain.
- Peta empat misi.
- Kartu mufradat dengan harakat dan pelafalan melalui fitur suara peramban (jika tersedia).
- Tantangan pilihan ganda: mufradat, isim–fi'il, dan pemahaman konteks.
- Hasil evaluasi per kategori.
- Penyimpanan pemain dan hasil ke Supabase.
- Dashboard guru dengan token akses dan ekspor CSV.

## Teknologi

- Next.js App Router + TypeScript
- Supabase (PostgreSQL)
- Vercel untuk deployment

## 1. Persiapan lokal

Pastikan Node.js 20.9 atau lebih baru terpasang.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000.

Tanpa konfigurasi Supabase, halaman permainan tetap dapat dicoba, tetapi penyimpanan hasil dan dashboard guru tidak akan aktif.

## 2. Konfigurasi Supabase

1. Buat proyek di https://supabase.com.
2. Buka **SQL Editor**.
3. Salin dan jalankan isi `supabase/schema.sql`.
4. Buka **Project Settings → API**.
5. Salin Project URL, anon key, dan service_role key.
6. Isi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
TEACHER_DASHBOARD_TOKEN=buat-token-rahasia-yang-panjang-dan-unik
```

Penting: service role key dan token guru hanya boleh menjadi environment variable server. Jangan beri awalan `NEXT_PUBLIC_` dan jangan commit `.env.local` ke GitHub.

## 3. Menjalankan dan menguji

```bash
npm run dev
```

Alur pengujian:
1. Masuk ke halaman utama.
2. Tekan **Mulai Petualangan**.
3. Isi nama panggilan dan kode kelas.
4. Buka misi, pelajari kartu kosakata, dan gunakan tombol pelafalan.
5. Selesaikan 10 soal evaluasi.
6. Buka `/guru`, masukkan token dashboard, lalu periksa hasil.
7. Coba ekspor CSV.

## 4. Deploy ke Vercel

1. Buat repository GitHub dan unggah seluruh isi folder proyek.
2. Masuk ke https://vercel.com lalu pilih **Add New → Project**.
3. Impor repository GitHub tersebut.
4. Tambahkan environment variables yang sama dengan `.env.local` pada **Project Settings → Environment Variables**.
5. Deploy.
6. Setelah deployment selesai, uji halaman permainan dan `/guru`.

Setiap perubahan yang di-push ke branch produksi akan memicu deployment baru sesuai konfigurasi Vercel.

## 5. Struktur folder

```text
detektif-arab/
├── app/
│   ├── api/
│   │   ├── players/route.ts
│   │   ├── attempts/route.ts
│   │   └── reports/route.ts
│   ├── guru/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── questions.ts
│   └── supabase-server.ts
├── supabase/schema.sql
├── .env.example
├── package.json
└── README.md
```

## Catatan penting sebelum digunakan di kelas

- Ini adalah fondasi aplikasi yang dapat dijalankan dan dikembangkan, bukan sistem ujian terstandar.
- Pelafalan menggunakan Web Speech API perangkat. Ketersediaan suara Arab berbeda-beda antarperamban dan perangkat. Untuk penggunaan kelas yang konsisten, ganti dengan rekaman audio penutur bahasa Arab yang telah diperiksa.
- Dashboard guru menggunakan satu token rahasia server. Untuk penggunaan sekolah dalam skala besar, tingkatkan menjadi autentikasi guru berbasis Supabase Auth, pembatasan percobaan, dan kebijakan akses berbasis peran.
- Saat ini identitas siswa menggunakan nama panggilan dan kode kelas, bukan akun/password. Hindari memasukkan data pribadi sensitif.
- Soal dan bobot penilaian masih berupa contoh awal. Tinjau kesesuaian dengan ATP/modul ajar dan tujuan pembelajaran yang digunakan.
- Kunci jawaban dan skor dihitung ulang di API server dari bank soal, bukan mempercayai nilai benar/salah yang dikirim browser. Tetap lakukan pengujian keamanan sebelum penggunaan skala sekolah.
- Tambahkan tes awal dan tes tertunda bila media digunakan untuk penelitian efektivitas pembelajaran.
