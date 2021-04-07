import {
  CHANNEL_START,
  CHANNEL_SUCCESS,
  CHANNELUPDATE_SUCCESS,
  CHANNEL_FAIL
} from '../actions/channel';

let initstatus = {
  loading:false,
  list:null,//表单数据
  text:'channel'
}


const channelReducer = (state=initstatus, action) => {

    switch(action.type) {
        case CHANNEL_SUCCESS:
            return {...state, list: action.channel}
        case CHANNELUPDATE_SUCCESS:
            return {...state}
        case CHANNEL_FAIL:
            return {...state, error: action.error}
    }
    return state;
};

export default channelReducer;
