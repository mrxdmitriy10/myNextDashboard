import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./styles.module.scss";
import { Header } from "@/app/components/Header/Header";

import { SessionProvider } from "next-auth/react";
import { TopNav } from "./components/Header/TopNav/TopNav";
import Login from "./components/Header/Login/Login";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Я молодец",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <main className={styles.wrapper}>
          <SessionProvider>
            <div className="flex justify-end gap-5 text-md p-10">
              <Login>Вход</Login>
            </div>
            <TopNav />

            <Header />

            <section className={styles.content}>{children}</section>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
