import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';

export const CellControlIcon = ({ value, ...rest }) => (
    <Table.Cell className={ value ? 'text-warning' : 'text-secondary' } { ...rest }>
        <i className={`oi oi-star`}/>          
    </Table.Cell>
);