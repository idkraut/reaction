const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  boardId: { type: Schema.Types.ObjectId, ref: "Board" },
  title: {
    type: String,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
}, {timestamps: true});

const List = mongoose.model("List", ListSchema);

module.exports = List;
