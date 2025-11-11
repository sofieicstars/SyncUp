import React, { useState } from "react";
import { createSession } from "../../utils/api";

export default function SessionRequestForm() {
  const [formData, setFormData] = useState({
    mentor_id: "",
    topic: "",
    details: "",
    session_date: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createSession({
        intern_id: 1, // later replace with logged-in user
        ...formData,
      });
      alert("Session request submitted!");
      setFormData({ mentor_id: "", topic: "", details: "", session_date: "" });
    } catch (err) {
      console.error("Error creating session:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow-md mb-6 flex flex-col gap-3"
    >
      <input
        type="number"
        placeholder="Mentor ID"
        className="border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        value={formData.mentor_id}
        onChange={(e) =>
          setFormData({ ...formData, mentor_id: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Session Topic"
        className="border border-gray-200 rounded-lg p-2 text-sm"
        value={formData.topic}
        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
      />
      <textarea
        placeholder="Session Details"
        className="border border-gray-200 rounded-lg p-2 text-sm resize-none"
        rows="2"
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
      />
      <input
        type="datetime-local"
        className="border border-gray-200 rounded-lg p-2 text-sm"
        value={formData.session_date}
        onChange={(e) =>
          setFormData({ ...formData, session_date: e.target.value })
        }
      />
      <button
        type="submit"
        disabled={loading}
        className={`rounded-xl py-2 px-4 text-white font-medium transition ${
          loading
            ? "bg-primary/60 cursor-not-allowed"
            : "bg-primary hover:bg-secondary"
        }`}
      >
        {loading ? "Submitting..." : "Request Mentorship"}
      </button>
    </form>
  );
}
