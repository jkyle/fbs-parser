export default next => (action, state) => {
  if(action.type === 'START') {
    return Object.keys(state.objects).reduce((acc, key) => {
        const localAction = { ...action,  subject: key }
        return next(localAction, acc)
      }, state);
  }
  return next(action, state);
}