import React from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "collaboration", label: "Collaboration Hub" },
    { id: "mentorship", label: "Mentorship Bridge" },
    { id: "skills", label: "Skill Tracker" },
    { id: "health", label: "System Health" },
  ];

  return (
    <div className="w-64 bg-primary text-white flex flex-col p-6 rounded-r-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-accent">SyncUp</h2>

      <nav className="flex flex-col gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-left font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white text-primary shadow-md"
                : "hover:bg-secondary/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <footer className="mt-auto pt-6 text-xs text-white/80 border-t border-white/20">
        v1.0 — Sprint 1
      </footer>
    </div>
  );
}
