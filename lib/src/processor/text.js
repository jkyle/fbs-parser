import { getProperty } from './properties'
import evaluateCondition from './conditionals'
import evaluateOperand from './expressions'

const conditionToken = token => {
  const { condition, passage, elsePassage } = token
  const passageFn = parsePassage(passage)
  const conditionFn = evaluateCondition(condition)
  const elsePassageFn = elsePassage ? parsePassage(elsePassage) : null
  return (game, select, thisObj, targetObj) => {
    if (conditionFn(game, select, thisObj, targetObj)) {
      return passageFn(game, select, thisObj, targetObj)
    } else if (elsePassageFn) {
      return elsePassageFn(game, select, thisObj, targetObj)
    } else {
      return ''
    }
  }
};

const parseToken = token => {
  if(typeof token === 'string') {
    return (game, select, thisObj, targetObj) => token
  } else if (token.type === 'RAW_TARGET') {
    return (game, select, thisObj, targetObj) => targetObj
  } else if (token.type === 'condition') {
    const stringFn = conditionToken(token);
    return (game, select, thisObj, targetObj) => stringFn(game, select, thisObj, targetObj)
  } else {
    // Assume it's a game object?
    const stringFn = evaluateOperand(token);
    return (game, select, thisObj, targetObj) => stringFn(game, select, thisObj, targetObj)
  }
};

const parseLine = line => {
  const tokens = line.tokens.map(parseToken)
  return (game, select, thisObj, targetObj) => {
    return tokens.map(t => t(game, select, thisObj, targetObj)).join('')
  }
};

const parseParagraph = paragraph => {
  const lines = paragraph.lines.map(parseLine)

  return (game, select, thisObj, targetObj) => {
    return lines.map(l => l(game, select, thisObj, targetObj)).join(' ')
  }
}

// export default const parsePassage = passage => {
//   const paragraphs = passage.paragraphs.map(parseParagraph)
//   return game => {
//     return paragraphs.map(p => p(game)).join('\n')
//   }
// }

const parsePassage = passage => {
  const paragraphs = passage.paragraphs.map(parseParagraph)
  return (game, select, thisObj, targetObj) => {
    return paragraphs.map(p => p(game, select, thisObj, targetObj)).join('\n')
  }
}

module.exports = parsePassage