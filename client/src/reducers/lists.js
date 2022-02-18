export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const listsWithoutCards = action.board.lists.map(list => {
        // eslint-disable-next-line no-unused-vars
        const {cards, ...listWithoutCards} = list
        return listWithoutCards
      })

      return listsWithoutCards;
    }
    default:
      return state;
  }
}
