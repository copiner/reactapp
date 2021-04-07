import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Selectors from './selectors';//selector
import HomeServer from '../services/home';

import {
  INFO_SUCCESS,
  INFO_FAIL,
  CARDKIND_SUCCESS,
  ONECARD_SUCCESS,
  OCCARD_SUCCESS,
  UPDATEINFO_SUCCESS,
  UPDATEINFO_RESET,
  RECORD_SUCCESS,
  RECORD_FAIL
} from '../actions/home';

import CNF from '../config'
import { message } from 'antd'

let initData = {
  text:'home',
  info:null,
  one:{},//某种银行卡类型 银行卡信息
  record:[]//操作记录
}

export function* homeinfoSaga(data) {//用户信息查询
    try {
        const rst = yield call(HomeServer.homeInfo, data.info);
        if(rst.code == CNF.CODE.suc){
            yield put({ type: INFO_SUCCESS, info: rst.data });
        } else {
            yield put({ type: INFO_FAIL, info: initData });
        }
    } catch(e) {
        console.error('homeinfoSaga: '+e)
    }
}

export function* homeonecardSaga(data) {
    try {
        const rst = yield call(HomeServer.homeOneCardInfo, data.ord);
        if(rst.code == CNF.CODE.suc){
            yield put({ type: ONECARD_SUCCESS, one: rst.data });
        } else {
          console.error('homeonecardSaga: '+rst.message)
        }
    } catch(e) {
        console.error('homeonecardSaga: '+e)
    }
}

export function* homeoccardSaga(data) {//开通续费
    try {
        const rst = yield call(HomeServer.homeOccard, data.ocrd);
        if(rst.code == CNF.CODE.suc){
            message.success('办理成功！', 5);
            yield put({ type: OCCARD_SUCCESS });
        } else {
          console.error('homeoccardSaga: '+rst.message)
        }
    } catch(e) {
        console.error('homeoccardSaga: '+e)
    }
}


export function* homeupdateinfoSaga(data) {//信息修改
    try {
        const rst = yield call(HomeServer.homeUpdateInfo, data.ufo);
        if(rst.code == CNF.CODE.suc){
            message.success('修改成功！', 5);
            yield put({ type: UPDATEINFO_SUCCESS });
            yield put({ type: UPDATEINFO_RESET });
        } else {
          console.error('homeupdateinfoSaga: '+rst.message)
        }
    } catch(e) {
        console.error('homeupdateinfoSaga: '+e)
    }
}

export function* homerecordSaga(data) {
    try {

        const rst = yield call(HomeServer.homeRecord, data.record);
        if(rst.code == CNF.CODE.suc){
            yield put({ type: RECORD_SUCCESS, record: rst });
        } else {
          console.error('homerecordSaga: '+rst.message)
        }
    } catch(e) {
        console.error('homerecordSaga: '+e)
    }
}
