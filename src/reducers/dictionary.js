import { 
    DICTIONARY_LOAD_DOCUMENT_TO_TASK, 
    DICTIONARY_LOAD_DOCUMENTS, 
    DICTIONARY_LOAD_EVENTS, 
    DICTIONARY_LOAD_PRIORITIES,
    DICTIONARY_LOAD_PROJECTS, 
    DICTIONARY_LOAD_STATES,
    DICTIONARY_LOAD_USERS, 
    DICTIONARY_REQUEST, 
    DICTIONARY_REQUEST_END 
} from '../const';

const initialState = {
    states: [],
    priorities: [],
    events: [],
    documents: [],
    documentToTask: [],
    users: [],
    projects: []
}

export const dictionaryReducer = (state = initialState, action) => {
    switch (action.type){
        case DICTIONARY_REQUEST:
            return {
                ...state,
                requesting: true
            }
        case DICTIONARY_REQUEST_END:
            return {
                ...state,
                requesting: false
            }
        case DICTIONARY_LOAD_STATES:
            return {
                ...state,
                states: action.data
            }
        case DICTIONARY_LOAD_PRIORITIES:
            return {
                ...state,
                priorities: action.data
            }
        case DICTIONARY_LOAD_EVENTS:
            return {
                ...state,
                events: action.data
            }        
        case DICTIONARY_LOAD_DOCUMENTS:
            return {
                ...state,
                documents: action.data
            }
        case DICTIONARY_LOAD_DOCUMENT_TO_TASK:
            return {
                ...state,
                documentToTask: action.data
            }
        case DICTIONARY_LOAD_USERS:
            return {
                ...state,
                users: action.data
            }
        case DICTIONARY_LOAD_PROJECTS:
            return {
                ...state,
                projects: action.data
            }
        default:
            return state;
    }
}