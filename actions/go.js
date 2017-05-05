export default (target, action, state, app) => {
  // Make sure target is valid
  if(action === 'GO') {
    console.log(state.objects[state.location].exits);
    if(state.objects[state.location].exits.indexOf(target) > -1) {
      const state1 = app[state.location].EXIT ? app[state.location].EXIT(state, target) : state;
      const state2 = app[target].ENTER ? app[target].ENTER(state, target) : state1
      return { ...state2, location: target }
    }
    return { ...state, buffer: ["You can't go there from here.", ...state.buffer] };
  }
  return state;
}
