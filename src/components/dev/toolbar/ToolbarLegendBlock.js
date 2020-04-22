import React from 'react';
import { DevButtonWrapper } from '../../wrapper';

export const ToolbarLegendBlock = ({ buttons = [] }) => (
    <React.Fragment>
        { 
            buttons.map(({ title, color }, index) => 
                (
                    <DevButtonWrapper key={index} cursor='pointer' title={title}>
                        <div className={`btn btn-${color} btn-sm`}>
                            <span>&nbsp;</span>
                        </div>
                    </DevButtonWrapper>    
                )
            ) 
        }
    </React.Fragment>    
);