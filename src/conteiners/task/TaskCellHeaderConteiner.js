import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CellTaskHeader } from '../../components';
import { taskSelector } from '../../selectors';
import { taskActions } from '../../actions';

const mapStateToProps = (state) => {
    return {
        selectAllStatus: taskSelector.getSelectAllStatus(state)
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectAll: taskActions.selectAllTask }, dispatch);

export const TaskCellHeaderConteiner = connect(mapStateToProps, mapDispatchToProps)(CellTaskHeader);