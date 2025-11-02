import React from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "collaboration", label: "Collaboration Hub" },
    { id: "mentorship", label: "Mentorship Bridge" },
    { id: "skills", label: "Skill Tracker" },
    { id: "health", label: "System Health" },
  ];

  return (
    <div className="w-64 bg-primary text-white flex flex-col p-6 rounded-r-2xl shadow-xl">
      {/* App Title */}
      <h2 className="text-3xl font-extrabold mb-8 text-accent tracking-tight">
        SyncUp
      </h2>

      {/* Navigation Tabs */}
      <nav className="flex flex-col gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-left font-medium transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-md border-l-4 border-accent"
                  : "hover:bg-secondary/40 text-white/90 focus:ring-2 focus:ring-accent focus:outline-none"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Footer Version Label */}
      <footer className="mt-auto pt-6 text-xs text-white/70 border-t border-white/20">
        v1.0 — Sprint 1
      </footer>
    </div>
  );
}
