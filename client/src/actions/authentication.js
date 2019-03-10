import axios from 'axios';
import { 
	GET_ERRORS, 
	SET_CURRENT_USER,
	GET_N2, 
	GET_N2_PLUS_150,
	GET_N2_PLUS_50, 
	N2_YEARS,
	N2_PLUS_150_YEARS,
	N2_PLUS_50_YEARS,
	N2_MONTHS 
} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';


export const loginUser = (user, history) => dispatch => {
    axios.post('/api/user/login', user)
            .then(res => {
				const  { token } = res.data;
                localStorage.setItem('jwtToken', token);
				setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
				history.push('/dashboard');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
			
}

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/user/register', user)
            .then(res =>{ 
				history.push('/login')
			})
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
	if(history){
		history.push('/login')
	}
}

export const delete_Error = () => dispatch =>{
	let new_err = { }
	dispatch({
		type: GET_ERRORS,
		payload: new_err
	})
}



 
export const post_N2 = (Part) => dispatch =>{
	axios.post('/api/N2/saveparts', Part)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const post_N2_plus_150 = (Part) => dispatch =>{
	axios.post('/api/N2_plus_150/saveparts', Part)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const post_N2_plus_50 = (Part) => dispatch =>{
	axios.post('/api/N2_plus_50/saveparts', Part)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

function to_date(data){
	let date = new Date(data);
	date.setHours(date.getHours() +1);
	let new_form_d = date.toISOString().substring(0, 16);
	return new_form_d;
}

function only_date(data){
	let date = new Date(data);
	let n = date.toISOString().substring(0, 10);
	return n;
}

function time_hours(value){
	let num = value * 60;
	let hours = Math.floor(num / 60);  
	let index_p = String(value).indexOf('.');
	let before_col = String(value).slice(index_p);
	let minutes_H = Math.round(Number(`0${before_col}`) * 60);
	
	if(minutes_H.toString().length < 2){
		 minutes_H =  `0${minutes_H}`;
	}
	
	if(hours.toString().length < 2){
		hours = `0${hours}`;
	}
	
	if(index_p == -1){
		return hours + ":" + "00";
	}else{
		return hours + ":" + minutes_H;
	}
	
}

export const get_N2 = () => dispatch =>{
	axios.get('/api/N2/findparts')
			.then(res =>{
				console.log(res.data);
				let new_rows = [];
				res.data.parts.forEach((part, index)=>{
					part.rows.forEach((row, i)=>{
						row.id = i;
						row.Date = only_date(row.Date);
						row.timeAndDate = to_date(row.timeAndDate);
						row.finishingTime = to_date(row.finishingTime);
						row.workingHours = time_hours(row.workingHours);
						row.actualWh = time_hours(row.actualWh);						
					})
					new_rows.push(part)
				})
								
				dispatch({
					type: GET_N2,
					payload: new_rows
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}


export const get_N2_plus_150 = () => dispatch =>{
	axios.get('/api/N2_plus_150/findparts')
			.then(res =>{
				let new_rows = [];
				res.data.parts.forEach((part, index)=>{
					part.rows.forEach((row, i)=>{
						row.id = i;
						row.Date = only_date(row.Date);
						row.timeAndDate = to_date(row.timeAndDate);
						row.finishingTime = to_date(row.finishingTime);
						row.workingHours = time_hours(row.workingHours);
						row.actualWh = time_hours(row.actualWh);						
					})
					new_rows.push(part)
				})
								
				dispatch({
					type: GET_N2_PLUS_150,
					payload: new_rows
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const get_N2_plus_50 = () => dispatch =>{
	axios.get('/api/N2_plus_50/findparts')
			.then(res =>{
				let new_rows = [];
				res.data.parts.forEach((part, index)=>{
					part.rows.forEach((row, i)=>{
						row.id = i;
						row.Date = only_date(row.Date);
						row.timeAndDate = to_date(row.timeAndDate);
						row.finishingTime = to_date(row.finishingTime);
						row.workingHours = time_hours(row.workingHours);
						row.actualWh = time_hours(row.actualWh);						
					})
					new_rows.push(part)
				})
								
				dispatch({
					type: GET_N2_PLUS_50,
					payload: new_rows
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const put_N2 = (query) => dispatch =>{
	axios.put('/api/N2/updateparts', query)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const put_N2_plus_150 = (query) => dispatch =>{
	axios.put('/api/N2_plus_150/updateparts', query)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const put_N2_plus_50 = (query) => dispatch =>{
	axios.put('/api/N2_plus_50/updateparts', query)
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const delete_N2 = (id) => dispatch =>{
	axios.delete('/api/N2/deleteparts', { data: { id } } )
		.catch(err => {
			dispatch({
					type: GET_ERRORS,
					payload: err
				})
		})
}

export const delete_N2_plus_150 = (id) => dispatch =>{
	axios.delete('/api/N2_plus_150/deleteparts', { data: { id } })
		.catch(err => {
			dispatch({
					type: GET_ERRORS,
					payload: err
				})
		})
}

export const delete_N2_plus_50 = (id) => dispatch =>{
	axios.delete('/api/N2_plus_50/deleteparts', { data: { id } })
		.catch(err => {
			dispatch({
					type: GET_ERRORS,
					payload: err
				})
		})
}


export const get_years = () => dispatch =>{
	 axios.get('/api/N2/years')
		.then(res => {
			console.log(res);
			dispatch({
				type: N2_YEARS,
				payload: res.data.years
			})
		})
		.catch(err =>{console.log(err)})
}

export const get_months = (year) => dispatch =>{
	axios.get(`/api/N2/months/${year}`)
	   .then(res => {
		   console.log(res)
		   dispatch({
			   type: N2_MONTHS,
			   payload: res.data.months
		   })
	   })
	   .catch(err =>{console.log(err)})
}