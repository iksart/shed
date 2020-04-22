import { lifecycle, compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TaskLayout } from '../../components';
import { taskActions, dictionaryActions } from '../../actions';

const mapStateToProps = (state) => {
    return {
        showCard: state.task.taskCardShow
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ loadData: taskActions.loadTask, loadDictionary: dictionaryActions.loadDictionary }, dispatch); 

export const TaskConteiner = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({        
        componentDidMount(){
            const { loadData, loadDictionary } = this.props;
            loadDictionary();
            loadData();
        }
    })
)(TaskLayout);