import React from 'react';
import { 
    Grid, TableHeaderRow, TableColumnResizing, TableTreeColumn, TableColumnVisibility, ColumnChooser, Toolbar, VirtualTable, TableFixedColumns, TableFilterRow 
} from '@devexpress/dx-react-grid-bootstrap4';
import { SelectionState, TreeDataState, CustomTreeData, IntegratedSelection, FilteringState, DataTypeProvider, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { DevGridUtils } from '../../../util';

const getRowId = (row) => row.id;

export const DevTreeGrid = ({ 
    rows = [], gridProps = {}, tableProps = {}, tableColumnResizingProps = {}, tableTreeColumnProps = {},  tableColumnVisibilityProps = {}, className = '', 
    tableFixedColumnsProps = {}, toolbarProps = {}, columnChooserProps = {}, tableFilterRowProps = {}, tableHeaderRowProps = {}, dataTypeProviderProps, filter = false    
}) => {    
    const gridPropsNew = { rows, ...gridProps, getRowId };
    const tablePropsNew = { height: 'auto', ...tableProps };
    const customTreeDataProps = { getChildRows: DevGridUtils.getChildRows };    
    const tableTreeColumnPropsNew = { ...tableTreeColumnProps, showSelectionControls: false, showSelectAll: true };     
    const wrapperClassName = `card ${className}`;    
    const { leftColumns } = tableFixedColumnsProps;
    const tableFixedColumnsPropsNew = { ...tableFixedColumnsProps, leftColumns: [ ...leftColumns ] };           
    return (        
        <div className={ wrapperClassName }>
            <Grid { ...gridPropsNew }>                
                { dataTypeProviderProps && <DataTypeProvider { ...dataTypeProviderProps }/> }
                <TreeDataState />
                <SelectionState/>
                <FilteringState defaultFilters={[]}/>
                <CustomTreeData { ...customTreeDataProps }/>

                <IntegratedSelection />
                <IntegratedFiltering/>

                <VirtualTable { ...tablePropsNew }/>                
                <TableColumnVisibility { ...tableColumnVisibilityProps }/>
                <TableColumnResizing { ...tableColumnResizingProps }/>                  
                <TableHeaderRow { ...tableHeaderRowProps }/>               
                { filter && <TableFilterRow showFilterSelector { ...tableFilterRowProps }/> }               
                <TableTreeColumn { ...tableTreeColumnPropsNew }/>                                
                <TableFixedColumns { ...tableFixedColumnsPropsNew }/>

                <Toolbar { ...toolbarProps }/>
                <ColumnChooser { ...columnChooserProps }/>                
            </Grid>            
        </div>        
    );
}