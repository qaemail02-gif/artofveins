import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Art of Veins",
  description: "Modern vein treatment center",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
