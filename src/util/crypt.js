export class Crypt {
    static crypt(str = ''){
        let xorCode = Math. round (Math.random() * 255,0);
        let result = str.split("").reduce((acc,cur)=>{
            let code = cur.charCodeAt(0);
            if (code>1039) code -= 848;
            code = code ^ xorCode;
            return acc.toString() + (code.toString(16).lenght < 2 ? "0" :"") + code.toString(16); 
        }, "");   
        return result + (xorCode.toString(16).length < 2 ? "0" : "") + xorCode.toString(16);
    }
}