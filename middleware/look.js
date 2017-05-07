const atLocation = (subject, state) =>
  (state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1)

const inInventory = (subject, state) =>
  state.objects.PLAYER.items.indexOf(subject) > -1

export default next => (originalEvent, state) => {
  if (originalEvent.type === 'LOOK') {
      const event = !originalEvent.subject ? {...originalEvent, subject: state.location} : originalEvent
      if(!(inInventory(event.subject, state) || atLocation(event.subject, state) || event.subject === state.location) ) {
        return {...state, buffer: ["You don't see that here.", ...state.buffer] }
      }


      const newState = next(event, state)
      if(newState !== state) {
        return newState
      }
      return ({...newState, buffer: [`You see ${event.subject}, but it's not very interesting.`, ...state.buffer] })
  }
  return next(originalEvent, state);
}