import React, { useEffect, useState } from "react";
import { fetchMentors } from "../../utils/api";

export default function MentorList({ selectedMentor, setSelectedMentor }) {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors().then((data) => {
      setMentors(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <p className="text-sm text-gray-500">Loading mentors...</p>;

  return (
    <div className="flex flex-col gap-3">
      {mentors.map((mentor) => {
        const isActive = selectedMentor === mentor.id;

        return (
          <button
            key={mentor.id}
            onClick={() =>
              setSelectedMentor(isActive ? null : mentor.id)
            }
            className={`
              w-full text-left p-3 rounded-xl border shadow-sm transition
              ${isActive 
                ? "bg-[--color-secondary]/20 border-[--color-secondary]" 
                : "bg-white border-gray-100 hover:shadow-md"}
            `}
          >
            <p className="font-semibold text-[--color-secondary]">{mentor.name}</p>
            <p className="text-sm text-gray-500">{mentor.email}</p>
          </button>
        );
      })}
    </div>
  );
}
