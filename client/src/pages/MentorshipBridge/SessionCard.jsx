import React from "react";

export default function SessionCard({ session }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow transition">
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold text-[--color-secondary]">
          {session.topic}
        </p>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusColors[session.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {session.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">{session.details}</p>
      <p className="text-xs text-gray-400 mt-1">
        Mentor: <span className="font-medium">{session.mentor}</span> •{" "}
        {new Date(session.session_date).toLocaleString()}
      </p>
    </div>
  );
}
