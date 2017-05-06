export default next => (event, state, done) =>
  next(event, {...state, buffer: [] }, done)