"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const financialReportUrl =
  "https://drive.google.com/file/d/1BLBiv22cNGx1yD-zGwlPMAy7XlIKskUI/view?usp=sharing";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Laporan Keuangan", href: financialReportUrl, external: true },
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
  const content = (
    <>
      {link.label}
      {link.external && <ExternalLink aria-hidden="true" size={13} />}
    </>
  );

  if (link.external) {
    return (
      <a
        className={className}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={link.href} onClick={onClick}>
      {content}
    </Link>
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
          {links.map((link) => (
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
          {links.map((link) => (
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
            {links.slice(1, 7).map((link) => (
              <NavigationLink
                className="inline-flex items-center gap-1"
                key={link.href}
                link={link}
              />
            ))}
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
