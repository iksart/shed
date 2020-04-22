import React from 'react';
import { TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import { TaskCheckAllWrapper } from '../../wrapper';

export const CellTaskHeader = (props) => {    
    const { selectAllStatus, selectAll, ...rest } = props;
    const { children, column: { name } = {} } = rest;
    const ref = elem => {
        if (elem){
            elem.indeterminate = selectAllStatus < 0;
            elem.checked = selectAllStatus === 1;
        }
    };
    if (name === 'name') 
        return (
            <TableHeaderRow.Cell { ...rest }>
                <TaskCheckAllWrapper>
                    <input type="checkbox" ref={ref} onChange={ (e) => { selectAll(e.target.checked); } }/>
                </TaskCheckAllWrapper>
                { children }
            </TableHeaderRow.Cell>
        );
    return <TableHeaderRow.Cell { ...rest }/>;
}