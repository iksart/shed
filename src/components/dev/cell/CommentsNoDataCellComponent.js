import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';

export const CommentsNoDataCellComponent = (props) => {
    const { getMessage, currentTask = -1, dispatch, ...rest } = props;    
    return <Table.NoDataCell getMessage={() => currentTask < 0 ? 'Не выбрана задача' : 'Нет данных'} { ...rest }/>;
}