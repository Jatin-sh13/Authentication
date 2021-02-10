import axios from 'axios'
import { UserRegisterSucess, UserRegisterFail, Userloadfail, Userloadsucess, UserloginFail, UserloginSucess } from '../Types'
import { setToken } from '../setToken'
export const getlogindata = () => async dispatch => {
    if (localStorage.token) {
        setToken(localStorage.token)
    }
    try {
        const { data } = await axios.get('/api/login')
        dispatch({
            type: Userloadsucess,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Userloadfail,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
export const Auth = (name, email, password) => async (dispatch) => {
    try {
        const Registerdata = { name, email, password }
        console.log(Registerdata)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/user', Registerdata, config)
        dispatch({
            type: UserRegisterSucess,
            payload: data
        })
        dispatch(getlogindata())
    } catch (error) {
        dispatch({
            type: UserRegisterFail,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
export const login = (email, password) => async (dispatch) => {
    try {
        const logindata = { email, password }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/login', logindata, config)
        dispatch({
            type: UserloginSucess,
            payload: data
        })
        dispatch(getlogindata())
    } catch (error) {
        console.log(error)
        dispatch({
            type: UserloginFail,
            payload: 'Server Error Invalid Credentials'
        })
    }
}
//update profile
