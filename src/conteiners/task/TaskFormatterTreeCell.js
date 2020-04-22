import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TaskTreeColumnFormatterComponent } from '../../components';
import { taskActions } from '../../actions';

const mapStateToProps = (state) => {
    return {
        selectedTask: state.task.selectedTask,
        indeterminatedGroups: state.task.indeterminatedGroups
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectTask: taskActions.selectTask }, dispatch);

export const TaskFormatterTreeCell = connect(mapStateToProps, mapDispatchToProps)(TaskTreeColumnFormatterComponent);