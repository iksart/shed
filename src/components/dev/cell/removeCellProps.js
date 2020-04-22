import React from 'react';

export const removeCellProps = (WrappedComponent, { removed = [] }) => (props) => {
    const cellProps = Object.keys(props).reduce((acc,curr) => removed.find(item => item === curr) ? acc : { ...acc, [curr]: props[curr] }, {});
    return <WrappedComponent { ...cellProps }/>;
};