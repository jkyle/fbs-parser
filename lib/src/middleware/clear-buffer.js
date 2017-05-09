export default (next, select) => (event, state) =>
  event.type === 'START' ? next(event, state) : next(event, select('$BUFFER', state).set([]))