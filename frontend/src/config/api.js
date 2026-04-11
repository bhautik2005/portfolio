const DEFAULT_API_BASE = 'https://portfolio-vbkz.onrender.com';

/** Base URL for the Express API (no trailing slash). Override with VITE_API_URL at build time. */
export function getApiBaseUrl() {
  const raw = import.meta.env.VITE_API_URL;
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim().replace(/\/$/, '');
  }
  return DEFAULT_API_BASE;
}
