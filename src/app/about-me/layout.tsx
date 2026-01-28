import React from "react";
import Sidebar from "@/components/Sidebar";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
