import { GET_N2_PLUS_150, N2_PLUS_150_YEARS } from '../actions/types';

const initialState = {
    Get_n2_plus_150: {},
    Years: {},
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2_PLUS_150:
            return { ...state, Get_n2_plus_150: action.payload };
        case N2_PLUS_150_YEARS:
            return { ...state, Years:action.payload }  
        default: 
            return state;
    }
}