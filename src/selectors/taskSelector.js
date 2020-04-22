import { createSelector } from 'reselect';

const statesDictionarySelector = (state) => state.dictionary.states;
const prioritiesDictionarySelector = (state) => state.dictionary.priorities;
const eventsDictionarySelector = (state) => state.dictionary.events;
const documentsDictionarySelector = (state) => state.dictionary.documents;
const documentToTaskDictionarySelector = (state) => state.dictionary.documentToTask;
const usersDictionarySelector = (state) => state.dictionary.users;
const projectsDictionarySelector = (state) => state.dictionary.projects;

const taskDataSelector = (state) => state.task.data;
const taskCommentsSelector = (state) => state.task.comments;
const taskHistorySelector = (state) => state.task.history;
const taskSelectedTaskSelector = (state) => state.task.selectedTask;

const idTaskSelector = (state, props) => props.idTask;

const simpleFind = (data, id) => data.find(item => item.id === id) || {};

const getTaskRows = createSelector(
    statesDictionarySelector,
    prioritiesDictionarySelector,
    eventsDictionarySelector,
    documentsDictionarySelector,
    documentToTaskDictionarySelector,
    taskHistorySelector,
    usersDictionarySelector,
    projectsDictionarySelector,
    taskDataSelector,
    (states = [], priorities = [], events = [], documents = [], documentToTask = [], history = [], users = [], projects = [], data = []) => data.map(item => {
        const { idState = -1, idPriority = -1, idEvent = -1, id, idAuthor, idExecutor, idProject } = item;                        
        const files = documentToTask.reduce((acc, curr) => {
            const { idTask, idDocument } = curr;
            if (idTask === id){
                const documentItem = simpleFind(documents, idDocument);
                if (documentItem) acc = [ ...acc, documentItem.name ];
            }
            return acc;
        }, []);     
        const historyDone = history.find(item => item.idTask === id) || {};           
        return {
            ...item,
            state: simpleFind(states, idState).name,
            priority: simpleFind(priorities, idPriority).name,
            event: simpleFind(events, idEvent).name,
            files,
            project: simpleFind(projects, idProject).name,
            dateDone: historyDone.date,
            author: simpleFind(users, idAuthor).name,
            executor: simpleFind(users, idExecutor).name
        }
    })
);

const getCurrentTask = createSelector(
    taskDataSelector,
    idTaskSelector,
    (data = [], id = -1) => data.find(item => item.id === id)
);

const getTaskComments = createSelector(
    taskCommentsSelector,
    usersDictionarySelector,
    idTaskSelector,
    (comments = [], users = [], id) => comments.filter(item => item.idTask === id).map(item => {
        const { idUser } = item;
        return {
            ...item,
            user: simpleFind(users, idUser).name
        };
    })
);

const getTaskDocuments = createSelector(
    documentsDictionarySelector,
    documentToTaskDictionarySelector,
    idTaskSelector,
    (documents = [], documentToTask = [], id) => documentToTask.reduce((acc, curr) => {
        const { idTask, idDocument } = curr;
        if (idTask === id){
            const documentItem = simpleFind(documents, idDocument);
            if (documentItem) acc = [ ...acc, documentItem.name ];
        }
        return acc;
    }, [])
);

const getSelectAllStatus = createSelector(
    taskDataSelector,
    taskSelectedTaskSelector,
    (data = [], selectedTask = []) => selectedTask.length === 0 ? 0 : data.length === selectedTask.length ? 1 : -1
);

export const taskSelector = {
    getCurrentTask,
    getTaskRows,
    getTaskComments,
    getTaskDocuments,
    getSelectAllStatus
}