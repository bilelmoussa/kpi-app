import { 
    GET_N2_PLUS_150,
    N2_PLUS_150_YEARS, 
    N2_PLUS_150_MONTHS, 
    N2_PLUS_150_WEEKS,
    N2_PLUS_150_WEEK_CHART_DATA,
    N2_PLUS_150_MONTH_CHART_DATA,
    N2_PLUS_150_YEAR_CHART_DATA 
} from '../actions/types';

const initialState = {
    Get_n2_plus_150: {},
    Years: {},
	Months: {},
    Weeks: {},
    WeekChartData: {},
    MonthChartData: {},
    YearChartData: {}
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_N2_PLUS_150:
            return { ...state, Get_n2_plus_150: action.payload };
        case N2_PLUS_150_YEARS:
            return { ...state, Years:action.payload };
        case N2_PLUS_150_MONTHS:
            return { ...state, Months: action.payload};
        case N2_PLUS_150_WEEKS:
            return { ...state, Weeks: action.payload };    
        case N2_PLUS_150_WEEK_CHART_DATA:
            return { ...state, WeekChartData: action.payload };
        case N2_PLUS_150_MONTH_CHART_DATA:
            return { ...state, MonthChartData: action.payload };
        case N2_PLUS_150_YEAR_CHART_DATA:
            return { ...state, YearChartData: action.payload };     
        default: 
            return state;
    }
}