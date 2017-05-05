export default (inTarget, action, state, app) {
  if(action === 'LOOK' && inTarget && !(itemInInventory(inTarget, state.objects.PLAYER.items) || itemAtLocation(inTarget, state.objects[state.location]))) {
    return {...state, buffer: ["You don't see that here.", ...state.buffer] }
  }

  const target = (action === 'LOOK' && !inTarget) ? state.location : inTarget

  return app[target].LOOK ? app[target].LOOK(state, target) : {...state, buffer: [`You see ${target}, but it's not very interesting.`, ...state.buffer] }
}