import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Selectors from './selectors';//selector
import DeviceServer from '../services/device';

import {
  DEVICE_SUCCESS,
  DEVICE_FAIL,
  DEVICEUPDATE_SUCCESS,
} from '../actions/device';

import CNF from '../config'
import { message } from 'antd'

export function* deviceSaga(data) {
  try {
      const rst = yield call(DeviceServer.fetchList,data.dce);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: DEVICE_SUCCESS, device: rst });
      } else {
        console.error('deviceSaga: '+rst.message)
      }
  } catch(e) {
      console.error('deviceSaga: '+e)
  }
}

export function* deviceupdateSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      const rst = yield call(DeviceServer.deviceModify,data.dte.dte);
      if(rst.code == CNF.CODE.suc){
        message.success('成功！', 5);
        yield put({ type: DEVICEUPDATE_SUCCESS, update: rst.data });
      } else {
        console.error('deviceupdateSaga: '+rst.message)
      }

      const rstt = yield call(DeviceServer.fetchList,data.dte.dce);
      if(rstt.code == CNF.CODE.suc){
        yield put({ type: DEVICE_SUCCESS, device: rstt });
      } else {
        console.error('deviceupdateSagadeviceSaga: '+rst.message)
      }
  } catch(e) {
      console.error('deviceupdateSaga: '+e)
  }
}
