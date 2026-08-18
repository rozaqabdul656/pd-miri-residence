# Pondok Miri Residence

Website profil dan dokumentasi kegiatan warga berbasis Next.js, TypeScript, dan Tailwind CSS. Seluruh konten bersumber dari file lokal di folder `data/`; tidak ada database atau CMS.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Untuk memeriksa produksi, jalankan `npm run build`.

## Mengelola konten

- Profil & lokasi: `data/profile.json`
- Kegiatan & galeri: `data/activities.json`
- Fasilitas: `data/facilities.json`
- Pengumuman: `data/announcements.json`
- Kontak: `data/contact.json`
- Pengurus: `data/management.json`

Data contoh yang tersedia adalah placeholder dan perlu diganti dengan data aktual Pondok Miri Residence.

## Menambah kegiatan

1. Upload foto ke `public/images/activities/2026/nama-kegiatan/`.
2. Tambahkan objek ke `data/activities.json`:

```json
{
  "id": "kerja-bakti-2026",
  "slug": "kerja-bakti-2026",
  "title": "Kerja Bakti 2026",
  "date": "2026-09-01",
  "year": 2026,
  "category": "Kebersihan",
  "shortDescription": "...",
  "description": "...",
  "cover": "/images/activities/2026/kerja-bakti-2026/cover.jpg",
  "featured": false,
  "images": []
}
```

Filter tahun dan kategori, galeri utama, kegiatan terbaru, related activities, serta sitemap akan terbarui otomatis dari JSON. Nilai profil yang kosong tidak ditampilkan.
