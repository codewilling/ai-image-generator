import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "AI Image Generator by Leap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://framerusercontent.com/modules/ofHlHLXMTMVZSakMcj9V/xuWz1QtEclkUyBGiSuN9/assets/Y3RIZt4avGof0hx8e7RH41yIug.jpg"
        ></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
