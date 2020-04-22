import React from 'react';

export const componentWrapper = (WrappedComponent, { wrapper: Wrapper }) => (props) => {
    const { wrapperClassName, ...restProps } = props;
    return (
        <Wrapper className={wrapperClassName}>
            <WrappedComponent { ...restProps }/>
        </Wrapper>
    );
}