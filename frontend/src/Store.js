import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { registrationReducer } from "./components/Reducers/RegistrationReducer";
const reducers = combineReducers({
    user:registrationReducer
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
