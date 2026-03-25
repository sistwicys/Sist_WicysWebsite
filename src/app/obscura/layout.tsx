import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "OBSCURA: The Forbidden Cipher | WiCyS CTF",
  description:
    "OBSCURA — A Magical Capture The Flag Experience. Enter the realm where ancient ciphers meet modern cybersecurity. Register now for the ultimate CTF challenge.",
  keywords: ["OBSCURA", "CTF", "Capture The Flag", "WiCyS", "Sathyabama", "cybersecurity", "competition"],
};

import BackgroundMusic from "@/components/ctf/BackgroundMusic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          {/* Fixed mural background */}
          <div className="bg-mural">
            <Image src="/ctf/images/hero-bg.png" alt="" aria-hidden="true" fill priority style={{ objectFit: 'cover' }} />
          </div>
          <BackgroundMusic />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
