const has = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

const getPropertyFromObject = (object, propertyArr) =>
  propertyArr.reduce((acc, prop) => acc && has(acc, prop) ? acc[prop] : undefined, object)

const setPropertyForObject = (object, [prop, ...rest], value) => {
  if(rest.length === 0) {
    return { ...object, [prop]: value }
  }

  return {...object, [prop]: setPropertyForObject(object[prop] || {}, rest, value) }
}


module.exports = {
  getProperty: (objectId, propertyArr) => game =>
    getPropertyFromObject(game, ['objects', objectId, 'properties', ...propertyArr]),
  setProperty: (objectId, propertyArr, value) => game =>
    setPropertyForObject(game, ['objects', objectId, 'properties', ...propertyArr], value)
}