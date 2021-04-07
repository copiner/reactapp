import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Task from '../component/task';

import * as taskAct from '../actions/task'

const mapStateToProps  = (state) => ({
     taskList: state.task
});

const mapDispatchToProps = (dispatch) => ({
  taskAct: bindActionCreators(taskAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Task);
