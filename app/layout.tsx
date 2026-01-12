import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catalog Dashboard",
  description: "Modern catalog dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
