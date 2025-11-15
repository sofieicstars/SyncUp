import React, { useState } from "react";
import MentorList from "./MentorList";
import SessionList from "./SessionList";
import SessionRequestForm from "./SessionRequestForm";

export default function MentorshipBridge() {
  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6">
      {/* Mentors */}
      <div>
        <h2 className="text-lg font-semibold text-primary mb-3">Mentors</h2>
        <MentorList
          selectedMentor={selectedMentor}
          setSelectedMentor={setSelectedMentor}
        />
      </div>

      {/* Sessions */}
      <div>
        <h2 className="text-lg font-semibold text-primary mb-3">My Sessions</h2>

        <SessionRequestForm selectedMentor={selectedMentor} />

        <SessionList selectedMentor={selectedMentor} />
      </div>
    </section>
  );
}
