import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';

export const StandartNoDataCellComponent = (props) => {
    const { getMessage, ...rest } = props;    
    return <Table.NoDataCell getMessage={() => 'Нет данных'} { ...rest }/>;
}