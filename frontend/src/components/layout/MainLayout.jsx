import React from "react";
import Navbar from "../common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
