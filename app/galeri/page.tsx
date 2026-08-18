"use client";

import Link from "next/link";
import { Images, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { Crumb, SafeImage } from "@/components/common";
import { VideoGallery } from "@/components/video-gallery";
import { getActivities } from "@/lib/data";

const allActivities = getActivities();

export default function GalleryPage() {
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [activity, setActivity] = useState("");

  const years = [...new Set(allActivities.map((item) => item.year))].sort(
    (a, b) => b - a,
  );
  const categories = [
    ...new Set(allActivities.map((item) => item.category)),
  ];
  const filtered = useMemo(
    () =>
      allActivities.filter(
        (item) =>
          (!year || item.year === Number(year)) &&
          (!category || item.category === category) &&
          (!activity || item.slug === activity),
      ),
    [year, category, activity],
  );
  const videoActivities = filtered.filter((item) => item.videos.length > 0);
  const photos = filtered.flatMap((item) =>
    [item.cover, ...item.images].map((src, index) => ({
      src,
      title: item.title,
      slug: item.slug,
      index,
    })),
  );

  return (
    <section className="shell section">
      <Crumb current="Galeri" />
      <p className="eyebrow">Momen warga</p>
      <h1 className="mt-3 text-4xl font-semibold">Galeri kegiatan</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate">
        Jelajahi dokumentasi foto dan video kebersamaan warga Pondok Miri
        Residence.
      </p>

      <div className="mt-8 grid gap-3 rounded-2xl bg-cream p-4 md:grid-cols-3">
        <select
          value={year}
          onChange={(event) => setYear(event.target.value)}
          className="rounded-xl bg-white px-3 py-3 text-sm"
          aria-label="Filter tahun"
        >
          <option value="">Semua tahun</option>
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl bg-white px-3 py-3 text-sm"
          aria-label="Filter kategori"
        >
          <option value="">Semua kategori</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={activity}
          onChange={(event) => setActivity(event.target.value)}
          className="rounded-xl bg-white px-3 py-3 text-sm"
          aria-label="Filter kegiatan"
        >
          <option value="">Semua kegiatan</option>
          {allActivities.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      {videoActivities.length > 0 && (
        <div className="mt-12 space-y-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-green">
                <Video size={19} />
                <p className="text-xs font-bold uppercase tracking-[0.16em]">
                  Dokumentasi bergerak
                </p>
              </div>
              <h2 className="mt-3 text-3xl font-semibold">Galeri video</h2>
            </div>
            <p className="text-sm text-slate">
              {videoActivities.reduce(
                (total, item) => total + item.videos.length,
                0,
              )}{" "}
              video
            </p>
          </div>

          {videoActivities.map((item) => (
            <article key={item.slug}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <Link
                  href={`/kegiatan/${item.slug}`}
                  className="text-sm font-semibold text-green hover:underline"
                >
                  Lihat kegiatan
                </Link>
              </div>
              <VideoGallery videos={item.videos} title={item.title} />
            </article>
          ))}
        </div>
      )}

      <div className="mt-14 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-green">
            <Images size={19} />
            <p className="text-xs font-bold uppercase tracking-[0.16em]">
              Dokumentasi visual
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold">Galeri foto</h2>
        </div>
        <p className="text-sm text-slate">{photos.length} foto</p>
      </div>

      {photos.length ? (
        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo) => (
            <Link
              href={`/kegiatan/${photo.slug}`}
              key={`${photo.slug}-${photo.index}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <SafeImage src={photo.src} alt={photo.title} />
              </div>
              <p className="mt-2 text-sm font-medium group-hover:text-green">
                {photo.title}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-slate">Dokumentasi belum tersedia.</p>
      )}
    </section>
  );
}
