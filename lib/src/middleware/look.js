export default (next, select) => (originalEvent, state) => {
  if (originalEvent.type === 'LOOK') {
      const event = !originalEvent.subject ? {...originalEvent, subject: state.location} : originalEvent
      const subject = event.subject

      const here = select('$INVENTORY', state).has(subject) ||
                   select('$LOCATION.items', state).has(subject) ||
                   select('$LOCATION.exits', state).has(subject) ||
                   select('$GLOBAL.location', state).get() === subject

      if(!here) {
        return select('$BUFFER', state).add("You don't see that here.")
      }

      const newState = next(event, state)
      if(newState !== state) {
        return newState
      }
      return select('$BUFFER', state).add(`You see ${subject}, but it's not very interesting.`)
  }
  return next(originalEvent, state);
}