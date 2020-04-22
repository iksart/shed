import React from 'react';
import { FilterComponentWrapper } from '../../wrapper';

export const InputGroupSmFilterComponent = (props) => {      
    const { children, column } = props;         
    const className = column.name==='name' ? "border-right dx-g-bs4-fixed-cell position-sticky" : '';
    return (
        <FilterComponentWrapper className={ className } colspan="1">
            <div className="input-group input-group-sm">
                { children }
            </div>
        </FilterComponentWrapper>
    );        
}