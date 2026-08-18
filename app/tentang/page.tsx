import Link from "next/link";
import { ArrowUpRight, CalendarDays, Camera, HeartHandshake, Home, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { Crumb, SafeImage } from "@/components/common";
import { getActivities, getProfile } from "@/lib/data";

export const metadata = { title: "Tentang" };
const valueIcons = [HeartHandshake, ShieldCheck, UsersRound];

export default function About() {
  const profile = getProfile();
  const activities = getActivities();
  const documentedYears = new Set(activities.map((activity) => activity.year)).size;
  const photoCount = activities.reduce((total, activity) => total + activity.images.length + (activity.cover ? 1 : 0), 0);
  const stats = [
    { value: activities.length, label: "Kegiatan terdokumentasi", icon: CalendarDays },
    { value: documentedYears, label: "Tahun dokumentasi", icon: Camera },
    { value: photoCount, label: "Momen kebersamaan", icon: Sparkles },
  ];

  return <>
    <section className="shell pt-10 pb-6 sm:pt-14">
      <Crumb current="Tentang" />
      <div className="relative overflow-hidden rounded-[2rem] bg-forest text-paper">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-green/30 blur-3xl" />
        <div className="absolute right-1/3 bottom-0 h-48 w-48 rounded-full bg-moss/15 blur-3xl" />
        <div className="relative grid min-h-[610px] lg:grid-cols-[1.02fr_.98fr]">
          <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[.2em] text-sage uppercase"><span className="h-px w-8 bg-sage" />Tentang kami</p>
            <h1 className="mt-7 max-w-xl text-5xl leading-[1.03] font-semibold tracking-[-.045em] sm:text-6xl">Rumah terasa lebih hangat saat tumbuh bersama.</h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-paper/72">{profile.description}</p>
            <div className="mt-9 flex flex-wrap gap-2 text-sm text-paper/80">
              {['Nyaman', 'Peduli', 'Guyub'].map((item) => <span key={item} className="rounded-full border border-paper/20 bg-paper/7 px-4 py-2">{item}</span>)}
            </div>
          </div>
          <div className="relative min-h-[480px] overflow-hidden lg:min-h-full">
            <SafeImage src="/images/activities/2026/agustusan/img_9166.jpg" alt="Kebersamaan warga Pondok Miri Residence" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-forest/45 lg:via-transparent lg:to-transparent" />
            <div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/15 bg-forest/60 p-5 backdrop-blur-md sm:right-8 sm:bottom-8 sm:left-8"><p className="text-sm leading-6 text-paper/85">“{profile.tagline}”</p></div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-4 -mt-8 grid overflow-hidden rounded-2xl border border-forest/8 bg-paper shadow-[0_18px_50px_rgba(23,61,50,.12)] sm:mx-10 sm:grid-cols-3">
        {stats.map(({ value, label, icon: Icon }, index) => <div key={label} className={`flex items-center gap-4 p-5 sm:p-6 ${index ? 'border-t border-forest/8 sm:border-t-0 sm:border-l' : ''}`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage text-green"><Icon size={19} aria-hidden="true" /></span>
          <div><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="text-xs leading-5 text-slate">{label}</p></div>
        </div>)}
      </div>
    </section>

    <section className="shell section">
      <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg pb-10 pl-6 sm:pl-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]"><SafeImage src="/images/activities/2026/kerja-bakti/img_4334.jpg" alt="Warga menata lingkungan Pondok Miri Residence" /></div>
          <div className="absolute bottom-0 left-0 w-[48%] rounded-2xl border-8 border-paper bg-paper shadow-xl"><div className="relative aspect-square overflow-hidden rounded-xl"><SafeImage src="/images/activities/2026/agustusan/img_9191.jpg" alt="Kebersamaan anak-anak Pondok Miri Residence" /></div></div>
        </div>
        <div>
          <p className="eyebrow">Lebih dari sekadar alamat</p>
          <h2 className="mt-4 max-w-xl text-4xl leading-tight font-semibold tracking-[-.035em] sm:text-5xl">Lingkungan hidup yang dirawat bersama.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">Pondok Miri Residence adalah ruang untuk pulang, bertumbuh, dan mengenal tetangga lebih dekat. Kenyamanan lingkungan hadir dari hal-hal sederhana yang dijaga bersama setiap hari.</p>
          <p className="mt-5 max-w-2xl leading-7 text-slate">Melalui website ini, cerita kegiatan dan momen warga disimpan sebagai arsip bersama—agar kebersamaan hari ini tetap bisa dikenang di kemudian hari.</p>
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-cream p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest text-paper"><Home size={19} aria-hidden="true" /></span><div><p className="font-semibold">{profile.name}</p><p className="mt-1 text-sm text-slate">{profile.tagline}</p></div></div>
        </div>
      </div>
    </section>

    <section className="bg-cream"><div className="shell section"><div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
      <div><p className="eyebrow">Nilai komunitas</p><h2 className="mt-4 text-4xl leading-tight font-semibold tracking-[-.035em]">Nilai kecil yang membuat lingkungan terasa berarti.</h2><p className="mt-5 leading-7 text-slate">Tiga hal sederhana yang menjadi napas kebersamaan warga Pondok Miri Residence.</p></div>
      <div className="grid gap-4">{profile.values.map((value, index) => { const Icon = valueIcons[index % valueIcons.length]; return <article key={value.title} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border border-forest/8 bg-paper p-5 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-6"><span className="grid h-12 w-12 place-items-center rounded-full bg-sage text-green transition group-hover:bg-forest group-hover:text-paper"><Icon size={21} aria-hidden="true" /></span><div><h3 className="text-xl font-semibold">{value.title}</h3><p className="mt-1 leading-6 text-slate">{value.description}</p></div><span className="hidden text-3xl font-light text-moss/60 sm:block">0{index + 1}</span></article> })}</div>
    </div></div></section>

    <section className="shell py-20"><div className="relative overflow-hidden rounded-[2rem] bg-green px-7 py-12 text-paper sm:px-12 sm:py-14"><div className="absolute -right-12 -bottom-24 h-64 w-64 rounded-full border-[45px] border-paper/8" /><div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-bold tracking-[.18em] text-sage uppercase">Cerita warga</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Lihat kebersamaan yang menghidupkan lingkungan kami.</h2></div><Link href="/kegiatan" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-forest transition hover:gap-3">Jelajahi kegiatan<ArrowUpRight size={17} /></Link></div></div></section>
  </>;
}
