import { combineReducers } from "redux";
import { stringReducer } from "./stringReduser";

export const rootReducer = combineReducers({
    stringPage: stringReducer
});
