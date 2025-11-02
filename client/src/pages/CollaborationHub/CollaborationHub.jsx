import React from "react";
import ProjectList from "./ProjectList";
import ProgressFeed from "./ProgressFeed";
import AddUpdateForm from "./AddUpdateForm";

export default function CollaborationHub() {
  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      {/* Left Column - Projects */}
      <div className="col-span-1 bg-white rounded-2xl shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-[--color-primary] mb-3">
          Projects
        </h2>
        <ProjectList />
      </div>

      {/* Center Column - Feed */}
      <div className="col-span-2 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[--color-primary] mb-2">
            Team Updates
          </h2>
          <ProgressFeed />
        </div>

        {/* Add Update Form */}
        <AddUpdateForm />
      </div>
    </div>
  );
}
