import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Selectors from './selectors';//selector
import AllowServer from '../services/allow';

import CNF from '../config'
import { message } from 'antd'

import {
  ALLOW_SUCCESS,
  ALLOW_FAIL,
  ALLOWUPDATE_SUCCESS,
  ALLOWUPDATE_RESET
} from '../actions/allow';

export function* allowSaga(data) {
    try {
      const rst = yield call(AllowServer.fetchList,data.alw);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: ALLOW_SUCCESS, allow:rst});
      } else {
        console.error('allowSaga: '+rst.message)
      }
    } catch(e) {
        console.error('allowSaga: '+e)
    }
}

export function* allowupdateSaga(data) {
  try {
      const rst = yield call(AllowServer.kindUpdate,data.ate);
      if(rst.code == CNF.CODE.suc){
        message.success('成功！', 5);
        yield put({ type: ALLOWUPDATE_SUCCESS });
        yield put({ type: ALLOWUPDATE_RESET });
      } else {
        console.error('allowupdateSaga: '+rst.message)
      }
  } catch(e) {
      console.error('allowupdateSaga: '+e)
  }
}
