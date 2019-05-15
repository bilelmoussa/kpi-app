import { TURNOVER } from '../actions/types';

const initialState = {
    Turnover: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case TURNOVER:
            return { ...state, Turnover:action.payload };  
        default:
            return state;    
    }
}