/**
 * Extracts a 11-character YouTube video ID from various URL formats or raw ID strings:
 * - https://youtu.be/vy-firwwrPw?si=wGs9CN94I3Wnhyww -> vy-firwwrPw
 * - https://www.youtube.com/watch?v=vy-firwwrPw -> vy-firwwrPw
 * - https://www.youtube.com/embed/vy-firwwrPw -> vy-firwwrPw
 * - vy-firwwrPw -> vy-firwwrPw
 */
export function extractYouTubeId(urlOrId: string | null | undefined): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();

  // If it's already an 11-char ID without slashes or query parameters
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle standard YouTube links, shorts, embeds, and youtu.be short links
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return trimmed;
}
