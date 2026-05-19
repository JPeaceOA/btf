// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUB-NATIONAL INVESTMENT AND TOURISM INFORMATION SUBMIT",
  description:
    " ",
  icons: {
    icon: "/1.jpeg",
  },
  openGraph: {
    title: "SUB-NATIONAL INVESTMENT AND TOURISM INFORMATION SUBMIT",
    description: " ",
    images: [{ url: "/1.jpeg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
