import React from "react";

export default function SessionCard({ session, onUpdateStatus, onDelete }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    declined: "bg-red-100 text-red-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const handleStatusClick = (status) => {
    if (!onUpdateStatus) return;
    onUpdateStatus(session.id, status);
  };

  const handleDeleteClick = () => {
    if (!onDelete) return;
    onDelete(session.id);
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      {/* Top row: topic + status badge */}
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

      {/* Details */}
      <p className="text-sm text-gray-600">{session.details}</p>

      <p className="text-xs text-gray-400 mt-1">
        Mentor: <span className="font-medium">{session.mentor}</span> • Intern:{" "}
        <span className="font-medium">{session.intern}</span> •{" "}
        {new Date(session.session_date).toLocaleString()}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mt-3 text-xs">
        <button
          type="button"
          onClick={() => handleStatusClick("accepted")}
          className="px-2 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => handleStatusClick("completed")}
          className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          Complete
        </button>
        <button
          type="button"
          onClick={() => handleStatusClick("cancelled")}
          className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="px-2 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
