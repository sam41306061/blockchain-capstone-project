import { configureStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/* IMPORT REDUCERS */ 
import {provider} from '.reducers'

const reducer = combineReducers({
    provider
})

const initialState = {}

const middleware = [thunk]

const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;