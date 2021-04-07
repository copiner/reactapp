import {
  KIND_SUCCESS,
  KIND_FAIL,
  KINDUPDATE_SUCCESS,
} from '../actions/kind';

let initstatus = {
  loading:false,
  list:null,//表单数据
  text:'kind'
}

const kindReducer = (state = initstatus, action) => {

    switch(action.type) {
        case KINDUPDATE_SUCCESS:
            return {...state}
        case KIND_SUCCESS:
            return {...state, list: action.kind}
        case KIND_FAIL:
            return {...state, error: action.error}
    }
    return state;
};

export default kindReducer;
