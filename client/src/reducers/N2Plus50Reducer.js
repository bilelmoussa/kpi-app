import { 
    GET_N2_PLUS_50, 
    N2_PLUS_50_YEARS, 
    N2_PLUS_50_MONTHS,
    N2_PLUS_50_WEEKS,
    N2_PLUS_50_CHART_DATA
    } from '../actions/types';

const initialState = {
    Get_n2_plus_50: {},
    Years: {},
	Months: {},
    Weeks: {},
    ChartData: {}
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2_PLUS_50:
            return { ...state, Get_n2_plus_50: action.payload };
        case N2_PLUS_50_YEARS:
            return { ...state, Years:action.payload };
        case N2_PLUS_50_MONTHS:
            return { ...state, Months: action.payload};
        case N2_PLUS_50_WEEKS:
            return { ...state, Weeks: action.payload };    
        case N2_PLUS_50_CHART_DATA:
            return { ...state, ChartData: action.payload };    
        default: 
            return state;
    }
}