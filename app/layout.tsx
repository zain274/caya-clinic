import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500"] });
const body = Poppins({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "CAYA Clinic | Skin · Hair · Aesthetic, Karachi",
  description: "Advanced skincare, hair care and aesthetic treatments in Karachi for natural, long-lasting results.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
