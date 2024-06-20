import { SIGNUP_DATA_REQUEST } from "../Constants/SignupConstants";

const initialState = {
  data: null 
};
export const datasaverReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_DATA_REQUEST:
      return {
        ...state, 
        data: action.payload 
      };
    default:
      return state; 
  }
};
