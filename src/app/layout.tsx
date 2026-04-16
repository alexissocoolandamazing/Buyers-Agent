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
  metadataBase: new URL("https://suburbiq.example"),
  title: {
    default: "SuburbIQ | Brisbane property discovery platform",
    template: "%s | SuburbIQ",
  },
  description:
    "SuburbIQ is a premium Brisbane property discovery platform for renting, buying, and investing with transparent suburb rankings.",
  keywords: [
    "Brisbane property platform",
    "Brisbane suburb rankings",
    "rent in Brisbane",
    "buy in Brisbane",
    "invest in Brisbane",
  ],
  openGraph: {
    title: "SuburbIQ",
    description:
      "Find Brisbane suburbs for renting, buying, or investing with calm design, clear logic, and readable recommendations.",
    siteName: "SuburbIQ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${display.variable} min-h-full bg-neutral-50 text-neutral-700`}>
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
