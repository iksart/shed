import React from 'react';

export const classNameWrapper = (WrappedComponent, { addClassName = ''} = {} ) => (props) => {
    const { className = '', ...restProps } = props;    
    return <WrappedComponent className={ `${className} ${addClassName}` } { ...restProps }/>;
}