import axios from 'axios';
import { RouteUtil, ResponseUtil } from '../util';

const getGridData = ({ filename, add = [] }) => {
    let params = `filename=${filename}.sql`;    
    if (add.length > 0) params = add.reduce((acc,curr,index) => `${acc}&v${index + 1}=${curr}`, params);    
    return axios.get(`${RouteUtil.extractPublicUrl(process.env.PUBLIC_URL)}/SchedulerService.asmx/LoadDataJSON?${params}`)
        .then(response => {
            const resp = new ResponseUtil(response);
            return resp.getData();
        });    
}

const getDataPost = ({ param }) => {
    return axios.post(`${RouteUtil.extractPublicUrl(process.env.PUBLIC_URL)}/SchedulerService.asmx/LoadDataJSON`, { param })
        .then(response => {            
            const resp = new ResponseUtil(response);
            return resp.getData();
        });
}

const getDataGet = ({ param, conn }) => {
    let params = `param=${param}`;    
    if (conn) params = `${params}&conn=${conn}`;
    return axios.get(`${RouteUtil.extractPublicUrl(process.env.PUBLIC_URL)}/SchedulerService.asmx/LoadDataJSON?${params}`)
        .then(response => {            
            const resp = new ResponseUtil(response);
            return resp.getData();
        });
}

export const taskAPI = {
    getGridData,
    getDataGet,
    getDataPost 
}