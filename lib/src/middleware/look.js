export default (next, select) => (originalEvent, state) => {
  if (originalEvent.type === 'LOOK') {
      const event = !originalEvent.subject ? {...originalEvent, subject: state.location} : originalEvent

      const here = select.get('$INVENTORY')(state).indexOf(event.subject) > -1 ||
                   select.get('$LOCATION.items')(state).indexOf(event.subject) > -1 ||
                   select.get('$LOCATION.exits')(state).indexOf(event.subject) > -1 ||
                   select.get('$GLOBAL.location')(state) === event.subject

      if(!here) {
        return select.add('$BUFFER', "You don't see that here.")(state)
      }

      const newState = next(event, state)
      if(newState !== state) {
        return newState
      }
      return select.add('$BUFFER', `You see ${event.subject}, but it's not very interesting.`)(state)
  }
  return next(originalEvent, state);
}