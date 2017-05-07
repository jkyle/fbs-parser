import processor from './file';

export default program => {
  const exe = Object.keys(program).reduce((acc, key) => ({...acc, [key]: processor(program[key]) }), {})
  return next => (event, state) => {
    const legitEvent = exe[event.subject] && exe[event.subject][event.type];
    return next(event, legitEvent ? legitEvent(state, event.subject, event.target) : state)
  }
}
