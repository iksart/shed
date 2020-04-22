import React from 'react';
import { ColumnChooser } from '@devexpress/dx-react-grid-bootstrap4';

const style = { padding: '5px' }; 

export const TaskChooserToggleButton = (props) => <ColumnChooser.ToggleButton className='btn-sm btn-outline-dark' style={style} { ...props } />;