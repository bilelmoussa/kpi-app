import { GET_N2_PLUS_50, POST_N2_PLUS_50 } from '../actions/types';

const initialState = {
	Get_n2_plus_50: {},
	Post_n2_plus_50: {},
	Put_n2_plus_50: {},
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2_PLUS_50:
            return { ...state, Get_n2_plus_50: action.payload };
		case POST_N2_PLUS_50:
			return { ...state, Post_n2_plus_50: action.payload };
        default: 
            return state;
    }
}