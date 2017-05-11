import processor from './file'
import getProp from './props'

export default program => {
  const exe = Object.keys(program).reduce((acc, key) => ({...acc, [key]: processor(program[key].events) }), {})
  const props = Object.keys(program).reduce((acc, key) => ({...acc, [key]: program[key].props }), {})
  return {
    middleware: next => (event, state) => {
      const legitEvent = exe[event.subject] && exe[event.subject][event.type];
      return next(event, legitEvent ? legitEvent(state, event.subject, event.target) : state)
    },
    props: (item, prop, state) => {
      return props[item] && props[item][prop] ? getProp(props[item][prop], state) : undefined
    }
  }
}
