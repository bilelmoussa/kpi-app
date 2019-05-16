import {USERS_LIST} from '../actions/types'

const initialState = {
    Users_List: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case USERS_LIST:
            return { ...state, Users_List: action.payload };
        default:
            return state;
    }
}