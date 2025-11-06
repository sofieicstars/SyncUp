import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HealthStatus from "../components/HealthStatus";
import CollaborationHub from "./CollaborationHub/CollaborationHub";
import MentorshipBridge from "./MentorshipBridge";
import SkillTracker from "./SkillTracker";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("collaboration");

  const renderPage = () => {
    switch (activeTab) {
      case "collaboration":
        return <CollaborationHub />;
      case "mentorship":
        return <MentorshipBridge />;
      case "skills":
        return <SkillTracker />;
      case "health":
        return <HealthStatus />;
      default:
        return <CollaborationHub />;
    }
  };

  return (
    <>
      <div className="flex h-screen bg-neutralLight text-neutralDark">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 overflow-y-auto">
          <Navbar />
          {renderPage()}
        </main>
      </div>
    </>
  );
}
