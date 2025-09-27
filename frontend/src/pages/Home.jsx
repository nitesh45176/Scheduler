import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to Scheduler</h1>
      <p className="text-gray-600 mb-6">
        Manage your weekly recurring slots with ease.
      </p>
      <Link
        to="/schedule"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Go to Schedule
      </Link>
    </div>
  );
}
