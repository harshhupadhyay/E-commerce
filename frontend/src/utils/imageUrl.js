const BACKEND_BASE = "https://e-commerce-mynu.onrender.com";

/**
 * Resolves relative proxy image URLs (e.g. /api/proxy-image?url=...)
 * to full backend URLs in production, ensuring images always load.
 */
export const resolveImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("/")) {
    return `${BACKEND_BASE}${url}`;
  }
  return url;
};
