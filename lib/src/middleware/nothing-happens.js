export default (next, select) => (event, state) => {
  const newState = next(event, state)
    if(newState === state && event.type !== 'START') {
      return select('$BUFFER').add("Nothing happens.")(state)
    }
    return newState
  }