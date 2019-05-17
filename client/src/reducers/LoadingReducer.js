import {LOADING} from '../actions/types';

const initialState = {
    Loading: {},
}

export default function(state = initialState, action) {
    switch(action.type){
        case LOADING:
            return { ...state, Loading: action.payload }
        default:
            return state;    
    }
}