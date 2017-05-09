export default (next, select) => (event, state) => {
  const newState = next(event, state)
    if(newState === state && event.type !== 'START') {
      return select('$BUFFER', state).add("Nothing happens.")
    }
    return newState
  }