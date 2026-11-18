/** API routes are mounted under the same base path as the application. */
export function apiFetch(path: `/api/${string}`, init?: RequestInit) {
  return fetch(`/physics-em${path}`, init);
}
