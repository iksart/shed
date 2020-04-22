import React from 'react';

export const taskCellHandlers = (WrappedComponent) => (props) => {
    const { openTask, setCurrent, loadComment, ...restProps } = props;
    const { row: { id, idParent = -1 } = {} } = restProps; 
    const groupProps = { ...restProps, onClick: () => { setCurrent(-1); } };
    if (idParent < 0) return <WrappedComponent {...groupProps}/>;
    const cellProps = { ...restProps, onDoubleClick: () => { openTask(id); }, onClick: () => { setCurrent(id); loadComment(id); }};
    return <WrappedComponent {...cellProps}/>;
}