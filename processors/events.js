import { getProperty, setProperty, addItem, removeItem } from './properties'
import parsePassage from './text'
import evaluateCondition from './conditionals'

const processSet = action => {
  const setFn = setProperty(action)
  return game => setFn(game)
}

const processSay = action => {
  const sayFn = parsePassage(action.passage)
  return game => ({...game, buffer: [sayFn(game), ...game.buffer]})
}

const processCondition = action => {
  const conditionFn = evaluateCondition(action.condition)
  const actions = processActions(action.actions)
  return game => conditionFn(game) ? actions.reduce((acc, actionFn) => actionFn(acc), game) : game
}

const processAdd = action => {
  const addFn = addItem(action.target.id, action.value.id)
  return game => addFn(game)
}

const processRemove = action => {
  const addFn = removeItem(action.target.id, action.value.id)
  return game => addFn(game)
}

const actions = {
  set: processSet,
  say: processSay,
  condition: processCondition,
  add: processAdd,
  remove: processRemove
}


const processAction = action => {
  const actionFn = actions[action.type](action)
  return game => actionFn(game)
}

const processActions = actions => {
  return actions.map(processAction)
}

module.exports = event => {
  const actions = processActions(event.actions)
  return game => actions.reduce((acc, actionFn) => actionFn(acc), game)
}