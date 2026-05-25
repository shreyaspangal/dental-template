import type { Metadata } from "next";
import { Syne, Figtree } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { loadBrand } from "@/lib/brand";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const { content, themeVars, googleFontsUrl } = loadBrand();

const { icon, icon32, apple } = content.FAVICON;

export const metadata: Metadata = {
  title: content.METADATA.title,
  description: content.METADATA.description,
  openGraph: {
    title: content.METADATA.title,
    description: content.METADATA.description,
    type: "website",
  },
  icons: {
    icon: [
      ...(icon32 ? [{ url: icon32, sizes: "32x32" }] : []),
      ...(icon   ? [{ url: icon,   sizes: "192x192" }] : []),
    ],
    apple: apple ? [{ url: apple }] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${figtree.variable} h-full antialiased`}
      style={themeVars as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal-800">
        {googleFontsUrl && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={googleFontsUrl} />
          </>
        )}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
