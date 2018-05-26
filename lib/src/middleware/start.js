export default (next, select) => (action, state) => {
  if(action.type === 'START') {
    const gameObjects = select('$OBJECTS', state).get()

    return Object.keys(gameObjects).reduce((acc, key) => {
        const localAction = { ...action,  subject: key }
        return next(localAction, acc)
      }, state);
  }
  return next(action, state);
}