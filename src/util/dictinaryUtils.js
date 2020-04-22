import { VALUE_STATE_CLOSED, VALUE_STATE_DONE } from '../const';

export class DictionaryUtils {
    static isTaskOpen(state) {
        return !(state === VALUE_STATE_CLOSED || state === VALUE_STATE_DONE);
    }
}