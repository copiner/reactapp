import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Selectors from './selectors';//selector
import ChannelServer from '../services/channel';

import {
  CHANNEL_SUCCESS,
  CHANNEL_FAIL,
  CHANNELUPDATE_SUCCESS,
  CHANNELADD_SUCCESS
} from '../actions/channel';

import CNF from '../config'
import { message } from 'antd'

export function* channelSaga(data) {
  try {

      const rst = yield call(ChannelServer.fetchList,data.channel);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: CHANNEL_SUCCESS, channel: rst });
      } else {
        console.error('channelSaga: '+rst.message)
      }
  } catch(e) {
      console.error('channelSaga: '+e)
  }
}

export function* channeladdSaga(data) {
    try {

        const rst = yield call(ChannelServer.channelAdd, data.cdd);
        if(rst.code == CNF.CODE.suc){
            message.success('创建成功！', 5);
            yield put({ type: CHANNELADD_SUCCESS});
        } else {
          console.error('channeladdSaga: '+rst.message)
        }

    } catch(e) {
        console.error('channeladdSaga: '+e)
    }
}


export function* channelupdateSaga(data) {
    try {

        const rst = yield call(ChannelServer.channelUpdate, data.cte);
        if(rst.code == CNF.CODE.suc){
            message.success('修改成功！', 5);
            yield put({ type: CHANNELUPDATE_SUCCESS});
        } else {
          console.error('channelupdateSaga: '+rst.message)
        }

    } catch(e) {
        console.error('channelupdateSaga: '+e)
    }
}
