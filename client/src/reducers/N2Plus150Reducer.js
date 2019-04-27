import { 
    N2_PLUS_150_YEARS, 
    N2_PLUS_150_MONTHS, 
    N2_PLUS_150_WEEKS,
    N2_PLUS_150_WEEK_CHART_DATA,
    N2_PLUS_150_MONTH_CHART_DATA,
    N2_PLUS_150_YEAR_CHART_DATA ,
<<<<<<< HEAD
    N2_PLUS_150_WEEK_TABLE_DATA,
    N2_PLUS_150_SELECT_DATE
=======
    N2_PLUS_150_WEEK_TABLE_DATA
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
} from '../actions/types';

const initialState = {
    Years: {},
	Months: {},
    Weeks: {},
    WeekChartData: {},
    MonthChartData: {},
    YearChartData: {},
    WeekTableData: {},
<<<<<<< HEAD
    N2Plus150_selectedDate: {},
=======
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
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
<<<<<<< HEAD
            return { ...state, WeekTableData: action.payload };  
        case N2_PLUS_150_SELECT_DATE:
            return { ...state, N2Plus150_selectedDate: action.payload}          
=======
            return { ...state, WeekTableData: action.payload };        
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
        default: 
            return state;
    }
}