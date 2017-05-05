const composeEvents = (app, events, state) =>
  events.reduce((acc, event) => app(event, acc), state)


export default app => (action, state) => {
  if(action.type === 'GO') {
    const { subject } = action;
    if(state.objects[state.location].exits.indexOf(subject) > -1) {
      const enter = { subject: action.subject, type: 'ENTER' }
      const exit = { subject: state.location, type: 'EXIT' }
      return { ...composeEvents( app, [exit, enter], state), location: subject }
      // return { ...composeEvents( app[state.location].EXIT, app[subject].ENTER], subject, state), location: subject }
    }
    return { ...state, buffer: ["You can't go there from here.", ...state.buffer] };
  }
  return state;
}
