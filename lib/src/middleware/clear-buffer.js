export default next => (event, state) =>
  event.type === 'START' ? next(event, state) : next(event, {...state, buffer: [] })