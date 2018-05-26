import { compose } from '../selectors'

export default (next, select) => (event, state) => {
  if (event.type === 'TAKE') {
    const subject = event.subject
    const atLocation = select('$LOCATION.items', state).has(subject) ||
                       select('$LOCATION.exits', state).has(subject)

    if(!atLocation) {
      return select('$BUFFER', state).add(`There's no ${subject} here.`)
    }

    const takeable = select([subject, 'takeable'], state).get()
    console.log('takeable', takeable)
    if(!takeable) {
      return select('$BUFFER', state).add(`You can't take ${subject}.`)
    }

    const newState = next(event, state)
    if(newState !== state) {
      return newState;
    }

    const buffer = newState => select('$BUFFER', newState).add(`You take ${subject}`)
    const inventory = newState => select('$INVENTORY', newState).add(subject)
    const location = newState => select('$LOCATION.items', newState).remove(subject)
    return compose(buffer, inventory, location)(state)
  }
  return next(event, state);
}