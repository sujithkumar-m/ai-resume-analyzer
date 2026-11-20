/**
 * API client for AI Resume Analyzer backend
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}

export async function analyzeResumeFile(file, apiKey = '') {
  const formData = new FormData();
  formData.append('file', file);
  if (apiKey) {
    formData.append('gemini_api_key', apiKey.trim());
  }

  const headers = {};
  if (apiKey) {
    headers['X-Gemini-Key'] = apiKey.trim();
  }

  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    body: formData,
    headers,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to analyze resume.');
  }

  return data;
}

export async function loadSampleAnalysis(apiKey = '') {
  const url = new URL(`${API_BASE}/sample`);
  if (apiKey) {
    url.searchParams.append('gemini_api_key', apiKey.trim());
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: apiKey ? { 'X-Gemini-Key': apiKey.trim() } : {},
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to load sample resume.');
  }

  return data;
}
