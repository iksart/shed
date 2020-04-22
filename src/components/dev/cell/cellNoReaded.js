import React from 'react';

export const cellNoReaded = (WrappedComponent) => (props) => {
    const { className, ...restProps } = props;
    const { row: { dateRead = 0 } = {} } = restProps;    
    return <WrappedComponent className = { +dateRead === 0 ? `${className} font-bold` : className} { ...restProps }/>;
}