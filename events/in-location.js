const atLocation = (subject, state) =>
  (state.objects[state.location].exits.indexOf(subject) > -1 || state.objects[state.location].items.indexOf(subject) > -1)

const inInventory = (subject, state) =>
  state.objects.PLAYER.items.indexOf(subject) > -1

const composeEvents = (app, events, state) =>
  events.reduce((acc, event) => app(event, acc), state)

export default app => (next, done) => (action, state) => {
  switch (action.type) {
    case 'GO':
      const { subject } = action;
      if(atLocation(subject, state)) {
        const enter = { subject: action.subject, type: 'ENTER' }
        const exit = { subject: state.location, type: 'EXIT' }
        return { ...composeEvents( app, [exit, enter], state), location: subject }
        // return { ...composeEvents( app[state.location].EXIT, app[subject].ENTER], subject, state), location: subject }
      }
      return { ...state, buffer: ["You can't go there from here.", ...state.buffer] }
    case 'LOOK':
      if(!(inInventory(action.subject, state) || atLocation(action.subject, state)) ) {
        return {...state, buffer: ["You don't see that here.", ...state.buffer] }
      }

      const act = !action.subject ? {...action, subject: state.location} : action
      const newState = app(act, state)

      return newState !== state ? newState : {...state, buffer: [`You see ${act.subject}, but it's not very interesting.`, ...state.buffer] }
    case 'TAKE':
      if(!atLocation(action.subject, state)) {
        return { ...state, buffer: [`There's no ${action.subject} here.`, ...state.buffer] }
      }
    default:
      // console.log('allls good', next);
      return next(action, state);
  }
}