import React, { useState, useEffect, useRef } from "react";
import { Bell, Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Fetch user placeholder
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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setActiveButton(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle menu toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveButton(activeButton === "menu" ? null : "menu");
  };

  // Handle notification focus state
  const toggleNotification = () => {
    setActiveButton(activeButton === "notification" ? null : "notification");
  };

  return (
    <header className="flex justify-between items-center bg-white rounded-2xl shadow-md px-6 py-3 mb-6 transition-all duration-300">
      {/* 🧑‍💼 User Info */}
      {user ? (
        <div className="flex items-center gap-3 bg-neutralLight px-4 py-2">
          <div className="w-8 h-8 bg-secondary/20 flex items-center justify-center rounded-full text-secondary font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-neutralDark">
              Welcome,{" "}
              <span className="text-primary font-semibold">
                {user.name.split(" ")[0]}
              </span>
            </p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-sm">Loading user...</div>
      )}

      {/* 🔔 Notification + Menu */}
      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {/* Notifications */}
        <button
          title="Notifications"
          onClick={toggleNotification}
          className={`relative p-2 rounded-full transition-all duration-300 hover:bg-neutralLight
            ${activeButton === "notification" ? "ring-2 ring-accent" : ""}`}
        >
          <Bell className="w-5 h-5 text-neutralDark" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className={`p-2 rounded-full transition-all duration-300 hover:bg-neutralLight
            ${activeButton === "menu" ? "ring-2 ring-accent" : ""}`}
        >
          {menuOpen ? (
            <X className="w-5 h-5 text-neutralDark transition-transform duration-300 rotate-180" />
          ) : (
            <Menu className="w-5 h-5 text-neutralDark transition-transform duration-300" />
          )}
        </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 top-12 w-44 bg-white shadow-lg rounded-xl border border-gray-100 z-10 overflow-hidden transform transition-all duration-300 origin-top-right ${
            menuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-neutralLight cursor-pointer text-neutralDark transition-colors">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-neutralLight cursor-pointer text-neutralDark transition-colors">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer font-medium border-t border-gray-100 transition-colors">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
