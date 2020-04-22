import React from 'react';
import { DevButton } from '../button';
import { DevButtonWrapper } from '../../wrapper';

export const ToolbarBlock = ({ buttons = [] }) => (
    <React.Fragment>
        {
            buttons.map(
                (props, index) => {
                    const { buttonComponent: ButtonComponent = DevButton, wrapperProps = {}, ...restProps } = props;                    
                    return (
                        <DevButtonWrapper key={index} { ...wrapperProps }>
                            <ButtonComponent color="dark" { ...restProps }/>
                        </DevButtonWrapper>
                    );
                }
            )        
        }
    </React.Fragment>
);
