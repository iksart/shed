export class RouteUtil {    
    static extractPublicUrl(url){
        const values = url.split('/');
        if (values.length < 2) return url;
        return `/${values[0] === '' ? values [1] : values[0]}`;
    }
}