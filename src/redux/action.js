import {requestLogin} from "../api";
import {LOGIN, LOGOUT} from "./action-type";
// import {init} from "http-proxy-middleware/dist/handlers";
// import {items} from "./reducer";

const resLogin = (data) => ({type: LOGIN, data: data})
const resLogout = () => ({type: LOGOUT})

const initItems = (items) => ({type: "init", data: items})

export const login = (user) => {
    return async dispatch => {
        // requestLogin(user).then(r => {}).catch((err) => {})
        const {data} = await requestLogin(user)
        dispatch(resLogin(data))
        // if (data.err_code === 0) {
        //     dispatch(authSuccess(data))
        // } else {
        //     dispatch(errorMsg(data))
        // }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(resLogout())
    }
}

export const initItemsData = (items) => {
    return dispatch => {
        dispatch(
            initItems(items)
        )
    }
}