import { QUOTES_NUMBER } from '../actions/types';

const initialState = {
    QuotesNumber: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case QUOTES_NUMBER:
            return { ...state, QuotesNumber:action.payload };  
        default:
            return state;    
    }
}