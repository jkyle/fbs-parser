import { getProperty } from './properties'

const operators = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '/': (left, right) => left / right,
  '*': (left, right) => left * right,
  '%': (left, right) => left % right
}

const processOperand = operand => {
  if (operand.operator) {
    const expressionFn = processExpression(operand)
    return (game, thisObj, targetObj) => expressionFn(game, thisObj, targetObj)
  } else if (operand.type && operand.type === 'RAW_TARGET'){
    return (game, thisObj, targetObj) => targetObj
  } else if (operand.type && operand.type){
    const propfn = getProperty(operand)
    return (game, thisObj, targetObj) => propfn(game, thisObj, targetObj)
  } else {
    return () => operand
  }
}

const processExpression = expression => {
  const { left, operator, right } = expression
  const leftFn = processOperand(left)
  const rightFn = processOperand(right)
  return (game, thisObj, targetObj) => {
    const l = leftFn(game, thisObj, targetObj)
    const r = rightFn(game, thisObj, targetObj)
    return operators[operator](l, r)
  }
}

export default processOperand