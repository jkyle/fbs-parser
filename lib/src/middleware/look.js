export default (next, select) => (originalEvent, state) => {
  if (originalEvent.type === 'LOOK') {
      const event = !originalEvent.subject ? {...originalEvent, subject: state.location} : originalEvent

      const here = select('$INVENTORY', state).get().indexOf(event.subject) > -1 ||
                   select('$LOCATION.items', state).get().indexOf(event.subject) > -1 ||
                   select('$LOCATION.exits', state).get().indexOf(event.subject) > -1 ||
                   select('$GLOBAL.location', state).get() === event.subject

      if(!here) {
        return select('$BUFFER', state).add("You don't see that here.")
      }

      const newState = next(event, state)
      if(newState !== state) {
        return newState
      }
      return select('$BUFFER', state).add(`You see ${event.subject}, but it's not very interesting.`)
  }
  return next(originalEvent, state);
}