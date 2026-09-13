import type { Metadata } from "next";
import "./globals.css";
import "./font.css";

export const metadata: Metadata = { title: "สื่อการเรียนรู้มัลติมีเดียด้วย AI | Multimedia Starter Kit", description: "การออกแบบและพัฒนาเว็บไซต์สื่อการเรียนรู้ด้านการผลิตสื่อมัลติมีเดียด้วยเครื่องมือปัญญาประดิษฐ์" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="th" suppressHydrationWarning><body>{children}</body></html>; }
