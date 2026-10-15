import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { JsonLd, realEstateAgentSchema } from "@/lib/seo";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Cursor } from "@/components/motion/cursor";
import { IntroCurtain, introSkipScript } from "@/components/motion/intro-curtain";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Realtor in Kigali, Rwanda`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "realtor Kigali",
    "real estate agent Rwanda",
    "houses for sale Kigali",
    "property investment Rwanda",
    "buy property Kigali",
    "Nyarutarama houses",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Realtor in Kigali, Rwanda`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: introSkipScript }} />
        <IntroCurtain />
        <SmoothScroll />
        <Cursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
        <JsonLd data={realEstateAgentSchema} />
      </body>
    </html>
  );
}
