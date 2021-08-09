import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Selectors from './selectors';//selector
import LoginServer from '../services/login';//selector
import CNF from '../config'
import Session from '../util/session'

import { message } from 'antd'

import {
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,

  LOGIN_SUCCESS,
  LOGIN_FAIL,

  CORRECT_FAIL,
  CORRECT_SUCCESS,

  SIGNPIC_SUCCESS,
  SIGNPIC_FAIL,

  CODE_SUCCESS,
  CODE_FAIL,

  CODE_SCAN_SUCCESS,
  CODE_SCAN_FAIL,

  MENU_START,
  MENU_SUCCESS
} from '../actions/login';

export function* loginSaga(data) {
    try {
        const rst = yield call(LoginServer.loginIn,data.info);
        if(rst.code == CNF.CODE.suc){
          yield put({ type: LOGIN_SUCCESS, info: rst.data });
        } else {
          console.error('loginsaga: '+rst.message)
        }
    } catch(e) {
        console.error('loginsaga: '+e)
    }
}

//获取图片验证码
export function* signpicSaga(data) {
    try {
        const rst = yield call(LoginServer.signpic, data.id);
        if(rst.code == CNF.CODE.suc){
          yield put({ type: SIGNPIC_SUCCESS, pic: rst.data });
        } else {
          console.error('signpicsaga: '+rst.message)
        }
    } catch(e) {
        console.error('signpicsaga: '+e)
        //yield put({ type: SIGNPIC_FAIL, error: e });
    }
}

export function* logoutSaga() {
    try {
        yield call(LoginServer.loginOut);
        yield put({ type: LOGOUT_SUCCESS });
        Session.clear();//清空session数据
        window.history.go(0);//刷新, 清空数据
    } catch(e) {
        //yield put({ type: LOGOUT_FAIL, error: e });
        console.error('logoutsaga: '+e)
    }
}

export function* correctSaga(data) {
    try {
        const rst = yield call(LoginServer.correctIn,data.cort);
        if(rst.code == CNF.CODE.suc){
            message.success('密码修改成功！', 4);
            Session.clear();//清空session数据
            yield call(LoginServer.loginOut);
            yield put({ type: CORRECT_SUCCESS });
            window.history.go(0);//刷新, 清空数据
        } else {
          console.error('correctsaga: '+rst.message)
        }
    } catch(e) {
        console.error('correctsaga: '+e)
    }
}

//获取登陆二维码
export function* codeSaga(data) {
    try {
        const rst = yield call(LoginServer.codeIn,{oriId:data.id});
        if(rst.code == CNF.CODE.suc){
            yield put({ type: CODE_SUCCESS, code: rst.data });
        } else {
          console.error('codesaga: '+rst.message)
        }
    } catch(e) {
        console.error('codesaga: '+e)
    }
}


export function* codescanSaga(data) {
    try {
        const rst = yield call(LoginServer.codescanIn,{oriId:data.id});
        if(rst.code == CNF.CODE.suc){
            yield put({ type: CODE_SCAN_SUCCESS, info: rst.data });//同loginSaga info
        } else {
          //console.error('codescansaga: '+rst.message)
        }
    } catch(e) {
        console.error('codescansaga: '+e)
    }
}

export function* menuSaga() {
    try {
        const rst = yield call(LoginServer.menuIn,{type:CNF.MENU.ownmenu});//权限菜单类型 01
        if(rst.code == CNF.CODE.suc){
            yield put({ type: MENU_SUCCESS, menu: rst.data });
        } else {
          console.error('menusaga: '+rst.message)
        }
    } catch(e) {
        console.error('menusaga: '+e)
    }
}
