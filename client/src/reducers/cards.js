export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      return action.board.lists.reduce(
        (cards, list) => cards.concat(list.cards),
        []
      );
    }
    case "CREATE_CARD_SUCCESS": {
      return state.concat(action.card);
    }
    case "GET_CARD_SUCCESS": {
      return state.find((card) => card._id === action.card._id)
        ? state
        : state.concat(action.card);
    }
    default:
      return state;
  }
}
