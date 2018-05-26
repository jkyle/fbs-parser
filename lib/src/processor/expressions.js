import { select } from '../selectors'

const selectFn = ({type, id, props}) => (state, thisObj, targetObj) => {
   const objectLocation = type === '$GAME_OBJECT'  ? [id, ...props]        :
                          type === '$THIS'         ? [thisObj, ...props]   :
                          type === '$TARGET'       ? [targetObj, ...props] :
                                                     [type, ...props]
    return select(objectLocation, state)
}

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
    const propfn = selectFn(operand)
    return (game, thisObj, targetObj) => propfn(game, thisObj, targetObj).get()
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