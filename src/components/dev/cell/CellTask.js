import React from 'react';
import { CellControlIcon, CellTextTask, cellNoReaded, EmptyCell, colorCell, taskCellHandlers, colorCurrRow, removeCellProps } from '.';
import { classNameWrapper } from '../../wrapper';
import { compose } from 'recompose';
import Color from 'color';
import { 
    BST_SUCCESS_COLOR, VALUE_STATE_CLOSED, VALUE_STATE_IN_WORK, VALUE_STATE_PAUSE, VALUE_STATE_DONE, VALUE_PRIORITY_HIGH, VALUE_PRIORITY_NORM, VALUE_PRIORITY_LOW 
} from '../../../const'; 

const success = Color(BST_SUCCESS_COLOR);
const light = success.lighten(1);
const dark = success.darken(0.3);

const styleInWork = { backgroundColor: light };
const styleDone = { backgroundColor: dark }; 

const stateRules = {
    [VALUE_STATE_CLOSED]: { className: (className) => `${className} bg-secondary` },
    [VALUE_STATE_DONE]: { style: styleDone },
    [VALUE_STATE_IN_WORK]: { style: styleInWork },
    [VALUE_STATE_PAUSE]: { className: (className) => `${className} bg-warning` }
};

const priorityRules = {
    [VALUE_PRIORITY_HIGH]: { className: (className) => `${className} bg-danger` },
    [VALUE_PRIORITY_NORM]: { className: (className) => `${className} bg-success` },
    [VALUE_PRIORITY_LOW]: { className: (className) => `${className} bg-warning` }
};

const StandartCell = compose(classNameWrapper, cellNoReaded, taskCellHandlers, colorCurrRow)(CellTextTask, { addClassName: 'line-height_tight-middle' });

const StateCell = colorCell(StandartCell, { rules: stateRules, field: 'idState' });

const PriorityCell = colorCell(StandartCell, { rules: priorityRules, field: 'idPriority' });

const CellControlIconHandlers = compose(taskCellHandlers, colorCurrRow)(CellControlIcon);

const EmptyCellHandlers = compose(taskCellHandlers, removeCellProps)(EmptyCell, { removed: ['currRow'] });

export const CellTask = (props) => {        
    const { column, row: { idParent } = {} } = props;     
    if (idParent < 0) return <EmptyCellHandlers {...props}/>;          
    if (column.name === 'control') return <CellControlIconHandlers { ...props }/>;                    
    if (column.name === 'state') return <StateCell { ...props }/>;
    if (column.name === 'priority') return <PriorityCell { ...props }/>;
    return <StandartCell { ...props }/>;
}