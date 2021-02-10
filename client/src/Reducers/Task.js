import { AddTaskFail, AddTaskSucess, UserDataSucess, UserDataFail } from '../Types'
const initialstate = {
    userdata: null,
    loading: true,
}
export const Adddata = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case AddTaskSucess:
        case UserDataSucess:
            return {
                ...state,
                loading: false,
                userdata: payload
            }
        case AddTaskFail:
        case UserDataFail:
            return {
                ...state,
                userdata: null,
                loading: true
            }
        default:
            return state
    }
}