import processor from './processors/file';
import initialState from './game-state.json';
import program from './game-program.json';
import GO from './actions/go';
import LOOK from './actions/look'
import TAKE from './actions/take'

const app = Object.keys(program).reduce((acc, key) =>
  ({...acc, [key]: processor(program[key]) }), {})

const go = GO(app);
const look = LOOK(app);
const take = TAKE(app);

const performAction = (action, state) => {

  try { // First, see if this action is defined for this target.
    const newState = go(action, look(action, take(action, state)));
    // If state doesn't change as a result of the action, inform the player.
    return newState === state ? {...state, buffer: ["Nothing happens.", ...state.buffer] } : newState
  } catch(e) {
      // Finally, that action has no in-game function, inform the player.
      console.log(e);
      return {...state, buffer: ["Not understood.", ...state.buffer] }
  }
}

export default () => {
  let state = Object.keys(app).reduce((acc, key) => app[key].START ? app[key].START(acc, key) : acc, {...initialState, location: 'ARENA'})
  const subscribers = []

  const next = newState => subscribers.forEach(cb => cb(newState))

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (subject, type, target) => {
      state = performAction({ subject, type, target}, state)
      next(state)
    }
  }
}