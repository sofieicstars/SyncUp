import React, { useEffect, useState } from "react";
import { API_BASE } from "../../utils/api";

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const res = await fetch(`${API_BASE}/users?role=mentor`);
        const data = await res.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMentors();
  }, []);

  if (loading)
    return <p className="text-sm text-gray-500">Loading mentors...</p>;

  if (!mentors.length)
    return <p className="text-sm text-gray-500">No mentors found.</p>;

  return (
    <div className="flex flex-col gap-3">
      {mentors.map((mentor) => (
        <div
          key={mentor.id}
          className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition"
        >
          <p className="font-semibold text-secondary">{mentor.name}</p>
          <p className="text-sm text-gray-500">{mentor.email}</p>
          <p className="text-xs text-gray-400 capitalize">{mentor.role}</p>
        </div>
      ))}
    </div>
  );
}
