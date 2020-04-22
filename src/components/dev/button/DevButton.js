import React from 'react';

const buttonStyle = { padding: 5 };

export const DevButton = ({ onExecute, icon, text, hint, color }) => {        
    const buttonOnClick = (e) => {         
        onExecute(); 
        e.stopPropagation(); 
    }
    const spanStyle = { marginRight: text ? 5 : 0 };    
    return (
        <button type="button" className= { `btn btn-outline-${ color ? color : 'secondary'} border-0 btn-sm` } style={ buttonStyle } onClick={ buttonOnClick } title={ hint }>
            <span className={ color || ''}>
                {icon ? <i className={`oi oi-${icon}`} style={ spanStyle } /> : null}
                {text}
            </span>
        </button>
    );
};