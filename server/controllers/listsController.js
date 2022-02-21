require("../models/card");
const List = require("../models/list");
const Board = require("../models/board");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

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

const addListToBoard = (req, res, next) => {
  console.log("req:", req.list)
  const listId = req.list._id;
  const boardId = req.list.boardId;

  Board.updateOne({_id: boardId}, {$push: {lists: listId}})
       .then(() => next())
}

const sendList = (req, res, next) => {
  const {cards, ...listWithoutCards} = req.list.toObject();
  res.json(listWithoutCards);
}

module.exports = { createList, addListToBoard, sendList };
