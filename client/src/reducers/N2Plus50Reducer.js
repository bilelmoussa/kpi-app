import { GET_N2_PLUS_50, N2_PLUS_50_YEARS } from '../actions/types';

const initialState = {
    Get_n2_plus_50: {},
    Years: {}
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2_PLUS_50:
            return { ...state, Get_n2_plus_50: action.payload };
        case N2_PLUS_50_YEARS:
            return { ...state, Years: action.payload };
        default: 
            return state;
    }
}