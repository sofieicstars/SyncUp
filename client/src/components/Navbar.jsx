import React, { useEffect, useState, useRef } from "react";
import { Bell, Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setUser(data[0]);
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    }
    fetchUser();
  }, []);

  // close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center bg-white rounded-2xl shadow px-6 py-4 mb-6 transition-all duration-300">
      {/* Left Section */}
      {user ? (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-full text-secondary font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm text-neutralDark">
              <span className="font-medium">Welcome,</span>{" "}
              <span className="font-semibold text-primary">
                {user.name.split(" ")[0]}
              </span>
            </p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-sm">Loading user...</div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* Notification Bell */}
        <button
          title="Notifications"
          className="relative p-2 rounded-full hover:bg-neutralLight transition"
        >
          <Bell className="w-5 h-5 text-neutralDark" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* Hamburger / Close Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          title="Menu"
          className="p-2 rounded-md hover:bg-neutralLight transition-transform duration-300"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-neutralDark transition-transform duration-300 rotate-180" />
          ) : (
            <Menu className="w-6 h-6 text-neutralDark transition-transform duration-300 rotate-0" />
          )}
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-12 right-2 w-44 bg-white shadow-lg rounded-lg border border-gray-100 z-10 overflow-hidden transition-all duration-300 transform origin-top-right ${
            menuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
          }`}
        >
          <button className="block w-full text-left px-4 py-2 text-sm text-neutralDark hover:bg-neutralLight">
            Profile
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-neutralDark hover:bg-neutralLight">
            Settings
          </button>
          <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
