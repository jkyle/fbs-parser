import { getPropertyFromObject, setPropertyForObject } from './util'

export default (initialSelectors = {}) => {
    let selectors = initialSelectors;

    const buildArray = (key, state, event) => {
      if(Array.isArray(selectors[key])) {
        return selectors[key].reduce((acc, i) => {
          if(Array.isArray(i) ) {
            return [...acc, get(i,event)(state)]
          } else {
            return [...acc, ...buildArray(i, state, event)]
          }
        }, [])
      } else if (key.toUpperCase() === key){
        return [...buildArray('$OBJECTS', state, event), key]
      } else {
        return [key]
      }
    }

    const get = (inKeyArr, event) => state => {
      const keyArr = typeof inKeyArr === 'string' ? inKeyArr.split('.') : inKeyArr
      const arr = keyArr.reduce((acc, i) =>
        [...acc, ...buildArray(i, state, event)],
      [])
      return getPropertyFromObject(state, arr)
    }

    const set = (inKeyArr, value, event) => state => {
      const keyArr = typeof inKeyArr === 'string' ? inKeyArr.split('.') : inKeyArr
      const arr = keyArr.reduce((acc, i) => [...acc, ...buildArray(i, state, event)], [])
      return setPropertyForObject(state, arr, value)
    }

    const add = (keyArr, value, event) => state => {
      const collection = get(keyArr, event)(state)
      const newCollection = collection.indexOf(value) > -1 ? collection : [value, ...collection]
      return set(keyArr, newCollection, event)(state)
    }

    const remove = (keyArr, value, event) => state => {
      const collection = get(keyArr, event)(state)
      const newCollection = collection.filter(i => i !== value)
      return set(keyArr, newCollection, event)(state)
    }

    return keyArr => ({
      get: () => get(keyArr),
      set: value => set(keyArr, value),
      add: value => add(keyArr, value),
      remove: value => remove(keyArr, value)
    })

}
