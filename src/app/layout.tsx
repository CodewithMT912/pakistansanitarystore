import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Pakistan Sanitary Shop | Bathroom & Sanitary Ware",
  description:
    "Shop quality sanitary ware, bathroom fittings and plumbing products from trusted brands at New Pakistan Sanitary Shop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
