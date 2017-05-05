const itemInInventory = (item, inventory) => inventory.indexOf(item) > -1
const itemAtLocation = (item, location) => location.items.indexOf(item) > -1

export default app => (action, state) => {
  if (action.type === 'LOOK') {
    if(action.target && !(itemInInventory(action.target, state.objects.PLAYER.items) || itemAtLocation(action.target, state.objects[state.location]))) {
      return {...state, buffer: ["You don't see that here.", ...state.buffer] }
    }

    const act = !action.subject ? {...action, subject: state.location} : action
    const newState = app(act, state)

    return newState !== state ? newState : {...state, buffer: [`You see ${act.subject}, but it's not very interesting.`, ...state.buffer] }
  }
  return state
}