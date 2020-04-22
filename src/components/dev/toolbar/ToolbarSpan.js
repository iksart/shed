import React from 'react';
import { DevSpanToolbarWrapper } from '../../wrapper';

export const ToolbarSpan = ({ className, title, text = '' }) => {
    const wrapperProps = { className, title };
    return (
        <DevSpanToolbarWrapper { ...wrapperProps }>
            <span>{text}</span>
        </DevSpanToolbarWrapper> 
    );
}