export const ajax = (url, {method = 'GET', type = 'json'} = {}, f) => {
  const xhr = new XMLHttpRequest()
  xhr.responseType = type
  xhr.open(method, url)
  xhr.onreadystatechange = () => xhr.readyState === 4 && f(xhr.response)
  xhr.onerror = () => f(xhr.response)
  xhr.send()
}