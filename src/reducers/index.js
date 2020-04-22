import { combineReducers } from 'redux';
import { taskReducer } from './task'
import { dictionaryReducer } from './dictionary';

export default () => combineReducers({
    task: taskReducer,
    dictionary: dictionaryReducer
});