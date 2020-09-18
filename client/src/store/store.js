import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';


const defaultState = {
   error: {message: null}
};

// const rootReducer = combineReducers({
    
// })


export const store = createStore(
    rootReducer,
    defaultState
);