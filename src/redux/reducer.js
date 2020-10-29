import {combineReducers} from "redux";
import {AUTH_SUCCESS, ERROR_MSG, LOGIN, LOGOUT} from "./action-type";
// import {user} from './action'

const initUser = {}

export const user = (state=initUser, action) => {
    switch (action.type) {
        case LOGIN:
            return {...action.data}
        case LOGOUT:
            return initUser
        // case AUTH_SUCCESS:
        //     // const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
        //     // action.data -> user
        //     return {...state, user: action.data, errMsg: "Login success"}
        // case ERROR_MSG:
        //     // const errorMsg = (errMsg) => ({type: ERROR_MSG, data: errMsg})
        //     // action.data -> errMsg
        //     return {...state, errMsg: action.data}
        default:
            return state
    }
}

const initItems = {}

export const items = (state=initItems, action) => {
    switch (action.type) {
        case "init":
            return {...action.data}
        default:
            return state
    }
}

// 向外暴露: {user: {}}
export default combineReducers({
    user,
    items
})