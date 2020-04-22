import React from 'react';

export const colorCurrRow = (WrappedComponent, { important } = {}) => (props) => {
    const { currRow = -1, className, ...restProps } = props;
    const { row: { id } = {} } = restProps;
    return <WrappedComponent className={ currRow === id ? `${className} row-seleted${important ? '_important' : ''}` : className } { ...restProps }/>;
}