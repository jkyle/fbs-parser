import parsePassage from './text'

export default (passage, state) => {
  return parsePassage(passage)(state)
}