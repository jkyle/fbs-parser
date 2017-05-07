const atLocation = (subject, state) =>
  (state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1)

const inInventory = (subject, state) =>
  state.objects.PLAYER.items.indexOf(subject) > -1

export default next => (event, state) => {
  if (event.type === 'LOOK') {
      if(!(inInventory(event.subject, state) || atLocation(event.subject, state)) ) {
        return {...state, buffer: ["You don't see that here.", ...state.buffer] }
      }

      const act = !event.subject ? {...event, subject: state.location} : event

      const newState = next(event, state)
      if(newState !== state) {
        return newState
      }
      return ({...newState, buffer: [`You see ${act.subject}, but it's not very interesting.`, ...state.buffer] })
  }
  return next(event, state);
}