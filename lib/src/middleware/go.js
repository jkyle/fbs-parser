
export default (next, select) => (event, state) => {
  if(event.type === 'GO') {
    const atLocation = select('$LOCATION.items').get()(state).indexOf(event.subject) > -1 ||
                       select('$LOCATION.exits').get()(state).indexOf(event.subject) > -1

    if(!atLocation) {
      return select('$BUFFER').add("You can't go there from here.")(state)
    }

    const enterEvent = { subject: event.subject, type: 'ENTER' }
    const exitEvent = { subject: state.location, type: 'EXIT' }
    return next(enterEvent,
            next(event,
              next(exitEvent,
                select('$GLOBAL.location').set(event.subject)(state)
              )
            )
          )
  }
  return next(event, state);
}