"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUp,
  ChevronDown,
  ExternalLink,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const financialReports = [
  {
    label: "Juli 2026",
    href: "https://drive.google.com/file/d/1BLBiv22cNGx1yD-zGwlPMAy7XlIKskUI/view?usp=sharing",
  },
];

const links = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Lokasi", href: "/lokasi" },
  { label: "Kontak", href: "/kontak" },
];

function NavigationLink({
  link,
  className,
  onClick,
}: {
  link: (typeof links)[number];
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link className={className} href={link.href} onClick={onClick}>
      {link.label}
    </Link>
  );
}

function DesktopFinancialReports() {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap transition hover:text-green [&::-webkit-details-marker]:hidden">
        Laporan Keuangan
        <ChevronDown
          aria-hidden="true"
          size={14}
          className="transition group-open:rotate-180"
        />
      </summary>
      <div className="absolute right-0 top-[calc(100%+1rem)] w-56 overflow-hidden rounded-2xl border border-forest/10 bg-paper p-2 text-sm shadow-[0_18px_45px_rgba(23,61,50,0.16)]">
        <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate">
          Arsip bulanan
        </p>
        {financialReports.map((report) => (
          <a
            key={report.href}
            href={report.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-forest transition hover:bg-sage"
          >
            <span className="flex items-center gap-2.5">
              <FileText className="text-green" size={17} />
              <span className="font-semibold">{report.label}</span>
            </span>
            <ExternalLink aria-hidden="true" size={13} />
          </a>
        ))}
      </div>
    </details>
  );
}

function MobileFinancialReports({ onOpen }: { onOpen: () => void }) {
  return (
    <details className="group">
      <summary className="shell flex cursor-pointer list-none items-center justify-between py-3 font-medium [&::-webkit-details-marker]:hidden">
        Laporan Keuangan
        <ChevronDown
          aria-hidden="true"
          size={17}
          className="transition group-open:rotate-180"
        />
      </summary>
      <div className="shell pb-3">
        {financialReports.map((report) => (
          <a
            key={report.href}
            href={report.href}
            target="_blank"
            rel="noreferrer"
            onClick={onOpen}
            className="flex items-center justify-between rounded-xl bg-sage px-4 py-3 text-sm text-forest"
          >
            <span className="flex items-center gap-2.5 font-semibold">
              <FileText className="text-green" size={17} />
              {report.label}
            </span>
            <ExternalLink aria-hidden="true" size={14} />
          </a>
        ))}
      </div>
    </details>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-paper/95 backdrop-blur">
      <nav className="shell flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 font-semibold tracking-tight text-forest"
        >
          <Image
            src="/images/profile/logo.png"
            alt="Logo Pondok Miri Residence"
            width={42}
            height={42}
            className="size-10 rounded-xl object-cover shadow-sm"
            priority
          />
          <span>Pondok Miri Residence</span>
        </Link>

        <div className="hidden items-center gap-3 text-xs font-medium lg:flex xl:gap-5 xl:text-sm">
          {links.slice(0, 6).map((link) => (
            <NavigationLink
              className="inline-flex items-center gap-1 whitespace-nowrap transition hover:text-green"
              key={link.href}
              link={link}
            />
          ))}
          <DesktopFinancialReports />
          {links.slice(6).map((link) => (
            <NavigationLink
              className="inline-flex items-center gap-1 whitespace-nowrap transition hover:text-green"
              key={link.href}
              link={link}
            />
          ))}
        </div>

        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-forest/10 bg-paper lg:hidden">
          {links.slice(0, 6).map((link) => (
            <NavigationLink
              className="shell flex items-center gap-1.5 py-3 font-medium"
              key={link.href}
              link={link}
              onClick={() => setOpen(false)}
            />
          ))}
          <MobileFinancialReports onOpen={() => setOpen(false)} />
          {links.slice(6).map((link) => (
            <NavigationLink
              className="shell flex items-center gap-1.5 py-3 font-medium"
              key={link.href}
              link={link}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <div className="shell grid gap-8 py-14 sm:grid-cols-2">
        <div className="flex items-center gap-4">
          <Image
            src="/images/profile/logo.png"
            alt="Logo Pondok Miri Residence"
            width={58}
            height={58}
            className="size-14 rounded-2xl object-cover ring-1 ring-paper/15"
          />
          <div>
            <p className="text-lg font-semibold">Pondok Miri Residence</p>
            <p className="mt-1 text-sm text-paper/70">
              Hunian Nyaman, Lingkungan Harmonis
            </p>
          </div>
        </div>
        <div className="sm:text-right">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:justify-end">
            {links.slice(1, 6).map((link) => (
              <NavigationLink
                className="inline-flex items-center gap-1"
                key={link.href}
                link={link}
              />
            ))}
            <a
              href={financialReports[0].href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              Laporan Keuangan Juli 2026
              <ExternalLink aria-hidden="true" size={13} />
            </a>
          </div>
          <p className="mt-5 text-xs text-paper/60">
            © {new Date().getFullYear()} Pondok Miri Residence
          </p>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(scrollY > 500);
    addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  return show ? (
    <button
      aria-label="Kembali ke atas"
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-30 rounded-full bg-forest p-3 text-white shadow-lg"
    >
      <ArrowUp size={18} />
    </button>
  ) : null;
}
