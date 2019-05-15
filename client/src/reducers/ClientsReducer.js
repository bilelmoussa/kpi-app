import { CLIENTS } from '../actions/types';

const initialState = {
    Clients: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case CLIENTS:
            return { ...state, Clients:action.payload };
        default:
            return state;    
    }
}