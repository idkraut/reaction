import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function createList(list, callback = () => {}) {
  return function (dispatch) {
    apiClient.createList(list, (data) => {
      dispatch(createListSuccess(data));
      callback(data.list);
    });
  };
}