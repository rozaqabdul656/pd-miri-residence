"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Film,
  Pause,
  Play,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ActivityVideo } from "@/types";

const driveFolderUrl =
  "https://drive.google.com/drive/folders/1pjNSqGZrwyrQ4qkU3987XOofgmhVipYD?usp=sharing";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function VideoGallery({
  videos,
  title,
}: {
  videos: ActivityVideo[];
  title: string;
}) {
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState(false);
  const activeVideo = videos[activeIndex];

  if (!activeVideo) return null;

  const selectVideo = (index: number) => {
    mobileVideoRef.current?.pause();
    setIsPlaying(false);
    setHasStarted(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackError(false);
    setActiveIndex(index);
  };

  const showPrevious = () =>
    selectVideo((activeIndex - 1 + videos.length) % videos.length);
  const showNext = () => selectVideo((activeIndex + 1) % videos.length);

  const toggleMobilePlayback = async () => {
    const video = mobileVideoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setPlaybackError(true);
      }
    } else {
      video.pause();
    }
  };

  const seekMobileVideo = (value: number) => {
    const video = mobileVideoRef.current;
    if (!video) return;

    video.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-forest text-paper shadow-[0_24px_60px_rgba(23,61,50,0.18)]">
      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="bg-black">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[430px] overflow-hidden sm:aspect-video sm:max-w-none">
            <iframe
              key={activeVideo.id}
              className="hidden h-full w-full border-0 sm:block"
              src={`https://drive.google.com/file/d/${activeVideo.id}/preview`}
              title={`${title} — ${activeVideo.title}`}
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

            <video
              key={`mobile-${activeVideo.id}`}
              ref={mobileVideoRef}
              className="h-full w-full bg-black object-contain sm:hidden"
              src={activeVideo.src}
              aria-label={`${title} — ${activeVideo.title}`}
              playsInline
              preload="metadata"
              controls={false}
              onClick={toggleMobilePlayback}
              onPlay={() => {
                setIsPlaying(true);
                setHasStarted(true);
              }}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={(event) =>
                setCurrentTime(event.currentTarget.currentTime)
              }
              onLoadedMetadata={(event) =>
                setDuration(event.currentTarget.duration)
              }
              onEnded={() => setIsPlaying(false)}
              onError={() => setPlaybackError(true)}
            />

            {!hasStarted && !playbackError ? (
              <button
                type="button"
                onClick={toggleMobilePlayback}
                aria-label={`Putar ${activeVideo.title}`}
                className="absolute inset-0 z-10 grid place-items-center bg-gradient-to-t from-black/60 via-black/10 to-black/20 sm:hidden"
              >
                <span className="inline-flex items-center gap-3 rounded-2xl bg-black/80 px-5 py-4 text-white shadow-xl backdrop-blur-sm">
                  <span className="grid size-10 place-items-center rounded-full bg-white text-black">
                    <Play size={25} fill="currentColor" />
                  </span>
                  <span className="text-sm font-semibold">Putar video</span>
                </span>
              </button>
            ) : null}

            {hasStarted && !playbackError ? (
              <div
                className="absolute inset-x-3 bottom-3 z-20 rounded-2xl bg-black/75 p-3 backdrop-blur-md sm:hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step="0.1"
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) =>
                    seekMobileVideo(Number(event.currentTarget.value))
                  }
                  aria-label="Posisi video"
                  className="h-1.5 w-full cursor-pointer accent-white"
                />
                <div className="mt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={toggleMobilePlayback}
                    aria-label={isPlaying ? "Jeda video" : "Putar video"}
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-black active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause size={20} fill="currentColor" />
                    ) : (
                      <Play size={20} fill="currentColor" />
                    )}
                  </button>
                  <p className="text-xs font-semibold tabular-nums text-white">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>
              </div>
            ) : null}

            {playbackError ? (
              <div className="absolute inset-0 z-30 grid place-items-center bg-black px-8 text-center sm:hidden">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Video ini belum dapat diputar langsung di perangkat ini.
                  </p>
                  <a
                    href={`https://drive.google.com/file/d/${activeVideo.id}/view`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-black"
                  >
                    Buka video
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/10 bg-forest px-3 py-3 sm:hidden">
            <div className="grid grid-cols-[48px_1fr_48px] items-center gap-3">
              <button
                type="button"
                aria-label="Video sebelumnya"
                onClick={showPrevious}
                disabled={videos.length < 2}
                className="grid size-12 place-items-center rounded-xl border border-paper/15 bg-paper/10 text-paper transition active:scale-95 disabled:opacity-35"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="min-w-0 text-center">
                <p className="text-[11px] font-bold tracking-[0.14em] text-sage uppercase">
                  Video {activeIndex + 1} dari {videos.length}
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-paper">
                  {activeVideo.title}
                </p>
              </div>

              <button
                type="button"
                aria-label="Video berikutnya"
                onClick={showNext}
                disabled={videos.length < 2}
                className="grid size-12 place-items-center rounded-xl bg-paper text-forest transition active:scale-95 disabled:opacity-35"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        <aside className="hidden max-h-[520px] flex-col sm:flex">
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
                  onClick={() => selectVideo(index)}
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
