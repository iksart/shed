import { connect } from 'react-redux';
import { defaultProps, compose } from 'recompose';
import { 
    DevTreeGrid, CellTask, GridWrapper, TaskChooserToggleButton, InputGroupSmFilterComponent, CellTaskTreeColumn, TaskHeaderComponent, TaskTreeExpandButtonComponent, 
    StandartNoDataCellComponent
} from '../../components';
import { taskSelector } from '../../selectors';
import { DevGridUtils } from '../../util';
import { taskCellConteinerCreator, TaskToolbarConteiner, TaskFormatterTreeCell, TaskCellHeaderConteiner } from '.';

const mapStateToProps = (state) => {
    return {
        rows: taskSelector.getTaskRows(state), 
        showModal: state.task.taskCardShow,
        filter: state.task.filter
    };
}

const columns = [    
    { name: 'name', title: 'Задача' },
    { name: 'control', title: 'Контроль' },
    { name: 'state', title: 'Состояние' }, 
    { name: 'priority', title: 'Важность' },
    { name: 'event', title: 'Мероприятие' },
    { name: 'author', title: 'Автор' },
    { name: 'executor', title: 'Ответственный' },
    { name: 'dateCreate', title: 'Дата создания', getCellValue: row => DevGridUtils.getDateCellValue(row.dateCreate) },
    { name: 'dateBegin', title: 'Дата начала', getCellValue: row => DevGridUtils.getDateCellValue(row.dateBegin) },
    { name: 'dateEnd', title: 'Дата завершения', getCellValue: row => DevGridUtils.getDateCellValue(row.dateEnd) },
    { name: 'dateRemind', title: 'Дата напоминания', getCellValue: row => DevGridUtils.getDateCellValue(row.dateRemind) },
    { name: 'files', title: 'Прикрепленные файлы', getCellValue: row => row.files.join(', ') },
    { name: 'project', title: 'Проект' }
];

const defaultColumnWidths = [
    { columnName: 'name', width: 450 }, 
    { columnName: 'control', width: 100 }, 
    { columnName: 'state', width: 150 }, 
    { columnName: 'priority', width: 120 }, 
    { columnName: 'event', width: 400 },
    { columnName: 'author', width: 145 },
    { columnName: 'executor', width: 145 },
    { columnName: 'dateCreate', width: 100 },
    { columnName: 'dateBegin', width: 100 },
    { columnName: 'dateEnd', width: 120 },
    { columnName: 'dateRemind', width: 135 },
    { columnName: 'files', width: 155 },
    { columnName: 'project', width: 155 }
];

const tableColumnExtensions = [
    { columnName: 'name', wordWrapEnabled: true }, 
    { columnName: 'control', align: 'center' }, 
    { columnName: 'state', align: 'center' },
    { columnName: 'priority', align: 'center' },
    { columnName: 'event', wordWrapEnabled: true },
    { columnName: 'dateCreate', align: 'center', wordWrapEnabled: true },
    { columnName: 'dateBegin', align: 'center', wordWrapEnabled: true },
    { columnName: 'dateEnd', align: 'center', wordWrapEnabled: true },
    { columnName: 'dateRemind', align: 'center', wordWrapEnabled: true },
    { columnName: 'files', wordWrapEnabled: true },
    { columnName: 'project', wordWrapEnabled: true }     
];

const tableColumnVisibilityColumnExtensions = [{ columnName: 'name', togglingEnabled: false }];

const tableFixedLeftColumns = [ 'name' ];

const tableTreeColumnFor = 'name';

const TaskCellConteiner = taskCellConteinerCreator(CellTask);

const TaskCellTreeColumnConteiner = taskCellConteinerCreator(CellTaskTreeColumn);

export const TaskGrid = compose(
    connect(mapStateToProps),
    defaultProps({         
        gridProps: { columns, rootComponent: GridWrapper },
        tableProps: { 
            columnExtensions: tableColumnExtensions, 
            cellComponent: TaskCellConteiner, 
            noDataCellComponent: StandartNoDataCellComponent 
        },
        tableColumnResizingProps: { defaultColumnWidths },        
        tableTreeColumnProps: { 
            for: tableTreeColumnFor, 
            cellComponent: TaskCellTreeColumnConteiner, 
            expandButtonComponent: TaskTreeExpandButtonComponent
        },      
        tableColumnVisibilityProps: { 
            columnExtensions: tableColumnVisibilityColumnExtensions, defaultHiddenColumnNames: ['dateCreate', 'dateBegin', 'dateRemind', 'project'] 
        },    
        tableFixedColumnsProps: { leftColumns: tableFixedLeftColumns },    
        toolbarProps: { rootComponent: TaskToolbarConteiner },       
        columnChooserProps: { toggleButtonComponent: TaskChooserToggleButton },   
        tableFilterRowProps: { 
            cellComponent: InputGroupSmFilterComponent, 
            messages: { 
                filterPlaceholder: 'Фильтр...', 
                contains: 'Содержит', 
                notContains: 'Не содержит', 
                startsWith: 'Начинается с', 
                endsWith: 'Заканчивается на', 
                equal: 'Равно', 
                notEqual: 'Не равно' 
            } 
        },
        tableHeaderRowProps: { contentComponent: TaskHeaderComponent, cellComponent: TaskCellHeaderConteiner },
        dataTypeProviderProps: { for: ['name'], formatterComponent: TaskFormatterTreeCell },
        className: 'wrapper'        
    })
)(DevTreeGrid);