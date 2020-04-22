import { connect } from 'react-redux';
import { defaultProps, compose } from 'recompose';
import { DevGrid, GridWrapper, CommentsNoDataCellComponent, CommentToolbarRootComponent } from '../../components';
import { taskSelector } from '../../selectors';
import { DevGridUtils } from '../../util';

const mapStateToProps = (state) => {
    const { task: { currentTask: idTask } = {} } = state;
    return {
        rows: taskSelector.getTaskComments(state, { idTask })
    };
}

const mapStateToPropsNoDataCell = (state) => {
    const { task: { currentTask } = {} } = state;
    return {
        currentTask
    }
}

const columns = [    
    { name: 'comment', title: 'Коментарий' },
    { name: 'date', title: 'Дата', getCellValue: (row) => DevGridUtils.getDateCellValue(row.date) },
    { name: 'user', title: 'Пользователь' }
];

const tableColumnExtensions = [
    { columnName: 'comment', wordWrapEnabled: true }, 
    { columnName: 'date', align: 'center' }
];

const defaultColumnWidths = [
    { columnName: 'comment', width: 400 }, 
    { columnName: 'date', width: 100 },
    { columnName: 'user', width: 200 }
];

export const TaskCommentGridConteiner = compose(
    connect(mapStateToProps),
    defaultProps({ 
        className: 'wrapper', 
        gridProps: { columns, rootComponent: GridWrapper }, 
        tableProps: { columnExtensions: tableColumnExtensions, noDataCellComponent: connect(mapStateToPropsNoDataCell)(CommentsNoDataCellComponent) },        
        tableColumnResizingProps: { defaultColumnWidths },
        toolbarProps: { rootComponent: CommentToolbarRootComponent }        
    })
)(DevGrid);