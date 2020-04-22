import React from 'react';
import { CellTreeColumn, cellNoReaded, colorCellByTime, taskCellHandlers, colorCurrRow, removeCellProps } from '.';
import { classNameWrapper } from '../../wrapper';
import { compose } from 'recompose';

const GeneralCellTreeColumn = compose(classNameWrapper, taskCellHandlers)(CellTreeColumn, { addClassName: 'line-height_tight-middle' });
const ItemCellTreeColumn = compose(cellNoReaded, colorCurrRow, colorCellByTime)(GeneralCellTreeColumn, {  important: true });
const GroupCellTreeColumn = removeCellProps(GeneralCellTreeColumn, { removed: ['currRow'] });

export const CellTaskTreeColumn = (props) => {    
    const { row: { idParent } = {} } = props;     
    if (idParent < 0) return <GroupCellTreeColumn { ...props }/>;      
    return <ItemCellTreeColumn { ...props }/>;
}