import React from 'react';
import { TableFilterRow } from '@devexpress/dx-react-grid-bootstrap4';

export const LocalizedFilterEditerComponent = (props) => <TableFilterRow.Editor placeholder='Фильтр...' { ...props }/>;