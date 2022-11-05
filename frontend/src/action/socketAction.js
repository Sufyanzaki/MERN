import {
    SOCKET_REQUEST, SOCKET_SUCCESS, SOCKET_FAIL,
    CLEAR_ERRORS,
} from "../constant/socketConstant";
import io from "socket.io-client"

// connect to socket
export const socketConnection = () => async (dispatch) => {
    try {
        dispatch({ type: SOCKET_REQUEST });
        const data = io("http://localhost:4000");
        dispatch({ type: SOCKET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SOCKET_FAIL,
            payload: error
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};