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
  const items = collection.indexOf(item) < 0 ? collection : collection.filter(item => item !== item)
  return setPropertyForObject(state, ['objects', state.items, 'items'], items)
}

export default app => (action, state) => {
  if (action.type === 'TAKE') {
    if(state.objects[state.location].items.indexOf(action.subject) < 0) {
      return { ...state, buffer: [`There's no ${action.subject} here.`, ...state.buffer] }
    }

    const newState = app(action, state);
    // First try object's take event.
    if (newState !== state) {
      return newState
    }

    if(state.objects[action.subject].properties.takeable) {
      return { ...[addToInventory(action.subject), removeFromLocation(action.subject)].reduce((acc, fn) => fn(acc), state),
               buffer: [`You take ${action.subject}`, ...state.buffer] }
    }

    return { ...state, buffer: [`You can't take ${action.subject}.`, ...state.buffer ] }
  }
  return state;
}