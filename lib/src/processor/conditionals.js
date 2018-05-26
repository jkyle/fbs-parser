import processOperand from './expressions'
import { select } from '../selectors'

const selectFn = ({type, id, props}) => (state, thisObj, targetObj) => {
   const objectLocation = type === '$GAME_OBJECT'  ? [id, ...props]        :
                          type === '$THIS'         ? [thisObj, ...props]   :
                          type === '$TARGET'       ? [targetObj, ...props] :
                                                     [type, ...props]
    return select(objectLocation, state)
}


const selectFnItems = ({type, id, props}) => (state, thisObj, targetObj) => {
   const objectLocation = type === '$GAME_OBJECT'  ? [id, ...props, 'items']        :
                          type === '$THIS'         ? [thisObj, ...props, 'items']   :
                          type === '$TARGET'       ? [targetObj, ...props, 'items'] :
                                                     [type, ...props, 'items']
   console.log(objectLocation)
    return select(objectLocation, state)
}




const comparators = {
  '===': (left, right) => left === right,
  '>': (left, right) => left > right,
  '<': (left, right) => left < right,
  '>=': (left, right) => left >= right,
  '<=': (left, right) => left <= right,
  '!==': (left, right) => left !== right,
  has: (left, right) => left.indexOf(right) > -1,
  lacks: (left, right) => left.indexOf(right) < 0
}

const getValue = (item, getItems) => {
  if(typeof item !== 'object') {
    return game => ({ get: () => item })
  }
  return getItems ? selectFnItems(item) : selectFn(item)
}

const evaluateCondition = condition => {
  const operator = condition.operator
  let left, right;
  if(operator === 'has' || operator === 'lacks') {
    left = getValue(condition.left, true)
  } else {
    left = getValue(condition.left)
  }
  right = processOperand(condition.right)
  return (game, thisObj, targetObj) =>
    comparators[operator](left(game, thisObj, targetObj).get(), right(game, thisObj, targetObj))
}

module.exports = evaluateCondition