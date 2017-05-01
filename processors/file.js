import processEvents from './events'

module.exports = definition => {
  const init = {
    id: definition.id,
    type: definition.type
  }

  return definition.events.reduce((acc, event) => ({ ...acc, [event.method]: processEvents(event)}), init)
}