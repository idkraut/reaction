import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";

import { editList } from "../../actions/ListActions";

const List = ({ _id, title }) => {
  const dispatch = useDispatch();

  const [isEditTitle, setIsEditTitle] = useState(false);

  const [listTitle, setListTitle] = useState(title);

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

  const cards = useSelector((state) => state.cards).filter(
    (card) => card.listId === _id
  );

  return (
    <div className="list-wrapper">
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
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
