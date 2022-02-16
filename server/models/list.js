const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Card = require("./card.js");

const ListSchema = new Schema({
  title: {
    type: String,
  },
  cards: {
    type: [],
    children: {
      type: Card,
    },
  },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
