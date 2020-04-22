import { 
    DICTIONARY_LOAD_DOCUMENT_TO_TASK, 
    DICTIONARY_LOAD_EVENTS, 
    DICTIONARY_LOAD_PRIORITIES, 
    DICTIONARY_LOAD_PROJECTS,
    DICTIONARY_LOAD_STATES, 
    DICTIONARY_LOAD_USERS,
    DICTIONARY_REQUEST, 
    DICTIONARY_REQUEST_END, 
    DICTIONARY_LOAD_DOCUMENTS 
} from '../const';
import { taskAPI } from '../services';
import { DevGridUtils } from '../util';

// select [Key] id, Value [name] from sch_Dictionary where [Type]=1
const paramStates = 'D2C4CDC4C2D581FAEAC4D8FC81C8C58D81F7C0CDD4C481FACFC0CCC4FC81C7D3CECC81D2C2C9FEE5C8C2D5C8CECFC0D3D881D6C9C4D3C481FAF5D8D1C4FC9C90A1';

// select [Key] id, Value [name] from sch_Dictionary where [Type]=2
const paramPriorities = '584E474E485F0B70604E52760B424F070B7D4A475E4E0B70454A464E760B4D5944460B584843746F42485F4244454A59520B5C434E594E0B707F525B4E7616192B';

// select idEvent id, NameEvent [name], TypeObj typeobj, TypeEvent [type] from ManualEvent where TypeEvent in (1)
const paramEvents = 'BDABA2ABADBAEEA7AA8BB8ABA0BAEEA7AAE2EE80AFA3AB8BB8ABA0BAEE95A0AFA3AB93E2EE9AB7BEAB81ACA4EEBAB7BEABA1ACA4E2EE9AB7BEAB8BB8ABA0BAEE95BAB7BEAB93EEA8BCA1A3EE83AFA0BBAFA28BB8ABA0BAEEB9A6ABBCABEE9AB7BEAB8BB8ABA0BAEEA7A0EEE6FFE7CE';

// select id, name from sch_Document
const paramDocuments = '70666F666077236A672F236D626E662365716C6E2370606B5C476C60766E666D7703';

// select idTask, idDocument from sch_DocumentToTask
const paramDocumnetToTask = '30262F262037632A27172230286F632A27072C20362E262D376325312C2E6330202B1C072C20362E262D37172C1722302843';

// select UserId id, isnull(UserFamily, '') family, isnull(UserName, '') name, isnull(UserParentName, '') parentName, isnull(UserLogin, '') [login] from Users
const paramUsers = '52444D444255017452445368450148450D0148524F544D4D097452445367404C484D580D010606080147404C484D580D0148524F544D4D09745244536F404C440D01060608014F404C440D0148524F544D4D0974524453714053444F556F404C440D0106060801514053444F556F404C440D0148524F544D4D09745244536D4E46484F0D01060608017A4D4E46484F7C0147534E4C01745244535221';

// select id, name, isnull(BranchId, -1) branchId, isnull(typeobj, -1) typeobj, isnull(idobj, -1) idobj from sch_Project
const paramProjects = '94828B828493C78E83CBC789868A82CBC78E9489928B8BCFA5958689848FAE83CBC7CAD6CEC785958689848FAE83CBC78E9489928B8BCF939E978288858DCBC7CAD6CEC7939E978288858DCBC78E9489928B8BCF8E8388858DCBC7CAD6CEC78E8388858DC78195888AC794848FB8B795888D828493E7';

const request = () => ({
    type: DICTIONARY_REQUEST
});

const requestEnd = () => ({
    type: DICTIONARY_REQUEST_END
});

const setStatesDictionary = (data) => ({
    type: DICTIONARY_LOAD_STATES,
    data
});

const setPriorities = (data) => ({
    type: DICTIONARY_LOAD_PRIORITIES,
    data
});

const setEvents = (data) => ({
    type: DICTIONARY_LOAD_EVENTS,
    data
});

const setDocuments = (data) => ({
    type: DICTIONARY_LOAD_DOCUMENTS,
    data
});

const setDocumentToTask = (data) => ({
    type: DICTIONARY_LOAD_DOCUMENT_TO_TASK,
    data
});

const setUsers = (data) => ({
    type: DICTIONARY_LOAD_USERS,    
    data
});

const setProjects = (data) => ({
    type: DICTIONARY_LOAD_PROJECTS,
    data
})

const loadDictionary = () => (dispatch) => {
    dispatch(request());   

    const params = [
        { param: paramStates, out: 'states' }, 
        { param: paramPriorities, out: 'priorities' }, 
        { param: paramEvents, conn: 'LognullConnString', out: 'events' }, 
        { param: paramDocuments, out: 'documents' }, 
        { param: paramDocumnetToTask, out: 'documentToTask' }, 
        { param: paramUsers, conn: 'ConnectionString', out: 'users', handler: (data) => data.map(({ id, ...rest }) => ({ id, name: DevGridUtils.formUserName(rest) })) },
        { param: paramProjects, out: 'projects' }        
    ];
    
    const promises = params.map(({ param, conn }) => taskAPI.getDataGet({ param, conn }));

    Promise.all(promises)
        .then(data => 
            data.reduce((acc, curr, index) => {
                const { out, handler } = params[index];
                return { ...acc, [out]: handler ? handler(curr) : curr };
            }, {})
        )
        .then(({ states, priorities, events, documents, documentToTask, users, projects }) => {            
            dispatch(setStatesDictionary(states));
            dispatch(setPriorities(priorities));
            dispatch(setEvents(events));
            dispatch(setDocuments(documents));
            dispatch(setDocumentToTask(documentToTask));
            dispatch(setUsers(users));            
            dispatch(setProjects(projects));
            dispatch(requestEnd());
        })
        .catch(() => {
            dispatch(requestEnd());
        });
}

export const dictionaryActions = {
    loadDictionary
}