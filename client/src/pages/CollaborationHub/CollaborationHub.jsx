import React from "react";
import ProjectList from "./ProjectList";
import ProgressFeed from "./ProgressFeed";

export default function CollaborationHub() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[0.9fr_1.6fr] gap-1">
      <div>
        <h2 className="section-heading">Projects</h2>
        ...
        <h2 className="section-heading">Team Updates</h2>
        <ProjectList />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-[--color-primary] mb-3">
          Team Updates
        </h2>
        <ProgressFeed />
      </div>
    </section>
  );
}
