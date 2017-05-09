
export default (next, select) => (event, state) => {
  if(event.type === 'GO') {
    const atLocation = select.get('$LOCATION.items')(state).indexOf(event.subject) > -1 ||
                       select.get('$LOCATION.exits')(state).indexOf(event.subject) > -1

    if(!atLocation) {
      return select.add(['$BUFFER'], "You can't go there from here.")(state)
    }

    const enterEvent = { subject: event.subject, type: 'ENTER' }
    const exitEvent = { subject: state.location, type: 'EXIT' }
    return next(enterEvent,
            next(event,
              next(exitEvent,
                select.set('$GLOBAL.location', event.subject)(state)
              )
            )
          )
  }
  return next(event, state);
}