import {
    SOCKET_REQUEST,SOCKET_SUCCESS, SOCKET_FAIL,
    CLEAR_ERRORS,
  } from "../constant/socketConstant";
  
  export const socketReducer = (state = { socket: null }, action) => {
    switch (action.type) {
      case SOCKET_REQUEST:
        return {
          loading: true,
          socket: null,
        };
      case SOCKET_SUCCESS:
        return {
          ...state,
          loading: false,
          socket: action.payload,
        };
  
      case SOCKET_FAIL:
        return {
          ...state,
          loading: false,
          socket: null,
          error: action.payload,
        };  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  