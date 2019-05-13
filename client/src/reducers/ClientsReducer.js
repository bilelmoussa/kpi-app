import { CLIENTS, CLIENTS_ERROR } from '../actions/types';

const initialState = {
    Clients: {},
    Client_Error: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case CLIENTS:
            return { ...state, Clients:action.payload };
        case CLIENTS_ERROR:
            return { ...state, Client_Error: action.payload};
        default:
            return state;    
    }
}