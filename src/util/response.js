export class ResponseUtil {
    constructor(response){
        this.response = response;
    }

    getData(){
        const { data } = this.response;
        return data;
    }
}