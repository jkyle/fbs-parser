import { getProperty, setProperty, addItem, removeItem, addExit } from './properties'
import parsePassage from './text'
import evaluateCondition from './conditionals'
import processOperand from './expressions'

const processSet = action => {
  const valueFn = processOperand(action.value)
  return (game, select, thisObj, targetObj) => {
    const value = valueFn(game, select, thisObj, targetObj)
    // const setFn = setProperty(action.target, value)
    // return setFn(game, select, thisObj, targetObj)
    const targetArr = action.target.type === '$GAME_OBJECT' ? [action.target.id, ...action.target.props] : action.target.type
    return select(targetArr, game, thisObj, targetObj).set(value)
  }
}

const processSay = action => {
  const sayFn = parsePassage(action.passage)
  return (game, select, thisObj, targetObj) =>
    select('$BUFFER', game).add(sayFn(game, select, thisObj, targetObj))
}

const processCondition = action => {
  const conditionFn = evaluateCondition(action.condition)
  const actions = processActions(action.actions)
  const elseActions = action.elseActions ? processActions(action.elseActions) : null
  return (game, select, thisObj, targetObj) => conditionFn(game, select, thisObj, targetObj) ? actions.reduce((acc, actionFn) => actionFn(acc, select, thisObj, targetObj), game)     :
                                       elseActions                           ? elseActions.reduce((acc, actionFn) => actionFn(acc, select, thisObj, targetObj), game) :
                                                                               game
}

const processAdd = action => {
  const addFn = addItem(action.target, action.value)
  return (game, select, thisObj, targetObj) => addFn(game, select, thisObj, targetObj)
}

const processRemove = action => {
  const addFn = removeItem(action.target, action.value)
  return (game, select, thisObj, targetObj) => addFn(game, select, thisObj, targetObj)
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
  return (game, select, thisObj, targetObj) => actionFn(game, select, thisObj, targetObj)
}

const processActions = actions => {
  return actions.map(processAction)
}

module.exports = event => {
  const actions = processActions(event.actions)
  return (game, select, thisObj, targetObj) => actions.reduce((acc, actionFn) => actionFn(acc, select, thisObj, targetObj), game)
}