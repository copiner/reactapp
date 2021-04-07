import {
  DEVICE_START,
  DEVICE_SUCCESS,
  DEVICEUPDATE_SUCCESS,
  DEVICE_FAIL
} from '../actions/device';

let initstatus = {
  loading:false,
  list:null,//表单数据
  text:'device'
}

const deviceReducer = (state = initstatus, action) => {

    switch(action.type) {
        case DEVICE_SUCCESS:
            return {...state, list: action.device}
        case DEVICEUPDATE_SUCCESS:
            return {...state}
        case DEVICE_FAIL:
            return {...state, error: action.error}
    }
    return state;
};

export default deviceReducer;
