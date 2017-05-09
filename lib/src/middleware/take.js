import location from '../selectors/location'
import { compose } from '../selectors/util'

export default (next, select) => (event, state) => {
  if (event.type === 'TAKE') {
    const atLocation = select('$LOCATION.items').get()(state).indexOf(event.subject) > -1 ||
                       select('$LOCATION.exits').get()(state).indexOf(event.subject) > -1

    if(!atLocation) {
      return select('$BUFFER').add(`There's no ${event.subject} here.`)(state)
    }

    if(!select([event.subject, 'properties', 'takeable']).get()(state) ) {
      return select('$BUFFER').add(`You can't take ${event.subject}.`)(state)
    }

    const newState = next(event, state)
    if(newState !== state) {
      return newState;
    }

    const actions = compose(
                     select('$LOCATION.items').remove(event.subject),
                     select('$INVENTORY').add(event.subject),
                     select('$BUFFER').add(`You take ${event.subject}`)
                   )

    return actions(state)
  }
  return next(event, state);
}