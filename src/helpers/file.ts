export function slugify(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/--+/g, '-')
}
