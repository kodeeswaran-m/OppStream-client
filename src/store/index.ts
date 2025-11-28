import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import { adminReducer } from "./reducers/adminReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  admin:adminReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
