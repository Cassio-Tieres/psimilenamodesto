export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatBlogDate(value?: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function createExcerpt(content?: string | null, length = 180) {
  if (!content) return "";

  const cleaned = content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= length) return cleaned;

  return `${cleaned.slice(0, length).trimEnd()}...`;
}

export function estimateReadingTime(content?: string | null) {
  if (!content) return "1 min";

  const words = content
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min`;
}

export function storageUrlToPath(url?: string | null) {
  if (!url) return "";

  const marker = "/storage/v1/object/public/blog-images/";
  const index = url.indexOf(marker);

  if (index === -1) return "";

  return url.slice(index + marker.length);
}
