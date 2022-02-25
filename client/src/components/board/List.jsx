import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import Card from "./Card";

import { editList } from "../../actions/ListActions";
import { createCard, updateCard } from "../../actions/CardsActions";

function positionCalculator(items, targetPosition, originalPosition = 0) {
  const itemsClone = items.slice().sort((a, b) => a.position - b.position);

  const isOnly = itemsClone.length === 0;
  const isFirst = targetPosition === 0;
  const isLast = targetPosition >= itemsClone.length - 1;

  if (isOnly || itemsClone.length === 0) {
    return 65535;
  } else if (isFirst) {
    return itemsClone[0].position / 2;
  } else if (isLast) {
    return itemsClone[itemsClone.length - 1].position + 65536;
  } else {
    let itemBefore, itemAfter;
    if (originalPosition > targetPosition) {
      itemBefore = itemsClone[targetPosition - 1];
      itemAfter = itemsClone[targetPosition];
    } else {
      itemBefore = itemsClone[targetPosition];
      itemAfter = itemsClone[targetPosition + 1];
    }
    return (itemBefore.position + itemAfter.position) / 2;
  }
}

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

  const cards = useSelector((state) => state.cards).filter(
    (card) => card.listId === _id
  );

  const handleAddCard = () => {
    dispatch(
      createCard(
        {
          title: cardTitle,
          listId: _id,
          position: positionCalculator(cards, cards.length - 1),
        },
        () => {
          setCardTitle("");
          onChangeActiveAddCardForm("");
        }
      )
    );
  };

  const handleDragCard = (result) => {
    if (!result.destination) return null;
    const cardId = result.draggableId;
    const newPosition = positionCalculator(
      cards,
      result.destination.index,
      result.source.index
    );
    dispatch(updateCard(cardId, { position: newPosition }));
  };

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
          <DragDropContext onDragEnd={handleDragCard}>
            <Droppable droppableId={_id}>
              {(provided) => (
                <div
                  id="cards-container"
                  data-id="list-1-cards"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cards
                    .slice()
                    .sort((a, b) => a.position - b.position)
                    .map((card, index) => (
                      <Draggable
                        key={card._id}
                        draggableId={card._id}
                        index={index}
                      >
                        {(provided) => (
                          <Link to={`/cards/${card._id}`}>
                            <Card {...card} provided={provided}></Card>
                          </Link>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
