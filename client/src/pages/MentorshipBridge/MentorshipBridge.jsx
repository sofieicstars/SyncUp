import React from "react";
import MentorList from "./MentorList";
import SessionList from "./SessionList";
import SessionRequestForm from "./SessionRequestForm";

export default function MentorshipBridge() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6">
      {/* Left: Mentor directory */}
      <div>
        <h2 className="text-lg font-semibold text-primary mb-3">Mentors</h2>
        <MentorList />
      </div>

      {/* Right: Session management */}
      <div>
        <h2 className="text-lg font-semibold text-primary mb-3">My Sessions</h2>
        <SessionRequestForm />
        <SessionList />
      </div>
    </section>
  );
}
