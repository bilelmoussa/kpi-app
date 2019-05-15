import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, NOTIFICATION_WARNING } from "../actions/types";

const initialState = {
    Notification_Error: {},
    Notification_Success: {},
    Notification_Warning: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case NOTIFICATION_ERROR: 
            return { ...state, Notification_Error: action.payload };
        case NOTIFICATION_SUCCESS:
            return { ...state, Notification_Success: action.payload };
        case NOTIFICATION_WARNING:
            return { ...state, Notification_Warning: action.payload} 
        default:
            return state;    
    }
}