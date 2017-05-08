import inventory from '../selectors/inventory'
import location from '../selectors/location'

export default next => (event, state) => {
  if (event.type === 'TAKE') {
    const loc = location(state)
    if(!loc.atLocation(event.subject)) {
      return { ...state, buffer: [`There's no ${event.subject} here.`, ...state.buffer] }
    }

    if(!state.objects[event.subject].properties.takeable) {
      return { ...state, buffer: [`You can't take ${event.subject}.`, ...state.buffer ] }
    }

    const newState = next(event, state)
    if(newState !== state) {
      return newState;
    }
    const inv = inventory(newState)
    return { ...inv.add(event.subject), ...loc.removeItem(event.subject),
             buffer: [`You take ${event.subject}`, ...newState.buffer] }

  }
  return next(event, state);
}