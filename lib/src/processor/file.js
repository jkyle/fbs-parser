import processEvents from './events'

module.exports = definition =>
  definition.reduce((acc, event) => ({ ...acc, [event.method]: processEvents(event)}), {})