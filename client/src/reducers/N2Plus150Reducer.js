import { 
    N2_PLUS_150_YEARS, 
    N2_PLUS_150_MONTHS, 
    N2_PLUS_150_WEEKS,
    N2_PLUS_150_WEEK_CHART_DATA,
    N2_PLUS_150_MONTH_CHART_DATA,
    N2_PLUS_150_YEAR_CHART_DATA ,
    N2_PLUS_150_WEEK_TABLE_DATA,
    N2_PLUS_150_SELECT_DATE
} from '../actions/types';

const initialState = {
    Years: {},
	Months: {},
    Weeks: {},
    WeekChartData: {},
    MonthChartData: {},
    YearChartData: {},
    WeekTableData: {},
    N2Plus150_selectedDate: {},
};

export default function(state = initialState, action ) {
    switch(action.type) {
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
        case N2_PLUS_150_WEEK_TABLE_DATA:
            return { ...state, WeekTableData: action.payload };  
        case N2_PLUS_150_SELECT_DATE:
            return { ...state, N2Plus150_selectedDate: action.payload}          
        default: 
            return state;
    }
}