const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const {
  validateBoard,
  validateList,
  validateCard,
  validateCardEdits,
} = require("../validators/validators");

router.get("/boards", boardsController.getBoards);
router.get("/boards/:id", boardsController.getBoard);

router.post("/boards", validateBoard, boardsController.createBoard);
router.post(
  "/lists",
  listsController.verifyBoardExists,
  validateList,
  listsController.createList,
  listsController.addListToBoard,
  listsController.sendList
);

router.put("/lists/:id", listsController.updateList, listsController.sendList);

router.get("/cards/:id", cardsController.getCard);
router.post(
  "/cards",
  cardsController.verifyListExists,
  validateCard,
  cardsController.addBoardId,
  cardsController.createCard,
  cardsController.addCardToList,
  cardsController.sendCard
);
router.post("/comments", cardsController.createComment);
router.put("/cards/:id", validateCardEdits, cardsController.updateCard);

module.exports = router;
