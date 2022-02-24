import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card };
}

export function getCardSuccess(card) {
  return { type: types.GET_CARD_SUCCESS, card };
}

export function createCard(card, callback = () => {}) {
  return function (dispatch) {
    apiClient.createCard(card, (data) => {
      dispatch(createCardSuccess(data));
      callback();
    });
  };
}

export function fetchCard(cardId, callback = () => {}) {
  return function (dispatch) {
    apiClient.getCard(cardId, (data) => {
      dispatch(getCardSuccess(data));
      callback();
    });
  };
}
