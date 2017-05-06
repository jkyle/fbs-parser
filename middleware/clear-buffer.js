export default next => (event, state, done) =>
  event.type === 'START' ? next(event, state, done) : next(event, {...state, buffer: [] }, done)