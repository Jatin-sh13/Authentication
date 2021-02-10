import axios from 'axios'
import { AddTaskSucess, AddTaskFail, UserDataFail, UserDataSucess } from '../Types'
export const Task = (username, email, mobilenumber, address) => async dispatch => {
    try {
        const taskdata = { username, email, mobilenumber, address }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/task', taskdata, config)
        dispatch({
            type: AddTaskSucess,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AddTaskFail,
            payload: 'Server Error'
        })
        console.log(error)
    }
}
export const deletedata = (_id) => async dispatch => {
    console.log(_id)
    try {
        const { data } = await axios.delete(`/api/task/${_id}`)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
export const getuserdata = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/task')
        dispatch({
            type: UserDataSucess,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: UserDataFail,
            payload: 'server Error'
        })
        console.log(error)
    }
}