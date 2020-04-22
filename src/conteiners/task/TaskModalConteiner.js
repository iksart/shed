import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { taskActions } from '../../actions'
import { TaskModal } from '../../components';
import { compose, withStateHandlers } from 'recompose';
import { taskSelector } from '../../selectors';

const mapStateToProps = (state) => {
    const { task: { currentTask = -1, isNewTask } = {} } = state;
    return {        
        showModal: state.task.taskCardShow,
        title: currentTask < 0 ? 'Новая задача': 'Редактирование задачи',
        currentTask: taskSelector.getCurrentTask(state, { idTask: isNewTask ? -1 : currentTask }),
        users: state.dictionary.users,
        states: state.dictionary.states,
        priorities:state.dictionary.priorities,
        projects: state.dictionary.projects,
        events: state.dictionary.events,
        files: taskSelector.getTaskDocuments(state, { idTask: currentTask })
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggle: taskActions.toggleCardTask }, dispatch); 

export const TaskModalConteiner = compose(
    connect(mapStateToProps, mapDispatchToProps), 
    withStateHandlers(
        ({ currentTask, files }) => ({ currTask: currentTask, filesState: files }), 
        { toggleRemind: ({ currTask = {} }) => () => ({ currTask: { ...currTask, isRemind: !currTask.isRemind } }) }
    )    
)(TaskModal);