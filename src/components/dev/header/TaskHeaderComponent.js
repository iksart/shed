import { classNameWrapper } from '../../wrapper';
import { TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';

export const TaskHeaderComponent = classNameWrapper(TableHeaderRow.Content, { addClassName: 'line-height_tight' });