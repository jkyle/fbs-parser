export default next => (event, state, done) =>
  next(event, state, (newState) => {
    if(newState === state) {
      return {...state, buffer: ["Nothing happens.", ...state.buffer] }
    }
    return newState
  })