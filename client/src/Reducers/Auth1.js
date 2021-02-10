import { UserRegisterFail, UserRegisterSucess, Userloadsucess, Userloadfail, UserloginSucess, UserloginFail } from '../Types'
const initialstate = {
    token: localStorage.getItem('token'),
    loading: true,
    user: null,
    error:null
}
export const Auth1 = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case UserRegisterSucess:
        case UserloginSucess:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                loading: false
            }
        case Userloadsucess:
            return {
                ...state,
                user: payload,
                loading:false
            }
        case Userloadfail:
            return {
                loading: true
            }
        case UserRegisterFail:
        case UserloginFail:
            return {
                user: null,
                loading: false,
                error:payload
            }
        default:
            return state;
    }
}

