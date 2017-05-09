export default (next, select) => (event, state) => {
  const newState = next(event, state)
    if(newState === state) {
      return select.add(['$BUFFER'], "Nothing happens.")(state)
    }
    return newState
  }