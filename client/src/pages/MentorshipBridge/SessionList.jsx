import React, { useEffect, useState } from "react";
import {
  fetchSessions,
  updateSessionStatus,
  deleteSession,
} from "../../utils/api";
import SessionCard from "./SessionCard";

export default function SessionList({ selectedMentor }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSessions() {
    const data = await fetchSessions();

    // Apply filter if a mentor is selected
    if (selectedMentor) {
      setSessions(data.filter((s) => s.mentor_id === selectedMentor));
    } else {
      setSessions(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSessions();
  }, [selectedMentor]); // reload when filter changes

  const handleUpdateStatus = async (id, status) => {
    await updateSessionStatus(id, { status });
    loadSessions();
  };

  const handleDelete = async (id) => {
    await deleteSession(id);
    loadSessions();
  };

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col gap-3">
      {sessions.length === 0 ? (
        <p className="text-sm text-gray-500">
          {selectedMentor
            ? "No sessions with this mentor yet."
            : "No mentorship sessions found."}
        </p>
      ) : (
        sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
