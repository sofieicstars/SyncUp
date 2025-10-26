import { useState, useEffect } from "react";
import "./App.css";
import { checkBackend } from "./utils/api";

export default function App() {
  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-[--color-primary]">SyncUp Frontend 🚀</h1>
      <p className="text-[--color-secondary]">
        Tailwind v4 custom theme active!
      </p>
    </div>
  );
}
