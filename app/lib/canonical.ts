// app/lib/canonical.ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zoytours.com";

export function generateCanonical(path: string) {
  // Remove trailing slash except for homepage
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return `${SITE_URL}${path}`;
}