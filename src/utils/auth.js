import Cookies from 'js-cookie'

export function getItem(val) {
  const data = Cookies.get(val)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export function setItem(val, key) {
  return Cookies.set(val, key)
}

export function removeItem(val) {
  return Cookies.remove(val)
}
