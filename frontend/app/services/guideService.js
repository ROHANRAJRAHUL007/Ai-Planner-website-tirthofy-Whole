const REMOTE_API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
const LOCAL_API = "http://127.0.0.1:8000";

function isLocalBrowser() {
  if (typeof window === "undefined") {
    return false;
  }

  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function buildApiCandidates() {
  const preferred = isLocalBrowser() ? [LOCAL_API, REMOTE_API] : [REMOTE_API, LOCAL_API];
  return [...new Set(preferred.filter(Boolean))];
}

function formatDetail(detail) {
  if (!detail) {
    return null;
  }

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item?.msg) {
          const field = Array.isArray(item.loc) ? item.loc.slice(1).join(".") : "";
          return field ? `${field}: ${item.msg}` : item.msg;
        }

        return null;
      })
      .filter(Boolean)
      .join("\n");
  }

  if (typeof detail === "object") {
    return detail.message || JSON.stringify(detail);
  }

  return String(detail);
}

async function parseResponse(response) {
  const text = await response.text();
  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    result = text ? { detail: text } : {};
  }

  if (!response.ok) {
    throw new Error(formatDetail(result.detail) || `Request failed (${response.status})`);
  }

  return result;
}

async function requestGuide(path, options = {}) {
  const candidates = buildApiCandidates();
  let lastError;

  for (let index = 0; index < candidates.length; index += 1) {
    const baseUrl = candidates[index];
    const isLast = index === candidates.length - 1;

    try {
      const response = await fetch(`${baseUrl}${path}`, options);

      if ((response.status === 404 || response.status === 405 || response.status >= 500) && !isLast) {
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;

      if (isLast) {
        throw new Error(
          `Unable to reach the guide service. Tried: ${candidates.join(", ")}`
        );
      }
    }
  }

  throw lastError || new Error("Unable to reach the guide service");
}

function normalizeGuidePayload(data) {
  const temple = (data.temple || "").trim();
  const state = (data.state || "").trim();
  const district = (data.district || "").trim();
  const description = (data.description || "").trim();

  const location = [district, state].filter(Boolean).join(", ") || temple || "Not specified";

  return {
    ...data,
    location,
    overview: description || temple || "Guide details coming soon.",
    places: Array.isArray(data.places) ? data.places : [],
  };
}

export async function getGuides() {
  const response = await requestGuide("/guides", {
    method: "GET",
  });

  if (response.status === 404) {
    return [];
  }

  const data = await parseResponse(response);

  if (Array.isArray(data)) {
    return data;
  }

  return data.guides || [];
}

export async function createGuide(data) {
  const response = await requestGuide("/guides", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(normalizeGuidePayload(data)),
  });

  return parseResponse(response);
}

export async function getMyGuides(authorId) {
  if (!authorId) {
    return { success: true, count: 0, guides: [] };
  }

  const response = await requestGuide(
    `/guides/me/${encodeURIComponent(authorId)}`,
    {
      method: "GET",
    }
  );

  if (response.status === 404) {
    return { success: true, count: 0, guides: [] };
  }

  return parseResponse(response);
}
