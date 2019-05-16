import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS, NOTIFICATION_WARNING, NOTIFICATION_INFO } from "../actions/types";

const initialState = {
    Notification_Error: {},
    Notification_Success: {},
    Notification_Warning: {},
    Notification_Info: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case NOTIFICATION_ERROR: 
            return { ...state, Notification_Error: action.payload };
        case NOTIFICATION_SUCCESS:
            return { ...state, Notification_Success: action.payload };
        case NOTIFICATION_WARNING:
            return { ...state, Notification_Warning: action.payload } 
        case NOTIFICATION_INFO:
             return { ...state, Notification_Info: action.payload }
        default:
            return state;    
    }
}