const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
  } catch {
    throw new Error('The case server is not reachable. Start the backend and try again.');
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.success) throw new Error(body.error?.message || 'Something went wrong. Please try again.');
  return body.data;
}

export const api = {
  session: () => request('/sessions', { method: 'POST', body: '{}' }),
  cases: () => request('/cases'),
  createCase: (payload) => request('/cases', { method: 'POST', body: JSON.stringify(payload) }),
  job: (id) => request(`/generation-jobs/${id}`),
  case: (id) => request(`/cases/${id}`),
  suspects: (id) => request(`/cases/${id}/suspects`),
  evidence: (id) => request(`/cases/${id}/evidence`),
  progress: (id) => request(`/cases/${id}/investigation`),
  discover: (caseId, evidenceId) => request(`/cases/${caseId}/evidence/${evidenceId}/discover`, { method: 'POST', body: '{}' }),
  bookmark: (caseId, evidenceId, enabled) => request(`/cases/${caseId}/evidence/${evidenceId}/bookmark`, { method: enabled ? 'POST' : 'DELETE', body: '{}' }),
  saveNote: (caseId, payload) => request(`/cases/${caseId}/investigation/notes`, { method: 'POST', body: JSON.stringify(payload) }),
  accuse: (caseId, payload) => request(`/cases/${caseId}/accusations`, { method: 'POST', body: JSON.stringify(payload) }),
  solution: (caseId) => request(`/cases/${caseId}/solution`),
};
