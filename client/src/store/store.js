import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';


const defaultState = {
    polls: [],
    user: {
        current: {},
        loggedIn: false
    }
};

// const rootReducer = combineReducers({
    
// })