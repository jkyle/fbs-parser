const has = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

const getPropertyFromObject = (object, propertyArr) =>
  propertyArr.reduce((acc, prop) => acc && has(acc, prop) ? acc[prop] : undefined, object)

const setPropertyForObject = (object, [prop, ...rest], value) => {
  if(rest.length === 0) {
    return { ...object, [prop]: value }
  }

  return {...object, [prop]: setPropertyForObject(object[prop] || {}, rest, value) }
}

const getPropsArray = (id, props, getItems) =>
  props.length > 0 ? ['objects', id, 'properties', ...props] :
  getItems         ? ['objects', id, 'items']                :
                     ['objects', id, 'id']
module.exports = {
  getProperty: ({type, id, props}, getItems) => game => {
    const objectLocation = type === 'GAME_OBJECT' ? getPropsArray(id, props, getItems)            :
                           type === 'INVENTORY'   ? getPropsArray('PLAYER', [], true)             :
                           type === 'LOCATION'    ? getPropsArray(game.location, props, getItems) :
                           []
    return getPropertyFromObject(game, objectLocation)
  },
  setProperty: (objectId, propertyArr, value) => game =>
    setPropertyForObject(game, ['objects', objectId, 'properties', ...propertyArr], value)
}