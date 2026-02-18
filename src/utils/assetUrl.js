// Prepends the Vite base URL so asset paths work on GitHub Pages subpaths
const base = import.meta.env.BASE_URL // e.g. '/portfolio-ivan-maldonado/'

export function assetUrl(path) {
  // path should NOT start with '/', e.g. 'images/banner.png'
  return `${base}${path}`
}
