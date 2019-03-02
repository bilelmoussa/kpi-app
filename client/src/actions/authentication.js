import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_N2, GET_N2_PLUS_150, GET_N2_PLUS_50, POST_N2, POST_N2_PLUS_150, POST_N2_PLUS_50, PUT_N2, PUT_N2_PLUS_150, PUT_N2_PLUS_50 } from './types';
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
    history.push('/login');
}

export const delete_Error = () => dispatch =>{
	let new_err = { }
	dispatch({
		type: GET_ERRORS,
		payload: new_err
	})
}

export const GET_Token = ()=>{
	const Token = localStorage.getItem('jwtToken');
	console.log(Token);
	return Token || null;
}

 
export const post_N2 = (Part) => dispatch =>{
	axios.post('/api/N2/saveparts', Part)
			.then(res =>{
				dispatch({
					type: POST_N2,
					payload: res.data.part
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const post_N2_plus_150 = (Part) => dispatch =>{
	axios.post('/api/N2_plus_150/saveparts', Part)
			.then(res =>{
				dispatch({
					type: POST_N2_PLUS_150,
					payload: res.data.part
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const post_N2_plus_50 = (Part) => dispatch =>{
	axios.post('/api/N2_plus_50/saveparts', Part)
			.then(res =>{
				dispatch({
					type: POST_N2_PLUS_50,
					payload: res.data.part
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

function to_date(data){
	let date = new Date(data);
	let new_form_d = date.toISOString().substring(0, 16);
	return new_form_d;
}

function only_date(data){
	let date = new Date(data);
	let n = date.toISOString().substring(0, 10);
	return n;
}

export const get_N2 = () => dispatch =>{
	axios.get('/api/N2/findparts')
			.then(res =>{
				let new_rows = [];
				let rows = res.data.parts;
				for(let i = 0; i < rows.length; i++){
					rows[i].id = i;
					rows[i].Date = only_date(rows[i].Date);
					rows[i].timeAndDate = to_date(rows[i].timeAndDate);
					rows[i].finishingTime = to_date(rows[i].finishingTime);
					new_rows.push(rows[i]);
				}
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
				let rows = res.data.parts;
				for(let i = 0; i < rows.length; i++){
					rows[i].id = i;
					rows[i].Date = only_date(rows[i].Date);
					rows[i].timeAndDate = to_date(rows[i].timeAndDate);
					rows[i].finishingTime = to_date(rows[i].finishingTime);
					new_rows.push(rows[i]);
				}
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
				let rows = res.data.parts;
				for(let i = 0; i < rows.length; i++){
					rows[i].id = i;
					rows[i].Date = only_date(rows[i].Date);
					rows[i].timeAndDate = to_date(rows[i].timeAndDate);
					rows[i].finishingTime = to_date(rows[i].finishingTime);
					new_rows.push(rows[i]);
				}
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
			.then(res =>{
				dispatch({
					type: PUT_N2,
					payload: res.data
				})
				})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const put_N2_plus_150 = (query) => dispatch =>{
	axios.put('/api/N2_plus_150/updateparts', query)
			.then(res =>{
				dispatch({
					type: PUT_N2_PLUS_150,
					payload: res.data
				})
				})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}

export const put_N2_plus_50 = (query) => dispatch =>{
	axios.put('/api/N2_plus_50/updateparts', query)
			.then(res =>{
				dispatch({
					type: PUT_N2_PLUS_50,
					payload: res.data
				})
				})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err
				})
			})
}