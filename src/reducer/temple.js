import {
  TEMPLE_START,
  TEMPLE_SUCCESS,
  TEMPLEUPDATE_SUCCESS,
  TEMPLE_FAIL
} from '../actions/temple';

let initstatus = {
  loading:false,
  list:null,//表单数据
  text:'temple',
  succ:false
}


const templeReducer = (state=initstatus, action) => {

    switch(action.type) {
        case TEMPLE_SUCCESS:
            return {...state, succ:false, list: action.temple}
        case TEMPLEUPDATE_SUCCESS:
            return {...state, succ:true}
        case TEMPLE_FAIL:
            return {...state, error: action.error}
    }
    return state;
};

export default templeReducer;
