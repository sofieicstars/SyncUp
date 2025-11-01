import { useState, useEffect } from "react";
import "./App.css";
import { checkBackend } from "./utils/api";
import HealthStatus from "./components/HealthStatus";

export default function App() {
  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4 text-primary">
          SyncUp Frontend 🚀
        </h1>
        <HealthStatus />
      </div>

      <p className="text-[--color-secondary]">Hey this is Tailwind</p>
    </div>
  );
}
