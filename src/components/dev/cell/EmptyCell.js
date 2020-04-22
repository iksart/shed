import React from 'react';
import { Table } from '@devexpress/dx-react-grid-bootstrap4'; 

export const EmptyCell = (props) => { 
    const { onClick } = props;
    return <Table.Cell onClick={onClick}></Table.Cell>; 
}