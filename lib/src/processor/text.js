import { getProperty } from './properties'
import evaluateCondition from './conditionals'
import evaluateOperand from './expressions'

const conditionToken = token => {
  const { condition, passage, elsePassage } = token
  const passageFn = parsePassage(passage)
  const conditionFn = evaluateCondition(condition)
  const elsePassageFn = elsePassage ? parsePassage(elsePassage) : null
  return (game, thisObj, targetObj) => {
    if (conditionFn(game, thisObj, targetObj)) {
      return passageFn(game, thisObj, targetObj)
    } else if (elsePassageFn) {
      return elsePassageFn(game, thisObj, targetObj)
    } else {
      return ''
    }
  }
};

const parseToken = token => {
  if(typeof token === 'string') {
    return (game, thisObj, targetObj) => token
  } else if (token.type === 'RAW_TARGET') {
    return (game, thisObj, targetObj) => targetObj
  } else if (token.type === 'condition') {
    const stringFn = conditionToken(token);
    return (game, thisObj, targetObj) => stringFn(game, thisObj, targetObj)
  } else {
    // Assume it's a game object?
    const stringFn = evaluateOperand(token);
    return (game, thisObj, targetObj) => stringFn(game, thisObj, targetObj)
  }
};

const parseLine = line => {
  const tokens = line.tokens.map(parseToken)
  return (game, thisObj, targetObj) => {
    return tokens.map(t => t(game, thisObj, targetObj)).join('')
  }
};

const parseParagraph = paragraph => {
  const lines = paragraph.lines.map(parseLine)

  return (game, thisObj, targetObj) => {
    return lines.map(l => l(game, thisObj, targetObj)).join(' ')
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
  return (game, thisObj, targetObj) => {
    return paragraphs.map(p => p(game, thisObj, targetObj)).join('\n')
  }
}

module.exports = parsePassage