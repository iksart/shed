import { 
    TASK_LOAD_COMMENTS, TASK_LOAD_DATA, TASK_REQUEST, TASK_REQUEST_END, TASK_TOGGLE_CARD_TASK, TASK_SET_CURRENT_TASK, TASK_SET_IS_NEW_TASK, TASK_SELECT_TASK, 
    TASK_SELECT_ALL_TASK, TASK_TOGGLE_FILTER
} from '../const';
import { taskAPI } from '../services';
import { DateTimeWork } from '../util';
import { taskSelector } from '../selectors';

// 'declare @iduser int set @iduser=#userid select a.id, a.idTask, a.idState, convert(float, a.[Date]) [date] from sch_ActionLogs a, sch_Task t where a.IdTask=t.Id and (t.IdUserAuthor=@iduser or t.IdUserExecutor=@iduser) and a.idState=4';
// 'declare @iduser int set @iduser=0 select a.id, a.idTask, a.idState, convert(float, a.[Date]) [date] from sch_ActionLogs a, sch_Task t where a.IdTask=t.Id and (t.IdUserAuthor=@iduser or t.IdUserExecutor=@iduser) and a.idState=4';
const paramHistory = '3233353A37243376163F3223253324763F38227625332276163F32232533246B667625333A3335227637783F327A7637783F320237253D7A7637783F3205223722337A76353938203324227E303A3937227A7637780D123722330B7F760D323722330B763024393B7625353E091735223F39381A39312576377A7625353E090237253D762276213E3324337637781F320237253D6B22781F3276373832767E22781F32032533241723223E39246B163F32232533247639247622781F3203253324132E3335232239246B163F32232533247F763738327637783F3205223722336B6256';

const setData = ({ data, history }) => ({
    type: TASK_LOAD_DATA,
    data,
    history
});

const addComments = (data) => ({
    type: TASK_LOAD_COMMENTS,
    data
});

const request = () => ({
    type: TASK_REQUEST
});

const endRequest = () => ({
    type: TASK_REQUEST_END
});

const toggleCardTask = () => ({
    type: TASK_TOGGLE_CARD_TASK
});

const setCurrentTask = (id) => ({
    type: TASK_SET_CURRENT_TASK,
    id
});

const setIsNewTask = (value) => ({
    type: TASK_SET_IS_NEW_TASK,
    value
});

const selectTask = ({ id, checked }) => ({
    type: TASK_SELECT_TASK,
    id,
    checked
});

const selectAllTask = (checked) => ({
    type: TASK_SELECT_ALL_TASK,
    checked
});

const toggleFilter = () => ({
    type: TASK_TOGGLE_FILTER
})

const convertDateTime = (item, field) => /^date/i.test(field) ? DateTimeWork.sqlDateTimeToDate(item[field]) : item[field];

const transformData = (data) => data.map(item => Object.keys(item).reduce((acc, curr) => ({ ...acc, [curr]: convertDateTime(item, curr) }), {}));

const loadTask = () => (dispatch) => {  
    dispatch(request());

    const promiseTask = taskAPI.getGridData({ filename: 'TaskGrid' });
    const promiseHistory = taskAPI.getDataGet({ param: paramHistory });    

    Promise.all([ promiseTask, promiseHistory ])
        .then(data => ({ data: transformData(data[0]), history: transformData(data[1]) }))
        .then(({ data, history }) => {
            console.log(data);            
            dispatch(endRequest());
            dispatch(setData({ data, history }));
        })
        .catch(() => {            
            dispatch(endRequest());
        });   
};

const loadComment = (id = -1) => (dispatch, getState) => {
    if (id < 0) return;

    const comments = taskSelector.getTaskComments(getState(), { idTask: id });

    if (comments.length > 0) return;

    taskAPI.getGridData({ filename: 'TaskCommentGrid', add: [id] })
        .then(data => transformData(data))
        .then(data => { dispatch(addComments(data)); });
}

const openModal = (id = -1) => (dispatch) => {    
    dispatch(setIsNewTask(id < 0));
    dispatch(toggleCardTask());
}

export const taskActions = {
    loadTask,
    loadComment,
    toggleCardTask,
    openModal,
    setCurrentTask,
    selectTask,
    selectAllTask,
    toggleFilter
};