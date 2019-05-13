import { QUOTES_NUMBER,  QUOTES_NUMBER_ERROR } from '../actions/types';

const initialState = {
    QuotesNumber: {},
    QuotesNumber_Error: {},
}

export default function(state = initialState, action){
    switch(action.type){
        case QUOTES_NUMBER:
            return { ...state, QuotesNumber:action.payload };
        case QUOTES_NUMBER_ERROR:
            return { ...state, QuotesNumber_Error: action.payload}   
        default:
            return state;    
    }
}