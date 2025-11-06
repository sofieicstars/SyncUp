// client/src/utils/api.js
const API_BASE = "http://localhost:5000/api";

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

export async function fetchUpdates(projectId) {
  const url = projectId
    ? `${API_BASE}/progress_updates?project_id=${projectId}`
    : `${API_BASE}/progress_updates`;
  const res = await fetch(url);
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
