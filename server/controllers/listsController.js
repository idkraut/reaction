require("../models/card");
const List = require("../models/list");
const Board = require("../models/board");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const verifyBoardExists = async (req, res, next) => {
  const boardId = req.body.list.boardId;
  const board = await Board.findById(boardId);
  if (!board) {
    res.status(404).send("Board could not be found");
  } else {
    next();
  }
};

const verifyListExists = async (req, res, next) => {
  const listId = req.params._id;
  console.log(listId);
  // const board = await Board.findById(boardId);
  // if (!list) {
  //   res.status(404).send("Board could not be found");
  // } else {
  //   next();
  // }
};

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.create(req.body.list)
      .then((list) => {
        req.list = list;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The list title is empty.", 404));
  }
};

const updateList = (req, res, next) => {
  const listId = req.params.id;
  console.log(req.body);
  List.findByIdAndUpdate(listId, req.body, () => {}).then((updatedList) =>
    res.json(updatedList)
  );
};

const addListToBoard = (req, res, next) => {
  const listId = req.list._id;
  const boardId = req.list.boardId;

  Board.updateOne({ _id: boardId }, { $push: { lists: listId } }).then(() =>
    next()
  );
};

const sendList = (req, res, next) => {
  const { cards, ...listWithoutCards } = req.list.toObject();
  res.json(listWithoutCards);
};

module.exports = {
  createList,
  addListToBoard,
  sendList,
  verifyBoardExists,
  updateList,
};
