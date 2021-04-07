import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { downFileAtFront } from "../util";
import DetailServer from '../services/detail';

import {
  DETAIL_SUCCESS,
  DETAILEXPORT_SUCCESS
} from '../actions/detail';

import CNF from '../config'
import { message } from 'antd'

export function* detailSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      const rst = yield call(DetailServer.fetchList,data.detail);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: DETAIL_SUCCESS, detail: rst });//action kind
      } else {
        console.error('detailSaga: '+rst.message)
      }
  } catch(e) {
      console.error('detailSaga: '+e)
  }
}

export function* detailexportSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      const rst = yield call(DetailServer.detailExport,data.drt);
      if(rst.code == CNF.CODE.suc){
        downFileAtFront(rst.data.base64Str, "detail", rst.data.type);//下载文件
        //yield put({ type: DETAILEXPORT_SUCCESS });
      } else {
        console.error('detailexportSaga: '+rst.message)
      }
  } catch(e) {
      console.error('detailexportSaga: '+e)
  }
}
