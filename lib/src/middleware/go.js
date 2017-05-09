
export default (next, select) => (event, state) => {
  if(event.type === 'GO') {
    const atLocation = select('$LOCATION.items', state).get().indexOf(event.subject) > -1 ||
                       select('$LOCATION.exits', state).get().indexOf(event.subject) > -1

    if(!atLocation) {
      return select('$BUFFER', state).add("You can't go there from here.")
    }

    const enterEvent = { subject: event.subject, type: 'ENTER' }
    const exitEvent = { subject: state.location, type: 'EXIT' }
    return next(enterEvent,
            next(event,
              next(exitEvent,
                select('$GLOBAL.location', state).set(event.subject)
              )
            )
          )
  }
  return next(event, state);
}