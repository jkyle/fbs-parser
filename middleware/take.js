const setPropertyForObject = (object, [prop, ...rest], value) => {
  if(rest.length === 0) {
    return { ...object, [prop]: value }
  }
  const next = {...object, [prop]: setPropertyForObject(object[prop] || {}, rest, value) };
  return next
}

const addToInventory = item => state => {
  const items = state.objects.PLAYER.items.indexOf(item) < 0 ? [...state.objects.PLAYER.items, item] : state.objects.PLAYER.items
  return setPropertyForObject(state, ['objects', 'PLAYER', 'items'], items)
}

const removeFromLocation = item => state => {
  const collection = state.objects[state.location].items
  const items = collection.indexOf(item) < 0 ? collection : collection.filter(itemName => itemName !== item)
  return setPropertyForObject(state, ['objects', state.location, 'items'], items)
}

const atLocation = (subject, state) =>
  (state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1)

export default next => (event, state, done) => {
  if (event.type === 'TAKE') {
    if(!atLocation(event.subject, state)) {
      return { ...state, buffer: [`There's no ${event.subject} here.`, ...state.buffer] }
    }

    if(!state.objects[event.subject].properties.takeable) {
      return { ...state, buffer: [`You can't take ${event.subject}.`, ...state.buffer ] }
    }

    return next(event, state, newState => {
        if(newState !== state) {
          return newState;
        }
        return { ...[addToInventory(event.subject), removeFromLocation(event.subject)].reduce((acc, fn) => fn(acc), newState),
                 buffer: [`You take ${event.subject}`, ...newState.buffer] }
    })
  }
  return next(event, state, done);
}