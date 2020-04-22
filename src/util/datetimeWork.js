import moment from 'moment';

const SQL_DATETIME_DIF = 25569 - 2;
const MS_IN_DAY = 86400000;

export class DateTimeWork {
    static sqlDateTimeToMs (date) {
        const d = new Date((date - SQL_DATETIME_DIF) * MS_IN_DAY);
        return (+d + d.getTimezoneOffset() * 60000);
    };

    static sqlDateTimeToDate (date) {
        let ms = this.sqlDateTimeToMs(date);
        if (ms < 0) ms =0;
        return new Date(ms);
    }

    static formatStandart (date) {
        return moment(date).format('DD.MM.YYYY');
    }

    static compareDates (first, second) {
        const mFirst = moment(first);        
        const mSecond = moment(second);        
        return mFirst.year() === mSecond.year() && mFirst.month() === mSecond.month() && mFirst.date() === mSecond.date();        
    }

    static diffDates (first, second, format){   
        const mFirst = moment(first);        
        const mSecond = moment(second);      
        const diff = moment.duration(mFirst.diff(mSecond));        
        if (format === 'weeks') return diff.asWeeks();
        return diff;
    }

    static diffOnlyDates(first, second, format){
        let mFirst = moment(first);                
        mFirst = moment([mFirst.year(), mFirst.month(), mFirst.date()]);
        let mSecond = moment(second);    
        mSecond = moment([mSecond.year(), mSecond.month(), mSecond.date()]);
        return mFirst.diff(mSecond, format);
    }
}