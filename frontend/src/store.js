import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer, allUsersReducer
} from "./reducer/userReducer";
import {
  socketReducer,
} from "./reducer/socketReducer";

const reducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
