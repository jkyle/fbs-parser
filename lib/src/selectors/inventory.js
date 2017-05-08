import { setPropertyForObject, getPropertyFromObject } from './util'

const arr = ['objects', 'PLAYER', 'items']


export default state => {
  const inv = getPropertyFromObject(state, arr)

  const add = item => {
    const newInv = (inv.indexOf(item) > -1) ? inv : [...inv, item]
    return setPropertyForObject(state, arr, newInv)
  }

  const remove = item => {
    const newInv = inv.filter(i => i !== item)
    return setPropertyForObject(state, arr, newInv)
  }

  const find = item => inv.find(i => i === item)

  const list = () => inv

  return {
    add, remove, find, list
  }
}