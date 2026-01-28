import React from "react";
import Sidebar from "@/components/Sidebar";

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ Retirez pt-20, min-h-screen, flex, justify-center
    // car ils sont déjà dans RootLayout
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="lg:col-span-3">{children}</div>
    </div>
  );
}
