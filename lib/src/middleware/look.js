export default (next, select) => (originalEvent, state) => {
  if (originalEvent.type === 'LOOK') {
      const event = !originalEvent.subject ? {...originalEvent, subject: state.location} : originalEvent

      const here = select('$INVENTORY').get()(state).indexOf(event.subject) > -1 ||
                   select('$LOCATION.items').get()(state).indexOf(event.subject) > -1 ||
                   select('$LOCATION.exits').get()(state).indexOf(event.subject) > -1 ||
                   select('$GLOBAL.location').get()(state) === event.subject

      if(!here) {
        return select('$BUFFER').add("You don't see that here.")(state)
      }

      const newState = next(event, state)
      if(newState !== state) {
        return newState
      }
      return select('$BUFFER').add(`You see ${event.subject}, but it's not very interesting.`)(state)
  }
  return next(originalEvent, state);
}