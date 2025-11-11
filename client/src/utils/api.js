// src/utils/api.js
export const API_BASE = "http://localhost:5000/api";

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

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

export async function fetchSessions() {
  const res = await fetch(`${API_BASE}/mentorship/sessions`);
  return res.json();
}

export async function createSession(payload) {
  const res = await fetch(`${API_BASE}/mentorship/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
