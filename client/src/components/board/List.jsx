import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";

import { editList } from "../../actions/ListActions";
import { createCard } from "../../actions/CardsActions";

const List = ({
  _id,
  title,
  isAddCardFormActive,
  onChangeActiveAddCardForm,
}) => {
  const dispatch = useDispatch();

  const [isEditTitle, setIsEditTitle] = useState(false);

  const [listTitle, setListTitle] = useState(title);
  const [cardTitle, setCardTitle] = useState("");

  const handleEditTitle = () => {
    const listChanges = {
      title: listTitle,
    };

    dispatch(
      editList(_id, listChanges, () => {
        setIsEditTitle(false);
      })
    );
  };

  const handleAddCard = () => {
    dispatch(
      createCard({ title: cardTitle, listId: _id }, () => {
        setCardTitle("");
        onChangeActiveAddCardForm("");
      })
    );
  };

  const cards = useSelector((state) => state.cards).filter(
    (card) => card.listId === _id
  );

  return (
    <div
      className={
        isAddCardFormActive
          ? "list-wrapper add-dropdown-active"
          : "list-wrapper"
      }
    >
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {isEditTitle ? (
              <input
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onKeyUp={(e) => (e.key === "Enter" ? handleEditTitle() : null)}
                onBlur={handleEditTitle}
                className="list-title"
                autoFocus
              />
            ) : (
              <p
                onClick={() => setIsEditTitle(!isEditTitle)}
                className="list-title"
              >
                {listTitle}
              </p>
            )}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map((card) => (
              <Card key={card._id} {...card}></Card>
            ))}
          </div>
          <div
            className={
              isAddCardFormActive
                ? "add-dropdown add-bottom active-card"
                : "add-dropdown add-bottom"
            }
          >
            <div className="card">
              <div className="card-info"></div>
              <textarea
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                name="add-card"
              ></textarea>
              <div className="members"></div>
            </div>
            <a onClick={handleAddCard} className="button">
              Add
            </a>
            <i
              onClick={() => onChangeActiveAddCardForm("")}
              className="x-icon icon"
            ></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div
            className="add-card-toggle"
            onClick={() => onChangeActiveAddCardForm(_id)}
            data-position="bottom"
          >
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
