import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Selectors from './selectors';//selector
import RoleServer from '../services/role';
import {
  ROLE_START,
  ROLE_SUCCESS,
  ROLE_FAIL,
  ROLEADD_SUCCESS,
  ROLEUPDATE_SUCCESS,
  ROLEDELETE_SUCCESS,
  ROLEENABLE_SUCCESS,
  ROLEDISABLE_SUCCESS,
  ROLEMENU_SUCCESS,
  ROLESETMENU_SUCCESS,
  ROLEUSER_SUCCESS,
  ROLEDELUSER_SUCCESS
} from '../actions/role';

import CNF from '../config'
import { message } from 'antd'

export function* roleSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        //console.log(data)
        const rst = yield call(RoleServer.fetList, data.role);
        if(rst.code == CNF.CODE.suc){
          yield put({ type: ROLE_SUCCESS, role: rst });
        } else {
          console.error('rolesaga: '+rst.message)
        }
    } catch(e) {
        console.error('rolesaga: '+e)
    }
}

export function* roleaddSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        const rst = yield call(RoleServer.roleAdd, data.add.add);
        if(rst.code == CNF.CODE.suc){
          message.success('角色添加成功！', 5);
          yield put({ type: ROLEADD_SUCCESS });
        } else {
          console.error('roleaddsaga: '+rst.message)
        }

        let rstt = yield call(RoleServer.fetList, data.add.role);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: ROLE_SUCCESS, role: rstt });
        } else {
          console.error('rolesaga: '+rstt.message)
        }
    } catch(e) {
        console.error('roleaddsaga: '+e)
    }
}

export function* roleupdateSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        let rst = yield call(RoleServer.roleUpdate, data.ute.ute);
        if(rst.code == CNF.CODE.suc){
          message.success('修改成功！', 5);
          yield put({ type: ROLEUPDATE_SUCCESS });
        } else {
          console.error('roleupdatesaga: '+rst.message)
        }

        let rstt = yield call(RoleServer.fetList, data.ute.role);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: ROLE_SUCCESS, role: rstt });
        } else {
          console.error('rolesaga: '+rst.message)
        }

    } catch(e) {
        console.error('roleupdatesaga: '+e)
    }
}

export function* roledeleteSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        console.log(data)
        const rst = yield call(RoleServer.roleDelete, data.dte.dte);
        if(rst.code == CNF.CODE.suc){
          message.success('删除成功！', 5);
          yield put({ type: ROLEDELETE_SUCCESS });
        } else {
          console.error('roledeletesaga: '+rst.message)
        }

        let rstt = yield call(RoleServer.fetList, data.dte.role);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: ROLE_SUCCESS, role: rstt });
        } else {
          console.error('rolesaga: '+rst.message)
        }
    } catch(e) {
        console.error('roledeletesaga: '+e)
    }
}

export function* roleenableSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        console.log(data)
        const rst = yield call(RoleServer.roleEnable, data.ele.ele);
        if(rst.code == CNF.CODE.suc){
          message.success('启用成功！', 5);
          yield put({ type: ROLEENABLE_SUCCESS });
        } else {
          console.error('roleenablesaga: '+rst.message)
        }

        let rstt = yield call(RoleServer.fetList, data.ele.role);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: ROLE_SUCCESS, role: rstt });
        } else {
          console.error('rolesaga: '+rst.message)
        }
    } catch(e) {
        console.error('roleenablesaga: '+e)
    }
}

export function* roledisableSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        console.log(data)
        const rst = yield call(RoleServer.roleDisable, data.dle.dle);
        if(rst.code == CNF.CODE.suc){
          message.success('停用成功！', 5);
          yield put({ type: ROLEDISABLE_SUCCESS });
        } else {
          console.error('roledisablesaga: '+rst.message)
        }

        let rstt = yield call(RoleServer.fetList, data.dle.role);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: ROLE_SUCCESS, role: rstt });
        } else {
          console.error('rolesaga: '+rst.message)
        }
    } catch(e) {
        console.error('roledisablesaga: '+e)
    }
}


export function* rolemenuSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        //console.log(data)
        const rst = yield call(RoleServer.roleAuthMenu, data.menu);//获取该角色已分配菜单
        const rstt = yield call(RoleServer.roleMenu, data.menu);//获取所有菜单

        if(rst.code == CNF.CODE.suc && rstt.code == CNF.CODE.suc){
          yield put({ type: ROLEMENU_SUCCESS, menu: {tree:rstt.data,check:rst.data} });
        } else {
          console.error('rolemenusaga: '+rst.message)
        }

    } catch(e) {
        console.error('rolemenusaga: '+e)
    }
}

export function* rolesetmenuSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        //console.log(data)
        const rst = yield call(RoleServer.roleSetMenu, data.snu);
        if(rst.code == CNF.CODE.suc){
          yield put({ type: ROLESETMENU_SUCCESS });
        } else {
          console.error('rolesetmenusaga: '+rst.message)
        }
    } catch(e) {
        console.error('rolesetmenusaga: '+e)
    }
}

export function* roleuserSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        //console.log(data)
        const rst = yield call(RoleServer.roleUser, data.user);
        if(rst.code == CNF.CODE.suc){
          yield put({ type: ROLEUSER_SUCCESS, user: rst });
        } else {
          console.error('roleusersaga: '+rst.message)
        }
    } catch(e) {
        console.error('roleusersaga: '+e)
    }
}

export function* roledeluserSaga(data) {
    try {
        //const posts = yield select(Selectors.getUser);
        //console.log(data)
        const rst = yield call(RoleServer.roleDelUser, data.der.der);
        if(rst.code == CNF.CODE.suc){
          yield put({ type: ROLEDELUSER_SUCCESS });
          message.success('解除绑定成功！', 5);
        } else {
          console.error('roledelusersaga: '+rst.message)
        }

        const rstt = yield call(RoleServer.roleUser, data.der.user);
        if(rstt.code == CNF.CODE.suc){
          yield put({ type: ROLEUSER_SUCCESS, user: rstt });
        } else {
          console.error('roleusersaga: '+rst.message)
        }
    } catch(e) {
        console.error('roledelusersaga---roleusersaga: '+e)
    }
}
