import { combineReducers } from "redux";
import boards from "./boards";
import lists from "./lists";

const rootReducer = combineReducers({ boards, lists });

export default rootReducer;
