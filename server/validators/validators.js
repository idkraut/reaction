const { check, param, body, oneOf } = require("express-validator");

exports.validateBoard = [check("board.title").not().isEmpty()];
exports.validateList = [check("list.title").not().isEmpty()];
exports.validateCard = [check("card.title").not().isEmpty()];

exports.validateCardEdits = [
  param("id").exists().isString(),
  body("card")
    .exists()
    .custom((value) =>
      Object.keys(value).every((k) =>
        [
          "title",
          "listId",
          "position",
          "description",
          "archived",
          "dueDate",
          "completed",
          "labels",
        ].includes(k)
      )
    ),
  oneOf([
    body("card.title").exists().isString(),
    body("card.listId").exists().isString(),
    body("card.position").exists().isNumeric(),
    body("card.description").exists().isString(),
    body("card.archived").exists().isBoolean(),
    body("card.dueDate").exists(),
    body("card.completed").exists().isBoolean(),
    body("card.labels").exists().isArray(),
  ]),
];
