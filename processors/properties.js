const has = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

const addItemToObject = (game, objectId, itemId) => {
  const collection = game.objects[objectId].items || []
  const items = collection.indexOf(itemId) < 0 ? [...collection, itemId] : collection
  return setPropertyForObject(game, ['objects', objectId, 'items'], items)
}

const removeItemFromObject = (game, objectId, itemId) => {
  const collection = game.objects[objectId].items || []
  const items = collection.indexOf(itemId) < 0 ? collection : collection.filter(item => item !== itemId)
  return setPropertyForObject(game, ['objects', objectId, 'items'], items)
}


const getPropertyFromObject = (object, propertyArr) =>
  propertyArr.reduce((acc, prop) => acc && has(acc, prop) ? acc[prop] : undefined, object)

const setPropertyForObject = (object, [prop, ...rest], value) => {
  // console.log(object, prop, rest);
  if(rest.length === 0) {
    return { ...object, [prop]: value }
  }
  const next = {...object, [prop]: setPropertyForObject(object[prop] || {}, rest, value) };
  return next
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
  setProperty: ({type, id, props, value}, setItems) => game => {
    const objectLocation = type === 'GAME_OBJECT' ? getPropsArray(id, props, setItems)            :
                           type === 'INVENTORY'   ? getPropsArray('PLAYER', [], true)             :
                           type === 'LOCATION'    ? getPropsArray(game.location, props, setItems) :
                           []
    return setPropertyForObject(game, objectLocation, value)
  },
  addItem: (objectId, itemId) => game =>
    addItemToObject(game, objectId, itemId),
  removeItem: (objectId, itemId) => game =>
    removeItemFromObject(game, objectId, itemId)
}