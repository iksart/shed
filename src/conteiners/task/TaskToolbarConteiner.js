import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { taskActions } from '../../actions';
import { TaskToolbarRootComponent } from '../../components';

const mapDispatchToProps = (dispatch) => bindActionCreators({ openTask: taskActions.openModal, toggleFilter: taskActions.toggleFilter }, dispatch); 

export const TaskToolbarConteiner = connect(null, mapDispatchToProps)(TaskToolbarRootComponent);