export const setTransition = (el, effect, state, duration, f) => {
  const enterClass = `${effect}-${state}`
  const enterActiveClass = `${effect}-active-${state}`

  el.classList.add(enterClass)
  el.offsetHeight;
  el.classList.add(enterActiveClass)

  setTimeout(() => {
    el.classList.remove(enterClass, enterActiveClass)
    if(typeof f === 'function') f()
  }, duration);
}