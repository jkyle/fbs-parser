import location from '../selectors/location'
import { compose } from '../selectors/util'

export default (next, select) => (event, state) => {
  if (event.type === 'TAKE') {
    const atLocation = select('$LOCATION.items', state).get().indexOf(event.subject) > -1 ||
                       select('$LOCATION.exits', state).get().indexOf(event.subject) > -1

    if(!atLocation) {
      return select('$BUFFER', state).add(`There's no ${event.subject} here.`)
    }

    if(!select([event.subject, 'properties', 'takeable'], state).get() ) {
      return select('$BUFFER', state).add(`You can't take ${event.subject}.`)
    }

    const newState = next(event, state)
    if(newState !== state) {
      return newState;
    }

    // I know, I know.
    return select('$LOCATION.items',
              select('$INVENTORY',
                select('$BUFFER',
                  state
                ).add(`You take ${event.subject}`)
              ).add(event.subject)
            ).remove(event.subject)
  }
  return next(event, state);
}