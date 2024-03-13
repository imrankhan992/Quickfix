import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { registrationReducer } from "./components/Reducers/RegistrationReducer";
import { datasaverReducer } from "./components/Reducers/DatasaveReducer";
import { userReducer } from "./components/Reducers/UserReducer";
import { spReducer } from "./components/Reducers/SpReducer";
import { adminReducer } from "./components/Reducers/AdminDataReducer";
const reducers = combineReducers({
  user: registrationReducer,
  data: datasaverReducer,
  serviceProvider: userReducer,
  spData: spReducer,
  admin:adminReducer
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
