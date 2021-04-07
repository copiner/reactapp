import {
    USER_SUCCESS,
    USER_FAIL,
    USERADD_SUCCESS,
    USERUPDATE_SUCCESS,
    USERDELETE_SUCCESS,
    USERENABLE_SUCCESS,
    USERDISABLE_SUCCESS,
    USERRESET_SUCCESS
} from '../actions/user';

let initstatus = {
  loading:false,
  list:null,//表单数据
  text:'user'
}

const postReducer = (state = initstatus, action) => {
    switch(action.type) {
        case USER_SUCCESS:
            return {...state, list: action.user}
        case USER_FAIL:
            return {...state, error: action.error}
        case USERADD_SUCCESS:
            return {...state }
        case USERUPDATE_SUCCESS:
            return {...state}
        case USERDELETE_SUCCESS:
            return {...state }
        case USERENABLE_SUCCESS:
            return {...state }
        case USERDISABLE_SUCCESS:
            return {...state }
        case USERRESET_SUCCESS:
            return {...state }
    }
    return state;
}


export default postReducer
