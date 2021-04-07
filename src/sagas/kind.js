import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
//import Selectors from './selectors';//selector
import KindServer from '../services/kind';

import {
  KIND_SUCCESS,
  KINDUPDATE_SUCCESS,
  KIND_FAIL
} from '../actions/kind';

import CNF from '../config'
import { message } from 'antd'

export function* kindSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      const rst = yield call(KindServer.fetchList,data.kind);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: KIND_SUCCESS, kind: rst });//action kind
      } else {
        console.error('kindSaga: '+rst.message)
      }
  } catch(e) {
      console.error('kindSaga: '+e)
  }
}

export function* kindupdateSaga(data) {
  try {
      const rst = yield call(KindServer.kindUpdate,data.kte.kte);
      if(rst.code == CNF.CODE.suc){
        message.success('成功！', 5);
        yield put({ type: KINDUPDATE_SUCCESS });
      } else {
        console.error('kindupdateSaga: '+rst.message)
      }

      const rstt = yield call(KindServer.fetchList,data.kte.kind);
      if(rstt.code == CNF.CODE.suc){
        yield put({ type: KIND_SUCCESS, kind: rstt });//action kind
      } else {
        console.error('kindupdateSagakindSaga: '+rst.message)
      }
  } catch(e) {
      console.error('kindupdateSaga: '+e)
  }
}
