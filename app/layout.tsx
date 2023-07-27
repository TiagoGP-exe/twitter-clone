import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { UserProvider } from "./hooks/useUser";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "A Twitter clone built with Next.js and Supabase",
  twitter: {
    card: "summary_large_image",
    creator: "@supabase_io",
    site: "@supabase_io",
  },
  keywords: "twitter, clone, nextjs, supabase",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
