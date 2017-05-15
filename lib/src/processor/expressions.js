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
    return (game, select, thisObj, targetObj) => expressionFn(game, select, thisObj, targetObj)
  } else if (operand.type && operand.type === 'RAW_TARGET'){
    return (game, select, thisObj, targetObj) => targetObj
  } else if (operand.type && operand.type){
    const propfn = getProperty(operand)
    return (game, select, thisObj, targetObj) => propfn(game, select, thisObj, targetObj)
  } else {
    return () => operand
  }
}

const processExpression = expression => {
  const { left, operator, right } = expression
  const leftFn = processOperand(left)
  const rightFn = processOperand(right)
  return (game, select, thisObj, targetObj) => {
    const l = leftFn(game, select, thisObj, targetObj)
    const r = rightFn(game, select, thisObj, targetObj)
    return operators[operator](l, r)
  }
}

export default processOperand