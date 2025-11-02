import React, { useState } from "react";

export default function AddUpdateForm() {
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    await fetch("http://localhost:5000/api/progress_updates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: 1,
        user_id: 1,
        content,
      }),
    });

    setContent("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow-md flex gap-3 items-center"
    >
      <textarea
        className="flex-1 border border-gray-200 rounded-xl p-3 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary]/40"
        rows="2"
        placeholder="Share an update..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[--color-primary] text-white font-medium px-4 py-2 rounded-xl hover:bg-[--color-secondary] transition"
      >
        Post
      </button>
    </form>
  );
}
