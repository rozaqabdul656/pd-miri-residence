"use client";

import { ExternalLink, Film, Play } from "lucide-react";
import { useState } from "react";
import type { ActivityVideo } from "@/types";

const driveFolderUrl =
  "https://drive.google.com/drive/folders/1pjNSqGZrwyrQ4qkU3987XOofgmhVipYD?usp=sharing";

export function VideoGallery({
  videos,
  title,
}: {
  videos: ActivityVideo[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playRequested, setPlayRequested] = useState(false);
  const activeVideo = videos[activeIndex];

  if (!activeVideo) return null;

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-forest text-paper shadow-[0_24px_60px_rgba(23,61,50,0.18)]">
      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="bg-black">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[430px] sm:aspect-video sm:max-w-none">
            <iframe
              key={`${activeVideo.id}-${playRequested ? "play" : "preview"}`}
              className="h-full w-full border-0"
              src={`https://drive.google.com/file/d/${activeVideo.id}/preview${playRequested ? "?autoplay=1" : ""}`}
              title={`${title} — ${activeVideo.title}`}
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            {!playRequested && (
              <button
                type="button"
                aria-label={`Putar ${activeVideo.title}`}
                onClick={() => setPlayRequested(true)}
                className="absolute inset-0 z-10 grid place-items-center sm:hidden"
              >
                <span className="grid size-16 place-items-center rounded-2xl bg-black/85 text-white shadow-xl">
                  <Play size={26} fill="currentColor" />
                </span>
              </button>
            )}
            <a
              href={`https://drive.google.com/file/d/${activeVideo.id}/view`}
              target="_blank"
              rel="noreferrer"
              className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-2 text-xs font-semibold text-white shadow-lg sm:hidden"
            >
              Buka video
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        <aside className="flex max-h-[520px] flex-col">
          <div className="border-b border-paper/10 px-5 py-5">
            <div className="flex items-center gap-2 text-sage">
              <Film size={17} />
              <p className="text-xs font-bold uppercase tracking-[0.16em]">
                Video kegiatan
              </p>
            </div>
            <p className="mt-2 text-sm text-paper/65">
              {videos.length} dokumentasi video
            </p>
          </div>

          <div className="grid flex-1 gap-1 overflow-y-auto p-2 sm:grid-cols-2 lg:grid-cols-1">
            {videos.map((video, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setPlayRequested(false);
                  }}
                  aria-pressed={active}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-paper text-forest"
                      : "text-paper/75 hover:bg-paper/10 hover:text-paper"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full ${
                      active ? "bg-sage text-green" : "bg-paper/10"
                    }`}
                  >
                    <Play size={15} fill="currentColor" />
                  </span>
                  <span>
                    <span className="block text-xs opacity-60">
                      Video {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold">
                      {video.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <a
            href={driveFolderUrl}
            target="_blank"
            rel="noreferrer"
            className="m-4 mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 px-4 py-2.5 text-xs font-semibold text-paper/80 transition hover:bg-paper/10 hover:text-paper"
          >
            Lihat folder Drive
            <ExternalLink size={14} />
          </a>
        </aside>
      </div>
    </div>
  );
}
