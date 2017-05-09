const has = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

export const setPropertyForObject = (object, [prop, ...rest], value) =>
  rest.length === 0 ?
    { ...object, [prop]: value } :
    {...object, [prop]: setPropertyForObject(object[prop] || {}, rest, value) }

export const getPropertyFromObject = (object, propertyArr) =>
  propertyArr.reduce((acc, prop) => acc && has(acc, prop) ?
    acc[prop] : undefined, object)

export const compose = (...fns) => state =>
  fns.reduce((acc, fn) => fn(acc), state)