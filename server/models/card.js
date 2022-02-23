const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    listId: { type: Schema.Types.ObjectId, ref: "List" },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
