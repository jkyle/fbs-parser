import processEvents from './events'

module.exports = definition => {
  return definition.reduce((acc, event) => ({ ...acc, [event.method]: processEvents(event)}), {})
}