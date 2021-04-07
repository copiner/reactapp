import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { downFileAtFront } from "../util";
import Selectors from './selectors';//selector
import TempleServer from '../services/temple';

import {
  TEMPLE_SUCCESS,
  TEMPLE_FAIL,
  TEMPLEUPDATE_SUCCESS
} from '../actions/temple';

import CNF from '../config'

export function* templeSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      /*
      查询和导出
      */
      const rst = yield call(TempleServer.fetchList,data.tle);
      if(rst.code == CNF.CODE.suc){
        if(data.tle.exportFlag == '1'){//导出
          downFileAtFront(rst.data.base64Str, "temple", rst.data.type);//下载文件
        } else {
          yield put({ type: TEMPLE_SUCCESS, temple: rst });
        }
      } else {
        console.error('templeSaga: '+rst.message)
      }
  } catch(e) {
      console.error('templeSaga: '+e)
  }
}


export function* templeupdateSaga(data) {
    try {

        const rst = yield call(TempleServer.templeModify, data.ute);
        if(rst.code == CNF.CODE.suc){
            yield put({ type: TEMPLEUPDATE_SUCCESS });
        } else {
          console.error('templeupdateSaga: '+rst.message)
        }

        // const rstt = yield call(TempleServer.fetchList,data.ute.tle);
        // if(rstt.code == CNF.CODE.suc){
        //   yield put({ type: TEMPLE_SUCCESS, temple: rstt });
        // } else {
        //   console.error('templeupdateSagatempleSaga: '+rst.message)
        // }
    } catch(e) {
        console.error('templeupdateSaga: '+e)
    }
}
