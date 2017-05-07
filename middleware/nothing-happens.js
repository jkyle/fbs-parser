export default next => (event, state) => {
  const newState = next(event, state)
    if(newState === state) {
      return {...state, buffer: ["Nothing happens.", ...state.buffer] }
    }
    return newState
  }