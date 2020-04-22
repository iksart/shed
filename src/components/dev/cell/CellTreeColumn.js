import React from 'react';
import { TableTreeColumn } from '@devexpress/dx-react-grid-bootstrap4';

export const CellTreeColumn = (props) => {
    const { className, ...rest } = props;     
    return <TableTreeColumn.Cell className={className} { ...rest }/>;
}