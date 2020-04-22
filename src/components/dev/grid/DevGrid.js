import React from 'react';
import { Grid, VirtualTable, TableHeaderRow, TableSelection, TableColumnResizing, Toolbar } from '@devexpress/dx-react-grid-bootstrap4';
import { SelectionState } from '@devexpress/dx-react-grid';

export const DevGrid = ({ className = '', gridProps = {}, rows = [], tableProps = {}, tableColumnResizingProps = {}, toolbarProps = {} }) => {
    const wrapperClassName = `card ${className}`;
    const gridPropsNew = { rows, ...gridProps };
    const tablePropsNew = { height: 'auto', ...tableProps };        
    return (
        <div className={ wrapperClassName }>
            <Grid { ...gridPropsNew }>
                <SelectionState />                

                <VirtualTable { ...tablePropsNew }/>
                <TableColumnResizing { ...tableColumnResizingProps }/>
                <TableHeaderRow/>                
                <TableSelection selectByRowClick highlightRow /> 

                <Toolbar { ...toolbarProps }/>
            </Grid>
        </div>
    );
}