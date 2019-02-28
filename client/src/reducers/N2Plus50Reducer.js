import { GET_N2_PLUS_50, POST_N2_PLUS_50 } from '../actions/types';

const initialState = {
	Posted_N2_Plus_50:{},
	Get_N2_Plus_50:{}
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2_PLUS_50:
            return { ...state, Get_N2_Plus_50: action.payload };
		case POST_N2_PLUS_50:
			return { ...state, Posted_N2_Plus_50: action.payload };
        default: 
            return state;
    }
}