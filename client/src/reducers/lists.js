/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
export default function lists(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS": {
      const listsWithoutCards = action.board.lists.map(list => {
        const {cards, ...listWithoutCards} = list
        return listWithoutCards
      })

      return listsWithoutCards;
    }
    case "CREATE_LIST_SUCCESS": {
      console.log(action)
      return state.concat(action.list)
    }
    default:
      return state;
  }
}
