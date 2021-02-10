import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Auth1} from './Reducers/Auth1'
import { Adddata } from './Reducers/Task'
const reducer = combineReducers({
    user: Auth1,
    userdata: Adddata
})
const initialState = {};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store