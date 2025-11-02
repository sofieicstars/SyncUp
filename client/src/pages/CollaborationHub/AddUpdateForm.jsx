import React, { useState } from "react";
import { postUpdate } from "../../utils/api";

export default function AddUpdateForm({ onNewUpdate }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim() || loading) return;

    try {
      setLoading(true);
      setError("");
      const newUpdate = await postUpdate(content, 1, 1);

      setContent("");
      if (onNewUpdate) onNewUpdate(newUpdate);
    } catch (err) {
      console.error("Error posting update:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow-md w-full"
      style={{ transition: "none" }}
    >
      <div className="flex gap-3 items-start" style={{ transition: "none" }}>
        <textarea
          className="flex-1 border border-gray-200 rounded-xl p-3 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40 min-h-[60px]"
          rows="2"
          placeholder="Share an update..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
        />

        <button
          type="submit"
          disabled={loading || !content.trim()}
          style={{
            transition: "background-color 0.2s",
            backgroundColor:
              loading || !content.trim() ? "#4c5fd9aa" : "#4c5fd9",
          }}
          className="px-6 py-2.5 rounded-xl font-medium text-white whitespace-nowrap text-sm min-w-[80px] hover:bg-[#db5d50] disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2" style={{ transition: "none" }}>
          {error}
        </p>
      )}
    </form>
  );
}
