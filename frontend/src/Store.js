import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { registrationReducer } from "./components/Reducers/RegistrationReducer";
import { datasaverReducer } from "./components/Reducers/DatasaveReducer";
import { userReducer } from "./components/Reducers/UserReducer";
const reducers = combineReducers({
    user:registrationReducer,
    data:datasaverReducer,
    serviceProvider:userReducer
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
