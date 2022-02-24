const Card = require("../models/card");
const List = require("../models/list");

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findById(cardId).then((card) => res.json(card));
};

const verifyListExists = async (req, res, next) => {
  const listId = req.body.card.listId;
  const list = await List.findById(listId);
  if (!list) {
    res.status(404).send("List could not be found");
  } else {
    req.list = list;
    next();
  }
};

const addBoardId = (req, res, next) => {
  req.body.card.boardId = req.list.boardId;
  next();
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Card.create(req.body.card)
      .then((card) => {
        req.card = card;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The card title is empty.", 404));
  }
};

const addCardToList = (req, res, next) => {
  const cardId = req.card._id;
  const listId = req.card.listId;

  List.updateOne({ _id: listId }, { $push: { cards: cardId } }).then(() =>
    next()
  );
};

const sendCard = (req, res) => {
  res.json(req.card);
};

const createComment = (req, res) => {
  const cardId = req.body.cardId;
  Card.findByIdAndUpdate(cardId, {
    $push: { comments: req.body.comment },
  }).then((card) => res.json(card.comments[card.comments.length - 1]));
};

module.exports = {
  getCard,
  verifyListExists,
  addBoardId,
  createCard,
  addCardToList,
  sendCard,
  createComment,
};
