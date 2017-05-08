import { setPropertyForObject, getPropertyFromObject } from './util'

export default state => {
  const arr = ['objects', state.location]
  const location = getPropertyFromObject(state, arr)

  const addItem = item => {
    const newItems = location.items.indexOf(item) > -1 ? [...location.items, item] : location.items
    return setPropertyForObject(state, [...arr, 'items'], newItems)
  }

  const removeItem = item => {
    const newItems = location.items.filter(i => i !== item)
    return setPropertyForObject(state, [...arr, 'items'], newItems)
  }

  const atLocation = item =>
    location.exits.indexOf(item) > -1 || location.items.indexOf(item) > -1

  return {
    addItem,
    removeItem,
    atLocation
  }
}