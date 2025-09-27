import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold text-lg">Scheduler</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
      </div>
    </nav>
  );
}
