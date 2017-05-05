import processor from './processors/file';
import initialState from './game-state.json';
import program from './game-program.json';
import GO from './actions/go';

const app = Object.keys(program).reduce((acc, key) =>
  ({...acc, [key]: processor(program[key]) }), {})

const itemInInventory = (item, inventory) => console.log('inv', inventory) || inventory.indexOf(item) > -1
const itemAtLocation = (item, location) => location.items.indexOf(item) > -1

const performAction = (inTarget, action, state0) => {
  const state = GO(inTarget, action, state0, app)
  // Special Case: LOOK

  if(action === 'LOOK' && inTarget && !(itemInInventory(inTarget, state.objects.PLAYER.items) || itemAtLocation(inTarget, state.objects[state.location]))) {
    return {...state, buffer: ["You don't see that here.", ...state.buffer] }
  }

  const target = (action === 'LOOK' && !inTarget) ? state.location : inTarget

  try { // First, see if this action is defined for this target.
    const newState = app[target][action](state, target)
    // If state doesn't change as a result of the action, inform the player.
    return newState === state ? {...state, buffer: ["Nothing happens.", ...state.buffer] } : newState
  } catch(e) {
    try {
      // If the action isn't define for that object, check to see
      // if there's a default action defined.
      return app.DEFAULT[action](state, target)
    } catch(e) {
      // Finally, that action has no in-game function, inform the player.
      // console.log(e);
      return {...state, buffer: ["Not understood.", ...state.buffer] }
    }
  }
}

export default () => {
  let state = Object.keys(app).reduce((acc, key) => app[key].START ? app[key].START(acc, key) : acc, {...initialState, location: 'ARENA'})
  const subscribers = []

  const next = newState => subscribers.forEach(cb => cb(newState))

  return {
    subscribe: (cb) => { subscribers.push(cb); cb(state) },
    dispatch: (target, action) => {
      state = performAction(target, action, state)
      next(state)
    }
  }
}