import React from 'react';

const styleSpan = { marginLeft: '0.5rem' };

export const TaskTreeColumnFormatterComponent = (props) => {
    const { value, selectedTask, selectTask, indeterminatedGroups, row: { id, idParent = -1 } = {} } = props;         
    const ref = elem => { 
        if (elem){
            if (idParent < 0) elem.indeterminate = indeterminatedGroups.find(item => item === id);
            elem.checked = selectedTask.find(item => item === id);
        }
    };
    return (        
        <div>
            <input type="checkbox" ref={ref} onChange={ (e) => { selectTask({ id, checked: e.target.checked }); } }/>
            <span style={styleSpan}>{value}</span>
        </div>                    
    );
}