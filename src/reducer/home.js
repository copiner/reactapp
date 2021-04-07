import {
    INFO_SUCCESS,
    INFO_FAIL,
    INIT_START,
    OCCARD_SUCCESS,
    ONECARD_SUCCESS,
    UPDATEINFO_SUCCESS,
    UPDATEINFO_RESET,
    RECORD_SUCCESS,
    RECORD_FAIL
} from '../actions/home';

let initstatus = {
  loading:false,
  text:'home',
  info:null,//客户信息
  infoflag:false,//更新成功标志
  one:{},//某种银行卡类型 银行卡信息
  record:[]//操作记录
}

const homeReducer = (state=initstatus, action) => {
    switch(action.type) {
        case INIT_START:
            return {...initstatus}
        case INFO_SUCCESS:
            return {...state, info: action.info}
        case INFO_FAIL:
            return {...state, info: action.info}
        case ONECARD_SUCCESS:
            return {...state, one: action.one}
        case OCCARD_SUCCESS:
            return {...state}
        case UPDATEINFO_SUCCESS:
            return {...state, infoflag: true}
        case UPDATEINFO_RESET:
            return {...state, infoflag: false}
        case RECORD_SUCCESS:
            return {...state, record: action.record}
        case RECORD_FAIL:
            return {...state, error: action.error}
    }
    return state;
}


export default homeReducer
