import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
