import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4';

export const CellTextTask = ({ className, style, ...rest }) =>     
    <Table.Cell className={className} style={style} { ...rest }/>;