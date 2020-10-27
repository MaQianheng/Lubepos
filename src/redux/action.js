import {requestLogin} from "../api";
import {ERROR_MSG, AUTH_SUCCESS, LOGIN} from "./action-type";

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (errMsg) => ({type: ERROR_MSG, data: errMsg})
const resLogin = (data) => ({type: LOGIN, data: data})

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