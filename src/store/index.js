import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from '../reducers';

export const configureStore = (preloadedState = {}) => createStore(
    createRootReducer(),
    preloadedState,
    compose(applyMiddleware(thunkMiddleware))
);