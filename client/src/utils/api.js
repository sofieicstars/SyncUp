// src/utils/api.js
export const API_BASE = "http://localhost:5000/api";

// ----------------------------------------------------
// PROJECTS
// ----------------------------------------------------
export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

// ----------------------------------------------------
// PROGRESS UPDATES (Collaboration Hub)
// ----------------------------------------------------
export async function fetchUpdates() {
  const res = await fetch(`${API_BASE}/progress_updates`);
  return res.json();
}

export async function postUpdate(content, projectId, userId) {
  const res = await fetch(`${API_BASE}/progress_updates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, project_id: projectId, user_id: userId }),
  });
  return res.json();
}

// ----------------------------------------------------
// MENTORSHIP — GET SESSIONS
// ----------------------------------------------------
export async function fetchSessions() {
  const res = await fetch(`${API_BASE}/mentorship/sessions`);
  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
}

// ----------------------------------------------------
// MENTORSHIP — CREATE NEW SESSION
// ----------------------------------------------------
export async function createSession(payload) {
  const res = await fetch(`${API_BASE}/mentorship/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create mentorship session");
  return res.json();
}

// ----------------------------------------------------
// MENTORSHIP — GET MENTORS
// ----------------------------------------------------
export async function fetchMentors() {
  const res = await fetch(`${API_BASE}/mentorship/mentors`);
  if (!res.ok) throw new Error("Failed to fetch mentors");
  return res.json();
}

// ----------------------------------------------------
// MENTORSHIP — UPDATE SESSION STATUS (PUT)
// ----------------------------------------------------
export async function updateSessionStatus(id, updates) {
  const res = await fetch(`${API_BASE}/mentorship/sessions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates), // { status, notes }
  });

  if (!res.ok) throw new Error("Failed to update session status");
  return res.json();
}

// ----------------------------------------------------
// MENTORSHIP — DELETE SESSION
// ----------------------------------------------------
export async function deleteSession(id) {
  const res = await fetch(`${API_BASE}/mentorship/sessions/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete session");
  return res.json();
}
