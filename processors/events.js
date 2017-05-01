import { setProperty } from './properties'
import parsePassage from './text'

const processSet = action => {
  const setFn = setProperty(action.target.id, action.target.props, action.value)
  return game => setFn(game)
}

const processSay = action => {
  const sayFn = parsePassage(action.passage)
  return game => ({...game, buffer: [sayFn(game), ...game.buffer]})
}

const actions = {
  set: processSet,
  say: processSay
}


const processAction = action => {
  const actionFn = actions[action.type](action)
  return game => actionFn(game)
}

module.exports = event => {
  const actions = event.actions.map(processAction)
  return game => actions.reduce((acc, actionFn) => actionFn(acc), game)
}