import { TURNOVER, TURNOVER_ERROR } from '../actions/types';

const initialState = {
    Turnover: {},
    Turnover_Error: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case TURNOVER:
            return { ...state, Turnover:action.payload };
        case TURNOVER_ERROR:
            return { ...state, Turnover_Error: action.payload };   
        default:
            return state;    
    }
}