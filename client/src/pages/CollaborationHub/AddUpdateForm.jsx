import React, { useState } from "react";
import { postUpdate } from "../../utils/api"; // ✅ centralized API function

export default function AddUpdateForm({ onNewUpdate }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      setError("");
      const newUpdate = await postUpdate(content, 1, 1); // temporary static IDs

      setContent("");
      if (onNewUpdate) onNewUpdate(newUpdate); // ✅ notify parent (ProgressFeed)
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
      className="bg-white p-4 rounded-2xl shadow-md flex gap-3 items-start"
    >
      <textarea
        className="flex-1 border border-gray-200 rounded-xl p-3 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40"
        rows="2"
        placeholder="Share an update..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded-xl font-medium text-white transition ${
          loading
            ? "bg-[--color-primary]/60 cursor-not-allowed"
            : "bg-[--color-primary] hover:bg-[--color-secondary]"
        }`}
      >
        {loading ? "Posting..." : "Post"}
      </button>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </form>
  );
}
