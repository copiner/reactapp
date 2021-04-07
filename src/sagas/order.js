import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { downFileAtFront } from "../util";
import OrderServer from '../services/order';
import CNF from '../config'
import { message } from 'antd'

import {
  ORDER_SUCCESS,
  ORDEREXPORT_SUCCESS,
  ORDER_FAIL
} from '../actions/order';

export function* orderSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      const rst = yield call(OrderServer.fetchList,data.order);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: ORDER_SUCCESS, order: rst });//action kind
      } else {
        console.error('orderSaga: '+rst.message)
      }
  } catch(e) {
      console.error('orderSaga: '+e)
  }
}


export function* orderexportSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      const rst = yield call(OrderServer.orderExport,data.ort);
      if(rst.code == CNF.CODE.suc){
        downFileAtFront(rst.data.base64Str, "detail", rst.data.type);//下载文件
      } else {
        console.error('orderexportSaga: '+rst.message)
      }
  } catch(e) {
      console.error('orderexportSaga: '+e)
  }
}
