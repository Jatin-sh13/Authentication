import axios from 'axios'
export const setToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-header'] = token
    }
    else {
        delete axios.defaults.common['x-auth-header']
    }
}