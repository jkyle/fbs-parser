const itemInInventory = (item, inventory) => inventory.indexOf(item) > -1
const itemAtLocation = (item, location) => location.items.indexOf(item) > -1

export default app => (action, state) => {
  if (action.type === 'LOOK') {
    if(action.target && !(itemInInventory(action.target, state.objects.PLAYER.items) || itemAtLocation(action.target, state.objects[state.location]))) {
      return {...state, buffer: ["You don't see that here.", ...state.buffer] }
    }

    const subject = (!action.subject) ? state.location : action.subject

    return app[subject].LOOK ? app[subject].LOOK(state, subject) : {...state, buffer: [`You see ${subject}, but it's not very interesting.`, ...state.buffer] }
  }
  return state
}