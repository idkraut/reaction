const Card = require("../models/card");

const getCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findById(cardId).then((card) => res.json(card));
};

module.exports = {
  getCard,
};
