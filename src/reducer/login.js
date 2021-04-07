import Session from '../util/session'

import {
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CORRECT_FAIL,
    CORRECT_MID,
    CORRECT_SUCCESS,
    SIGNPIC_SUCCESS,
    SIGNPIC_FAIL,
    CODE_SUCCESS,
    CODE_FAIL,
    CODE_SCAN_SUCCESS,
    CODE_SCAN_FAIL,
    MENU_SUCCESS
} from '../actions/login';



let initstatus = {
  status:false,//登陆状态
  correct:false,//修改密码状态
  pic:{
    codeId:"",
    codeImg:""
  },
  info:{//扫码，与 账号登陆 个人信息info
    account: "",
    id: "",
    mobile: "",
    name: "",
    openId: "",
    remark: ""
  },
  code:{
    qrcodeId : "",
    qrcode : ""
  },
  menu:[]

}

let openId = Session.getItem("openId");
let info = Session.getItem("info");
if(openId){
  initstatus = { ...initstatus, info, status:true }
}

//status 登陆状态
const loginReducer = (state = initstatus, action) => {
    switch(action.type) {

        case LOGIN_SUCCESS:
            return {...state, status:true, info: action.info}
        case LOGIN_FAIL:
            return {...state, error: action.error}
        case SIGNPIC_SUCCESS:
            return {...state, pic: action.pic}
        case SIGNPIC_FAIL:
            return {...state, error: action.error}
        case LOGOUT_SUCCESS:
            return {...state, status:false, correct:false }
        case LOGOUT_FAIL:
            return {...state, error: action.error}
        case CORRECT_MID:
            return {...state, status:false,correct:true }
        case CORRECT_SUCCESS:
            return {...state, status:false, correct:false}
        case CORRECT_FAIL:
            return {...state, error: action.error}
        case CODE_SUCCESS:
            return {...state, code: action.code}
        case CODE_FAIL:
            return {...state, error: action.error}
        case CODE_SCAN_SUCCESS:
            return {...state, status:true, info: action.info}
        case CODE_SCAN_FAIL:
            return {...state, error: action.error}
        case MENU_SUCCESS:
            return {...state, menu: action.menu}

    }
    return state;
}


export default loginReducer
