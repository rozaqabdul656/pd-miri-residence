import { AtSign, Mail, MessageCircle, Share2 } from "lucide-react";
import { Crumb, Empty, SectionTitle } from "@/components/common";
import { getContact, getProfile } from "@/lib/data";

export const metadata = { title: "Kontak" };

function whatsappHref(value: string) {
  const digits = value.replace(/\D/g, "");
  const internationalNumber = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits;

  return `https://wa.me/${internationalNumber}`;
}

export default function ContactPage() {
  const contact = getContact();
  const profile = getProfile();
  const items = [
    contact.whatsapp && [
      "WhatsApp",
      contact.whatsapp,
      MessageCircle,
      whatsappHref(contact.whatsapp),
    ],
    contact.email && ["Email", contact.email, Mail, `mailto:${contact.email}`],
    contact.instagram && [
      "Instagram",
      contact.instagram,
      AtSign,
      contact.instagram,
    ],
    contact.facebook && [
      "Facebook",
      contact.facebook,
      Share2,
      contact.facebook,
    ],
  ].filter(Boolean) as [string, string, typeof MessageCircle, string][];

  return (
    <section className="shell section">
      <Crumb current="Kontak" />
      <SectionTitle
        eyebrow="Terhubung dengan kami"
        title={`Kontak ${profile.name}`}
        copy="Hubungi kami melalui WhatsApp untuk informasi dan komunikasi seputar lingkungan Pondok Miri Residence."
      />
      {items.length ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map(([name, value, Icon, href]) => (
            <a
              className="card flex items-center gap-4 p-6"
              href={href}
              key={name}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="text-green" />
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-slate">{value}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <Empty>Informasi kontak belum tersedia.</Empty>
        </div>
      )}
    </section>
  );
}
