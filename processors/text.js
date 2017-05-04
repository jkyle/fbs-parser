import { getProperty } from './properties'
import evaluateCondition from './conditionals'

const comparators = {
  '===': (left, right) => left === right,
  '>': (left, right) => left > right
}

const getValue = (item) => {
  if(typeof item !== 'object') {
    return game => item.value
  }
  return getProperty(item)
}

const conditionToken = token => {
  const { condition, passage } = token
  const passageFn = parsePassage(passage)
  const conditionFn = evaluateCondition(condition)
  return (game, thisObj, targetObj) => {
    if (conditionFn(game, thisObj, targetObj)) {
      return passageFn(game, thisObj, targetObj)
    } else {
      return ''
    }
  }
};

const propertyToken = token => {
  const access = getProperty(token)
  return (game, thisObj, targetObj) => access(game, thisObj, targetObj)
};

const parseToken = token => {
  if(typeof token === 'string') {
    return (game, thisObj, targetObj) => token
  } else if (token.type === 'condition') {
    const stringFn = conditionToken(token);
    return (game, thisObj, targetObj) => stringFn(game, thisObj, targetObj)
  } else if (token.type === 'GAME_OBJECT') {
    const stringFn = getProperty(token);
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