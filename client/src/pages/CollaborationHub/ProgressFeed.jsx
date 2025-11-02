import React, { useEffect, useState } from "react";
import { fetchUpdates } from "../../utils/api";
import AddUpdateForm from "./AddUpdateForm";

export default function ProgressFeed() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUpdates();
  }, []);

  async function loadUpdates() {
    try {
      const data = await fetchUpdates();
      setUpdates(data);
    } catch (error) {
      console.error("Error fetching updates:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleNewUpdate = (newUpdate) => {
    setUpdates((prev) => [newUpdate, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Keep the form here */}
      <AddUpdateForm onNewUpdate={handleNewUpdate} />

      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 h-16 rounded-lg"
            ></div>
          ))}
        </div>
      ) : updates.length === 0 ? (
        <p className="text-gray-500 text-sm">No updates yet...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {updates.map((update) => (
            <div
              key={update.id}
              className="p-3 rounded-lg border border-gray-100 bg-[--color-neutral-light] hover:shadow transition"
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
          ))}
        </div>
      )}
    </div>
  );
}
