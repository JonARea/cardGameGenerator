import SomeAction from '../actions'

export default function (state = 'A new and virgin state', action) {
  switch (action.type) {
    case SomeAction:
      return {
        statePiece: action.statePiece
      }
    default:
      return state
  }
}
