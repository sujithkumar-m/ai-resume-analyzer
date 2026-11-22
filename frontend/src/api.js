/**
 * API client for AI Resume Analyzer backend
 */

// Base URL: configured via VITE_API_URL or defaults to local server
// Normalize by trimming trailing slashes and any trailing /api so that appending /api/* is uniform
const rawBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const API_BASE = rawBase
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      return {
        status: "offline",
        error: `Server returned HTML or non-JSON (${res.status}): ${text.slice(0, 80)}`,
      };
    }
    return await res.json();
  } catch (err) {
    return { status: "offline", error: err.message };
  }
}

export async function analyzeResumeFile(file, apiKey = "") {
  const formData = new FormData();
  formData.append("file", file);
  if (apiKey) {
    formData.append("gemini_api_key", apiKey.trim());
  }

  const headers = {};
  if (apiKey) {
    headers["X-Gemini-Key"] = apiKey.trim();
  }

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    body: formData,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Server returned HTML instead of JSON (${res.status}). Verify API URL: ${text.slice(0, 100)}`,
    );
  }

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to analyze resume.");
  }

  return data;
}

export async function loadSampleAnalysis(apiKey = "") {
  const url = new URL(`${API_BASE}/api/sample`);
  if (apiKey) {
    url.searchParams.append("gemini_api_key", apiKey.trim());
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: apiKey ? { "X-Gemini-Key": apiKey.trim() } : {},
  });

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Server returned HTML instead of JSON (${res.status}). Verify API URL: ${text.slice(0, 100)}`,
    );
  }

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to load sample resume.");
  }

  return data;
}
