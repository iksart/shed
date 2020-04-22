import React from 'react';

export const colorCell = (WrappedComponent, { rules, field }) => (props) => {
    const { className, ...restProps } = props;
    const { row = {} } = restProps;
    const value = rules[row[field]] || {};
    let componentProps = { ...restProps };
    if (!!value.className) componentProps = { ...componentProps, className: value.className(className) };
    if (!!value.style) componentProps = { ...componentProps, style: value.style };
    return <WrappedComponent { ...componentProps }/>
}