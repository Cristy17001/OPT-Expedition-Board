import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Logo from './images/logo.png';
import "./globals.css";


const poppins = Poppins({ weight: ["400", "500", "100", "200", "300", "600", "700", "800", "900"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Expedition Board",
  description: "Developed as part of the Projeto Integrador 2023/2024",
  icons: [
    {
      rel: 'icon',
      sizes: '32x32',
      url: Logo.src,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
