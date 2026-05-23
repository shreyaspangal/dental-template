import type { Metadata } from "next";
import { Syne, Figtree } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
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

export const metadata: Metadata = {
  title: "DentaCare — Bright Smiles, Expert Care",
  description:
    "Pain-free, advanced dental treatments in a welcoming environment. Book your appointment with DentaCare today.",
  openGraph: {
    title: "DentaCare — Bright Smiles, Expert Care",
    description:
      "Pain-free, advanced dental treatments in a welcoming environment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-charcoal-800">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
