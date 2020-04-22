import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { taskActions } from '../../actions';

const mapStateToProps = (state) => {
    return {
        currRow: state.task.currentTask
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
    openTask: taskActions.openModal, setCurrent: taskActions.setCurrentTask, loadComment: taskActions.loadComment 
}, dispatch); 

export const taskCellConteinerCreator = (CellComponent) => connect(mapStateToProps, mapDispatchToProps)(CellComponent);