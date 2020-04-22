import React from 'react';
import { DevButton } from '..';

export const DevDeleteButton = ({ onExecute, text }) => (
    <DevButton 
        icon="trash" 
        hint="Удалить" 
        color="dark"
        text={text}
        onExecute={() => {
            // confirm            
            onExecute();        
        }}
    />
);