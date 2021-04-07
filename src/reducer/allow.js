import {
    ALLOW_SUCCESS,
    ALLOW_FAIL,
    ALLOWUPDATE_SUCCESS,
    ALLOWUPDATE_RESET
} from '../actions/allow';

let initstatus = {
  loading:false,
  list:null,//表单数据
  text:'allow',
  succ:false
}

const allowReducer = (state = initstatus, action) => {
    switch(action.type) {
        case ALLOW_SUCCESS:
            return {...state, list: action.allow}
        case ALLOWUPDATE_SUCCESS:
            return {...state, succ: true}
        case ALLOWUPDATE_RESET://表单提交成功，重置标志succ为fasle
            return {...state, succ: false}
        case ALLOW_FAIL:
            return {...state, error: action.error}
    }
    return state;
}


export default allowReducer
