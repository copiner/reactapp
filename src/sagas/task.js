import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import TaskServer from '../services/task';
import { downFileAtFront } from "../util";
import CNF from '../config'
import {
  TASK_SUCCESS,
  TASKUPLOAD_SUCCESS,
  TASKSUBMIT_SUCCESS,
  TASKDETAIL_SUCCESS,
  TASKOPEN_SUCCESS,
  TASKEXPORT_SUCCESS,
  TASK_FAIL
} from '../actions/task';

import { message } from 'antd'

export function* taskSaga(data) {
  try {
      const rst = yield call(TaskServer.fetchList,data.task);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: TASK_SUCCESS, task: rst });
      } else {
        console.error('kindSaga: '+rst.message)
      }

  } catch(e) {
      yield put({ type: TASK_FAIL, error: e });
  }
}

export function* taskuploadSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      if(!data.tad){//重置
        yield put({ type: TASKUPLOAD_SUCCESS, upload: { custCnt:"0" } });
        return
      }
      const rst = yield call(TaskServer.taskUpload,data.tad);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: TASKUPLOAD_SUCCESS, upload: rst.data });
      } else {
        console.error('taskuploadSaga: '+rst.message)
      }
  } catch(e) {
      console.error('taskuploadSaga: '+e)
  }
}

export function* tasksubmitSaga(data) {
  try {
      //const kind = yield select(Selectors.getKind);
      const rst = yield call(TaskServer.taskSubmit,data.tit);
      if(rst.code == CNF.CODE.suc){
        message.success(rst.message, 5);
        yield put({ type: TASKSUBMIT_SUCCESS });
      } else {
        console.error('tasksubmitSaga: '+rst.message)
      }
  } catch(e) {
      console.error('tasksubmitSaga: '+e)
  }
}

export function* taskdetailSaga(data) {
  try {
      const rst = yield call(TaskServer.taskDetail,data.til);
      if(rst.code == CNF.CODE.suc){
        yield put({ type: TASKDETAIL_SUCCESS, detail: rst});
      } else {
        console.error('taskdetailSaga: '+rst.message)
      }
  } catch(e) {
      console.error('taskdetailSaga: '+e)
  }
}

export function* taskopenSaga(data) {
  try {
      const rst = yield call(TaskServer.taskOpen,data.ten);
      if(rst.code == CNF.CODE.suc){
        message.success(rst.message, 5);
        yield put({ type: TASKOPEN_SUCCESS});
      } else {
        console.error('taskopenSaga: '+rst.message)
      }
  } catch(e) {
      console.error('taskopenSaga: '+e)
  }
}

export function* taskexportSaga(data) {
  try {
      /*
      console.log(process.env.BASE_API_SEV + rst.data)
      window.location.href = process.env.BASE_API_SEV +"/"+ rst.data;
      */
      const rst = yield call(TaskServer.taskExport,data.trt);
      if(rst.code == CNF.CODE.suc){
        downFileAtFront(rst.data.base64Str, "task", rst.data.type);//下载文件
      } else {
        console.error('taskexportSaga: '+rst.message)
      }
  } catch(e) {
      console.error('taskexportSaga: '+e)
  }
}
