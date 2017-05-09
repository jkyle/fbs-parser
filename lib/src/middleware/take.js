import location from '../selectors/location'
import { compose } from '../selectors/util'

export default (next, select) => (event, state) => {
  if (event.type === 'TAKE') {
    const atLocation = select.get(['$LOCATION', 'items'])(state).indexOf(event.subject) > -1 ||
                       select.get(['$LOCATION', 'exits'])(state).indexOf(event.subject) > -1

    if(!atLocation) {
      return select.add(['$BUFFER'], `There's no ${event.subject} here.`)(state)
    }

    if(!select.get([event.subject, 'properties', 'takeable'])(state) ) {
      return select.add(['$BUFFER'], `You can't take ${event.subject}.`)(state)
    }

    const newState = next(event, state)
    if(newState !== state) {
      return newState;
    }

    const actions = compose(
                     select.remove(['$LOCATION', 'items'], event.subject),
                     select.add(['$INVENTORY'], event.subject),
                     select.add(['$BUFFER'], `You take ${event.subject}`)
                   )

    return actions(state)
  }
  return next(event, state);
}