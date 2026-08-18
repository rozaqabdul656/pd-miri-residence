import {
  ArrowUpRight,
  Compass,
  MapPin,
  Navigation,
  Route,
} from "lucide-react";
import { Crumb } from "@/components/common";
import { getProfile } from "@/lib/data";

export const metadata = {
  title: "Lokasi",
  description: "Alamat dan petunjuk arah menuju Pondok Miri Residence.",
};

export default function Location() {
  const profile = getProfile();
  const address = [
    profile.address,
    profile.city,
    profile.province,
    profile.postalCode,
  ]
    .filter(Boolean)
    .join(", ");
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${profile.name}, ${address}`,
  )}&output=embed`;

  return (
    <main>
      <section className="shell pt-8 sm:pt-10">
        <Crumb current="Lokasi" />

        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-12 text-paper sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute -right-20 -top-24 size-72 rounded-full border border-paper/10" />
          <div className="absolute -right-8 -top-12 size-48 rounded-full border border-paper/10" />

          <div className="relative max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-paper/85">
              <Compass size={15} />
              Lokasi kami
            </div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Temukan jalan pulang ke Pondok Miri.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-paper/70 sm:text-lg">
              Berada di lingkungan Rawakalong, Gunung Sindur—mudah ditemukan
              melalui Google Maps dan dekat dari kawasan Bogor–Tangerang Selatan.
            </p>
          </div>
        </div>
      </section>

      <section className="shell pb-24 pt-6 sm:pt-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-[0_24px_70px_rgba(23,61,50,0.10)] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col p-7 sm:p-10 lg:p-12">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-sage text-green">
              <MapPin size={24} />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-green">
              Alamat lengkap
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {profile.name}
            </h2>
            <p className="mt-4 leading-7 text-slate">{address}</p>

            <div className="mt-8 grid gap-3 border-y border-forest/10 py-6 text-sm">
              <div className="flex items-center gap-3">
                <Navigation className="text-green" size={18} />
                <span>Rawakalong, Gunung Sindur</span>
              </div>
              <div className="flex items-center gap-3">
                <Route className="text-green" size={18} />
                <span>Plus Code: JPH7+MC2</span>
              </div>
            </div>

            <a
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-green"
              href={profile.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Buka petunjuk arah
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="relative min-h-[420px] bg-sage lg:min-h-[570px]">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={mapsEmbedUrl}
              title={`Peta lokasi ${profile.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-2xl bg-paper/95 px-4 py-3 shadow-lg backdrop-blur sm:bottom-7 sm:left-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green">
                Tujuan
              </p>
              <p className="mt-1 font-semibold text-forest">Pondok Miri Residence</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
