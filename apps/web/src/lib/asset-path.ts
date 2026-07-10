export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export function resolveLinkHref(href: string): string {
  return href.startsWith("/") ? assetPath(href) : href;
}
