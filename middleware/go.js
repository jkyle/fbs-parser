// convert "GO" to "ENTER" and "EXIT"
const atLocation = (subject, state) =>
  (state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1)


export default next => (event, state, cb) => {
  if(event.type === 'GO') {
    if(!atLocation(event.subject, state)) {
      return { ...state, buffer: ["You can't go there from here.", ...state.buffer] }
    }

    const enterEvent = { subject: event.subject, type: 'ENTER' }
    const exitEvent = { subject: state.location, type: 'EXIT' }
    return next(exitEvent, state, newState =>
      next(event, newState, newerState =>
        next(enterEvent, newerState, finalState => ({ ...finalState, location: event.subject}))
      )
    )
  }
  return next(event, state, cb);
}