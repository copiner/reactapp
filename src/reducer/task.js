import {
  TASK_SUCCESS,
  TASKUPLOAD_SUCCESS,
  TASKSUBMIT_SUCCESS,
  TASKDETAIL_SUCCESS,
  TASKOPEN_SUCCESS,
  TASKEXPORT_SUCCESS,
  TASK_FAIL
} from '../actions/task';

let initstatus = {
  list:null,
  text:'task',
  upload:{
    custCnt:"0"
  },
  detail:null,
  succ:false
}

const taskReducer = (state = initstatus, action) => {

    switch(action.type) {
        case TASK_SUCCESS:
            return {...state, succ:false, list:action.task}
        case TASKUPLOAD_SUCCESS:
            return {...state, upload: action.upload}
        case TASKSUBMIT_SUCCESS:
            return {...state, succ:true}
        case TASKDETAIL_SUCCESS:
            return {...state,detail:action.detail}
        case TASKOPEN_SUCCESS:
            return {...state}
        case TASKEXPORT_SUCCESS:
            return {...state, succ:true}
        case TASK_FAIL:
            return {...state, error: action.error}
    }
    return state;
};

export default taskReducer;
