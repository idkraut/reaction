const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const {createList, addListToBoard, sendList, verifyBoardExists} = require("../controllers/listsController");
const { validateBoard, validateList } = require("../validators/validators");

router.get("/boards", boardsController.getBoards);
router.get("/boards/:id", boardsController.getBoard);

router.post("/boards", validateBoard, boardsController.createBoard);
router.post("/lists", verifyBoardExists, validateList, createList, addListToBoard, sendList);

module.exports = router;
