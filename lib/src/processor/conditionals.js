import { getProperty } from './properties'
import processOperand from './expressions'

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
    return game => item
  }
  return getProperty(item, getItems)
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
    comparators[operator](left(game, thisObj, targetObj), right(game, thisObj, targetObj))
}

module.exports = evaluateCondition