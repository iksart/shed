export class Transformation {
    static toLowerFirst(value = ''){
        return value.replace(/^./, (match) => match.toLowerCase());
    }
}