import type { Metadata } from "next";
import { Montserrat } from "next/font/google"
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kick Off task",
  description: "Neon Prisma",
};

const inter = Montserrat({ weight: '400', subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Header/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
