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
  return game => {
    if (conditionFn(game)) {
      return passageFn(game)
    } else {
      return ''
    }
  }
};

const propertyToken = token => {
  const access = getProperty(token)
  return game => access(game)
};

const parseToken = token => {
  if(typeof token === 'string') {
    return game => token
  } else if (token.type === 'condition') {
    const stringFn = conditionToken(token);
    return game => stringFn(game)
  } else if (token.type === 'GAME_OBJECT') {
    const stringFn = getProperty(token);
    return game => stringFn(game)
  }
};

const parseLine = line => {
  const tokens = line.tokens.map(parseToken)

  return game => {
    return tokens.map(t => t(game)).join(' ')
  }
};

const parseParagraph = paragraph => {
  const lines = paragraph.lines.map(parseLine)

  return game => {
    return lines.map(l => l(game)).join(' ')
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
  return game => {
    return paragraphs.map(p => p(game)).join('\n')
  }
}

module.exports = parsePassage