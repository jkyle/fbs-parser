export default next => (action, state, done) => {
  if(action.type === 'START') {
    return Object.keys(state.objects).reduce((acc, key) => {
        const localAction = { ...action,  subject: key }
        return next(localAction, acc, done)
      }, state);
  }
  return next(action, state, done);
}