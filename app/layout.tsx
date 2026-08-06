import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FluffFilters from "@/components/FluffFilters";
import { SITE_URL } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The embed build is a full copy of the client's content hosted on
 * another domain, so it must not be indexed — otherwise the demo competes
 * with the real site as duplicate content. The client build is unaffected.
 */
const isEmbed = Boolean(process.env.EMBED_BASE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(isEmbed ? { robots: { index: false, follow: false } } : {}),
  title: {
    default: "RugRuff — Custom Hand-Tufted Rugs",
    template: "%s · RugRuff",
  },
  description:
    "Custom Rugs, Premade Rugs Or Just Look Around. Hand-tufted rugs made one at a time, with love into every piece.",
  openGraph: {
    title: "RugRuff — Custom Hand-Tufted Rugs",
    description:
      "Custom Rugs, Premade Rugs Or Just Look Around. Hand-tufted rugs made one at a time.",
    url: SITE_URL,
    siteName: "RugRuff",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="cloth flex min-h-full flex-col">
        <a
          href="#content"
          className="btn sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <FluffFilters />
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
