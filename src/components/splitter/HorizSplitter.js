import React from 'react';
import { SplitterWrapper } from '.';
import SplitPane from 'react-split-pane';

export const HorizSplitter = ({ children }) => (
    <SplitterWrapper>
        <SplitPane split="horizontal" defaultSize="70%">
            { children }
        </SplitPane>
    </SplitterWrapper>
);