import React from 'react';
import { ToolbarBlock } from '.';
import { DevAddButton, DevEditButton, DevDeleteButton } from '../button';

export const CommentToolbarRootComponent = () => {    
    const buttons = [
        { buttonComponent: DevAddButton, text: 'Новый коментарий' }, { buttonComponent: DevEditButton, text: 'Изменить' }, { buttonComponent: DevDeleteButton, text: 'Удалить' }
    ];
    return (
        <div className="card-header d-flex position-relative">                    
            <ToolbarBlock buttons={buttons}/>                            
        </div>
    );
}