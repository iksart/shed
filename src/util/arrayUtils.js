export class ArrayUtils{
    static min(values = []){ 
        return values.reduce((a, b) => a < b ? a : b); 
    }

    static max(values = []){ 
        return values.reduce((a, b) => a > b ? a : b, undefined); 
    }
}