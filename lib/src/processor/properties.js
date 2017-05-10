const has = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

const addItemToObject = (game, objectId, itemId) => {
  const subject = game.objects[objectId];
  const target = game.objects[itemId];
  if(subject.type === 'LOCATION' && target.type === 'LOCATION') {
    return addExitToObject(game, objectId, itemId);
  }
  const collection = game.objects[objectId].items || []
  const items = collection.indexOf(itemId) < 0 ? [...collection, itemId] : collection
  return setPropertyForObject(game, ['objects', objectId, 'items'], items)
}

const addExitToObject = (game, subjectId, destinationId) => {
  const collection = game.objects[subjectId].exits || []
  const exits = collection.indexOf(destinationId) < 0 ? [...collection, destinationId] : collection
  return setPropertyForObject(game, ['objects', subjectId, 'exits'], exits)
}

const removeItemFromObject = (game, objectId, itemId) => {
  const collection = game.objects[objectId].items || []
  const items = collection.indexOf(itemId) < 0 ? collection : collection.filter(item => item !== itemId)
  return setPropertyForObject(game, ['objects', objectId, 'items'], items)
}


const getPropertyFromObject = (object, propertyArr) =>
  propertyArr.reduce((acc, prop) => acc && has(acc, prop) ? acc[prop] : undefined, object)

const setPropertyForObject = (object, [prop, ...rest], value) => {
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
  getProperty: ({type, id, props}, getItems) => (game, thisObj, targetObj) => {
    const objectLocation = type === '$GAME_OBJECT'  ? getPropsArray(id, props, getItems)            :
                           type === '$INVENTORY'   ? getPropsArray('PLAYER', [], true)             :
                           type === '$LOCATION'    ? getPropsArray(game.location, props, getItems) :
                           type === '$THIS'        ? getPropsArray(thisObj, props, getItems)       :
                           type === '$TARGET'      ? getPropsArray(targetObj, props, getItems)       :
                                                    []
    return getPropertyFromObject(game, objectLocation)
  },
  setProperty: ({type, id, props}, value, setItems) => (game, thisObj, targetObj) => {
    // console.log(thisObj);
    const objectLocation = type === '$GAME_OBJECT' ? getPropsArray(id, props, setItems)            :
                           type === '$INVENTORY'   ? getPropsArray('PLAYER', [], true)             :
                           type === '$LOCATION'    ? getPropsArray(game.location, props, setItems) :
                           type === '$THIS'        ? getPropsArray(thisObj, props, setItems)       :
                           type === '$TARGET'      ? getPropsArray(targetObj, props, setItems)       :
                                                    []
    return setPropertyForObject(game, objectLocation, value)
  },
  addItem: (object, item) => (game, thisObj, targetObj) => {
    // CUSTOM HANDLING FOR TYPES
    const id = object.type === '$INVENTORY' ? 'PLAYER' :
               object.type === '$LOCATION'  ? game.locaction :
               object.type === '$THIS'      ? thisObj :
               object.type === '$TARGET'    ? targetObj :
                               object.id
     const itemId = item.type === '$INVENTORY' ? 'PLAYER' :
                    item.type === '$LOCATION'  ? game.locaction :
                    item.type === '$THIS'      ? thisObj :
                    item.type === '$TARGET'      ? targetObj :
                                                item.id
    return addItemToObject(game, id, itemId)
  },
  addExit: (location, destination) => (game, thisObj, targetObj) => {
    return addExitToObject(game, location.id, destination.id);
  },
  removeItem: (object, item) => (game, thisObj, targetObj) => {
    const id = object.type === '$INVENTORY' ? 'PLAYER'       :
               object.type === '$LOCATION'  ? game.location :
               object.type === '$THIS'      ? thisObj        :
               object.type === '$TARGET'    ? targetObj :
                                             object.id

   const itemId = item.type === '$INVENTORY' ? 'PLAYER' :
                  item.type === '$LOCATION'  ? game.location :
                  item.type === '$THIS'      ? thisObj :
                  item.type === '$TARGET'      ? targetObj :
                                              item.id
    return removeItemFromObject(game, id, itemId)
  }
}