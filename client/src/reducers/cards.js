export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      return action.board.lists.reduce((cards, list) => cards.concat(list.cards), [])
    }
    default:
      return state;
  }
}
