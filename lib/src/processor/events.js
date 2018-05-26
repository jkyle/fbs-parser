import { addItem, removeItem } from './properties'
import { select } from '../selectors'

const selectFn = ({type, id, props}) => (state, thisObj, targetObj) => {
   const objectLocation = type === '$GAME_OBJECT'  ? [id, ...props]        :
                          type === '$THIS'         ? [thisObj, ...props]   :
                          type === '$TARGET'       ? [targetObj, ...props] :
                                                     [type, ...props]
    return select(objectLocation, state)
}

import parsePassage from './text'
import evaluateCondition from './conditionals'
import processOperand from './expressions'

const processSet = action => {
  const valueFn = processOperand(action.value)
  const selected = selectFn(action.target)
  return (game, thisObj, targetObj) => {
    const value = valueFn(game, thisObj, targetObj)
    return selected(game, thisObj, targetObj).set(value)
  }
}

const processSay = action => {
  const sayFn = parsePassage(action.passage)
  return (game, thisObj, targetObj) => select('$BUFFER', game).add(sayFn(game, thisObj, targetObj))
}

const processCondition = action => {
  const conditionFn = evaluateCondition(action.condition)
  const actions = processActions(action.actions)
  const elseActions = action.elseActions ? processActions(action.elseActions) : null
  return (game, thisObj, targetObj) => conditionFn(game, thisObj, targetObj) ? actions.reduce((acc, actionFn) => actionFn(acc, thisObj, targetObj), game)     :
                                       elseActions                           ? elseActions.reduce((acc, actionFn) => actionFn(acc, thisObj, targetObj), game) :
                                                                               game
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