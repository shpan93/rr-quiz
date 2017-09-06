export function media(from = 0, until = 4096) {
  return (typeof window !== 'undefined') &&
    (window.innerWidth > from && window.innerWidth < until);
}
