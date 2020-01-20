export const checkImage = (src, f) => {
  const img = new Image
  img.src = src
  img.onload = ev => f(ev)
  img.onerror = ev => f(ev)
}
