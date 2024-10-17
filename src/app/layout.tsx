
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from './styles.module.scss'
import { Header } from "@/app/components/Header/Header";



import { SessionProvider } from "next-auth/react";






const inter = Inter({ subsets: ["latin"] });



 export const metadata: Metadata = {
   title: "Dashboard",
   description: "Я молодец",


 }




export default function RootLayout({

  children,


}: Readonly<{
  children: React.ReactNode;
}>) {

 
    





  return (
    <html lang="ru">

      <body className={inter.className} >
        <main className={styles.wrapper}>

        <SessionProvider>

        <Header />
          <section className={styles.content}>
            {children}
          </section>

          </SessionProvider>
        </main>
        </body>
    </html>
  );
}
