import React, { useEffect, useState } from "react";

export default function ProgressFeed() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    async function fetchUpdates() {
      const res = await fetch("http://localhost:5000/api/progress_updates");
      const data = await res.json();
      setUpdates(data);
    }
    fetchUpdates();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {updates.length === 0 ? (
        <p className="text-gray-500 text-sm">No updates yet...</p>
      ) : (
        updates.map((update) => (
          <div
            key={update.id}
            className="p-3 rounded-lg border border-gray-100 bg-[--color-neutral-light]"
          >
            <p className="text-[--color-neutral-dark] text-sm mb-1">
              <span className="font-semibold text-[--color-secondary]">
                {update.user_name}
              </span>{" "}
              — {update.project_title}
            </p>
            <p className="text-gray-700">{update.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(update.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
