import React, { useEffect, useState } from "react";
import { fetchSessions } from "../../utils/api";
import SessionCard from "./SessionCard";

export default function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSessions();
        setSessions(data);
      } catch (err) {
        console.error("Error loading sessions:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-sm">Loading sessions...</p>;
  if (!sessions.length)
    return <p className="text-gray-500 text-sm">No sessions found.</p>;

  return (
    <div className="flex flex-col gap-3">
      {sessions.map((s) => (
        <SessionCard key={s.id} session={s} />
      ))}
    </div>
  );
}
