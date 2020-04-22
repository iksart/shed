import { 
    TASK_LOAD_COMMENTS, TASK_LOAD_DATA, TASK_REQUEST, TASK_REQUEST_END, TASK_TOGGLE_CARD_TASK, TASK_SET_CURRENT_TASK, TASK_SET_IS_NEW_TASK, TASK_SELECT_TASK, 
    TASK_SELECT_ALL_TASK, TASK_TOGGLE_FILTER
} from '../const';
import { DevGridUtils } from '../util';

const initialState = {
    data: [],
    comments: [],
    history: [],
    selectedTask: [],
    indeterminatedGroups: [],
    filter: false
};

export const taskReducer = (state = initialState, action) => {

    const getChildRows = (row) => DevGridUtils.getChildRows(row, state.data) || [];

    const findRow = (id) => state.data.find(item => item.id === id) || {};
    
    switch (action.type){
        case TASK_REQUEST:
            return { 
                ...state,
                requesting: true
            };
        case TASK_REQUEST_END:
            return {
                ...state,
                requesting: false
            };
        case TASK_LOAD_COMMENTS:
            return {
                ...state,
                comments: [ ...state.comments, ...action.data ]
            };
        case TASK_LOAD_DATA:            
            return {
                ...state,                
                data: action.data,
                history: action.history    
            };
        case TASK_TOGGLE_CARD_TASK:
            return {
                ...state,
                taskCardShow: !state.taskCardShow
            }
        case TASK_SET_CURRENT_TASK:
            if (state.currentTask === action.id) return state;            
            return {
                ...state,
                currentTask: action.id
            };
        case TASK_SET_IS_NEW_TASK:
            return {
                ...state,
                isNewTask: action.value
            }
        case TASK_SELECT_TASK:
            const row = findRow(action.id);
            const { idParent = -1 } = row;      
            const parent = findRow(idParent);
            const children = getChildRows(row);            
            const parentChildren = getChildRows(parent);
            const parentChildrenSelected = parentChildren.reduce((acc,cur) => state.selectedTask.find(item => item === cur.id) ? ++acc : acc, 0);            
            let allIds = [ action.id, ...children.map(({ id }) => id) ];
            const includeParent = action.checked && parentChildren.length === parentChildrenSelected + 1 || !action.checked && parentChildrenSelected - 1 === 0;
            if (parentChildren.length > 0 && includeParent){
                allIds = [ ...allIds, idParent ];
            }
            const deleteGroup = (id) => [ ...state.indeterminatedGroups.filter(item => item !== id) ];
            return {
                ...state,
                selectedTask: action.checked ? allIds.reduce((acc, cur) => acc.find(item => item === cur) ? acc : [ ...acc, cur ] , [ ...state.selectedTask ]) : 
                    [ ...state.selectedTask.filter(item => !allIds.find(id => id === item)) ],
                indeterminatedGroups: idParent < 0 ? deleteGroup(action.id) : 
                    includeParent ? deleteGroup(idParent) : 
                    state.indeterminatedGroups.find(item => item === idParent) ? state.indeterminatedGroups : [ ...state.indeterminatedGroups, idParent ]
            }
        case TASK_SELECT_ALL_TASK:
            return {
                ...state,
                selectedTask: action.checked ? state.data.map(({ id }) => id) : [],
                indeterminatedGroups: []
            };
        case TASK_TOGGLE_FILTER:
            return {
                ...state,
                filter: !state.filter
            }
        default:
            return state;
    }
}