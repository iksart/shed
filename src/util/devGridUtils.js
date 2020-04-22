import { DateTimeWork } from '.';

export class DevGridUtils {
    static getDateCellValue (field) { 
        return field > 0 ? DateTimeWork.formatStandart(field) : ''; 
    }

    static formUserName ({ family, name, parentName, login }) {
        let userName = `${family} ${name} ${parentName}`; 
        if (!family && !name && !parentName) userName = login;
        return userName;
    }

    static getStandartOptions (data){
        return data.map(({ id, name }) => ({ value: id, label: name }));
    }

    static getChildRows(row, rows = []){
        const childRows = rows.filter(r => r.idParent === (row ? row.id : -1));    
        return childRows.length ? childRows : null;
    }
}