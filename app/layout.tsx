import type { Metadata } from "next";
import "./globals.css";
import { BackToTop, Footer, Navbar } from "@/components/layout";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://pondok-miri-residence.vercel.app",
  ),
  title: {
    default: "Pondok Miri Residence | Profil & Kegiatan Warga",
    template: "%s | Pondok Miri Residence",
  },
  description:
    "Website resmi Pondok Miri Residence yang menampilkan profil lingkungan, kegiatan warga, galeri, fasilitas, dan informasi komunitas.",
  icons: {
    icon: "/images/profile/logo.png",
    apple: "/images/profile/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Pondok Miri Residence | Profil & Kegiatan Warga",
    description:
      "Website resmi Pondok Miri Residence yang menampilkan profil lingkungan, kegiatan warga, galeri, fasilitas, dan informasi komunitas.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
