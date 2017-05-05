import { getProperty, setProperty, addItem, removeItem, addExit } from './properties'
import parsePassage from './text'
import evaluateCondition from './conditionals'

const processSet = action => {
  const setFn = setProperty(action.target, action.value)
  return (game, thisObj, targetObj) => setFn(game, thisObj, targetObj)
}

const processSay = action => {
  const sayFn = parsePassage(action.passage)
  return (game, thisObj, targetObj) => ({...game, buffer: [sayFn(game, thisObj, targetObj), ...game.buffer]})
}

const processCondition = action => {
  const conditionFn = evaluateCondition(action.condition)
  const actions = processActions(action.actions)
  return (game, thisObj, targetObj) => conditionFn(game, thisObj, targetObj) ? actions.reduce((acc, actionFn) => actionFn(acc, thisObj, targetObj), game) : game
}

const processAdd = action => {
  const addFn = addItem(action.target, action.value)
  return (game, thisObj, targetObj) => addFn(game, thisObj, targetObj)
}

const processRemove = action => {
  const addFn = removeItem(action.target, action.value)
  return (game, thisObj, targetObj) => addFn(game, thisObj, targetObj)
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
  return (game, thisObj, targetObj) => actionFn(game, thisObj, targetObj)
}

const processActions = actions => {
  return actions.map(processAction)
}

module.exports = event => {
  const actions = processActions(event.actions)
  return (game, thisObj, targetObj) => actions.reduce((acc, actionFn) => actionFn(acc, thisObj, targetObj), game)
}