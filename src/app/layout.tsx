import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nook.example"),
  title: {
    default: "Nook | Find your corner of Brisbane",
    template: "%s | Nook",
  },
  description:
    "Nook helps renters, buyers, and investors compare Brisbane suburbs around budget, lifestyle, and goals.",
  keywords: [
    "Nook",
    "Brisbane suburb recommendations",
    "rent in Brisbane",
    "buy in Brisbane",
    "invest in Brisbane",
  ],
  openGraph: {
    title: "Nook",
    description:
      "Find your corner of Brisbane with suburb recommendations for renting, buying, and investing.",
    siteName: "Nook",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full bg-neutral-50 text-neutral-700">
        <div className="flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
