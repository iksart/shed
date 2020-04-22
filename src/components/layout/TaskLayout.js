import React from 'react';
import { TaskCommentGridConteiner, TaskGrid, TaskModalConteiner } from '../../conteiners';
import { HorizSplitter } from '../splitter';
import { TaskBlock } from '.';
import './TaskLayout.css';

export const TaskLayout = ({ showCard }) => {         
    return (
        <HorizSplitter>            
            <TaskBlock>
                <TaskGrid />
                { showCard && <TaskModalConteiner/> }
            </TaskBlock>   
            <TaskBlock>
                <TaskCommentGridConteiner />    
            </TaskBlock>                 
        </HorizSplitter>
    );
}