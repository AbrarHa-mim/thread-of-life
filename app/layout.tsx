import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "জীবনের সুতো — The Thread of Life",
  description: "Bureau of Personal Futures. A document. A thread. A warning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
