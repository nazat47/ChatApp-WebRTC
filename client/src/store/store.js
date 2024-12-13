import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth-reducer";
import alertReducer from "./reducers/alert-reducer";
import friendsReducer from "./reducers/friends-reducer";
import chatReducer from "./reducers/chat-reducer";
import roomReducer from "./reducers/room-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
