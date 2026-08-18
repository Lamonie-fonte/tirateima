import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tirateima.vercel.app",
  ),
  title: {
    default: "Tira-Teima Cagece — Confira sua conta de água",
    template: "%s | Tira-Teima Cagece",
  },
  description:
    "Confira uma estimativa da sua conta de água e esgoto usando a tabela tarifária oficial da Cagece.",
  applicationName: "Tira-Teima Cagece",
  keywords: [
    "Cagece",
    "conta de água",
    "tarifa Cagece",
    "Fortaleza",
    "Ceará",
  ],
  openGraph: {
    title: "Tira-Teima Cagece",
    description: "Entenda se o valor da sua conta está próximo da tarifa oficial.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#075da8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
