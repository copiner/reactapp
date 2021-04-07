import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Selectors from './selectors';//selector
import UserServer from '../services/user';

import CNF from '../config'
import { message } from 'antd'

import {
  USER_START,
  USER_SUCCESS,
  USER_FAIL,
  USERADD_SUCCESS,
  USERUPDATE_SUCCESS,
  USERDELETE_SUCCESS,
  USERENABLE_SUCCESS,
  USERDISABLE_SUCCESS,
  USERRESET_SUCCESS
} from '../actions/user';


export function* userSaga(data) {
    try {

        const rst = yield call(UserServer.fetList, data.user);
        if(rst.code == CNF.CODE.suc){
          yield put({ type: USER_SUCCESS, user: rst });
        } else {
          console.error('usersaga: '+rst.message)
        }
    } catch(e) {
        console.error('usersaga: '+e)
    }
}

export function* useraddSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        const rst = yield call(UserServer.userAdd, data.add.add);
        if(rst.code == CNF.CODE.suc){
          message.success('角色添加成功！', 5);
          yield put({ type: USERADD_SUCCESS });
        } else {
          console.error('useraddsaga: '+rst.message)
        }

        let rstt = yield call(UserServer.fetList, data.add.user);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: USER_SUCCESS, user: rstt });
        } else {
          console.error('usersaga: '+rstt.message)
        }
    } catch(e) {
        console.error('useraddsaga--usersaga: '+e)
    }
}

export function* userupdateSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        let rst = yield call(UserServer.userUpdate, data.ute.ute);
        if(rst.code == CNF.CODE.suc){
          message.success('修改成功！', 5);
          yield put({ type: USERUPDATE_SUCCESS });
        } else {
          console.error('userupdatesaga: '+rst.message)
        }

        let rstt = yield call(UserServer.fetList, data.ute.user);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: USER_SUCCESS, user: rstt });
        } else {
          console.error('usersaga: '+rst.message)
        }

    } catch(e) {
        console.error('userupdatesaga---usersaga: '+e)
    }
}

export function* userdeleteSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        console.log(data)
        const rst = yield call(UserServer.userDelete, data.dte.dte);
        if(rst.code == CNF.CODE.suc){
          message.success('删除成功！', 5);
          yield put({ type: USERDELETE_SUCCESS });
        } else {
          console.error('userdeletesaga: '+rst.message)
        }

        let rstt = yield call(UserServer.fetList, data.dte.user);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: USER_SUCCESS, user: rstt });
        } else {
          console.error('usersaga: '+rst.message)
        }
    } catch(e) {
        console.error('userdeletesaga---usersaga: '+e)
    }
}

export function* userenableSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        console.log(data)
        const rst = yield call(UserServer.userEnable, data.ele.ele);
        if(rst.code == CNF.CODE.suc){
          message.success('启用成功！', 5);
          yield put({ type: USERENABLE_SUCCESS });
        } else {
          console.error('userenablesaga: '+rst.message)
        }

        let rstt = yield call(UserServer.fetList, data.ele.user);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: USER_SUCCESS, user: rstt });
        } else {
          console.error('usersaga: '+rst.message)
        }
    } catch(e) {
        console.error('userenablesaga---usersaga: '+e)
    }
}

export function* userdisableSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        console.log(data)
        const rst = yield call(UserServer.userDisable, data.dle.dle);
        if(rst.code == CNF.CODE.suc){
          message.success('停用成功！', 5);
          yield put({ type: USERDISABLE_SUCCESS });
        } else {
          console.error('userdisablesaga: '+rst.message)
        }

        let rstt = yield call(UserServer.fetList, data.dle.user);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: USER_SUCCESS, user: rstt });
        } else {
          console.error('usersaga: '+rst.message)
        }
    } catch(e) {
        console.error('userdisablesaga---usersaga: '+e)
    }
}

export function* userresetSaga(data) {
    try {

        const rst = yield call(UserServer.userReset, data.uet);
        if(rst.code == CNF.CODE.suc){
          message.success('密码重置成功！', 5);
          yield put({ type: USERRESET_SUCCESS});
        } else {
          console.error('userresetSaga: '+rst.message)
        }
    } catch(e) {
        console.error('userresetSaga: '+e)
    }
}
