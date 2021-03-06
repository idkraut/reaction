const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String },
  },
  { timestamps: true }
);

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
    dueDate: {
      type: String,
    },
    labels: {
      type: [String],
    },
    position: {
      type: Number,
    },
    archived: {
      type: Boolean,
    },
    completed: {
      type: Boolean,
    },
    comments: { type: [CommentSchema] },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
