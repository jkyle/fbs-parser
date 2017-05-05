const composeEvents = (events, subject, state) =>
  events.reduce((acc, event) => event ? event(acc, subject) : acc, state)


export default app => (action, state) => {
  if(action.type === 'GO') {
    const { subject } = action;
    if(state.objects[state.location].exits.indexOf(subject) > -1) {
      return { ...composeEvents( [app[state.location].EXIT, app[subject].ENTER], subject, state), location: subject }
    }
    return { ...state, buffer: ["You can't go there from here.", ...state.buffer] };
  }
  return state;
}
