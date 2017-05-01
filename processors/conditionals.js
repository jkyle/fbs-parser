import { getProperty } from './properties'

const comparators = {
  '===': (left, right) => left === right,
  '>': (left, right) => left > right
}

const getValue = (item) => {
  if(typeof item !== 'object') {
    return game => item
  }
  return getProperty(item.id, item.props)
}

const evaluateCondition = condition => {
  const left = getValue(condition.left)
  const operator = condition.operator
  const right = getValue(condition.right)
  return game => comparators[operator](left(game), right(game))
}

module.exports = evaluateCondition