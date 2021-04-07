import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';


import { LOGIN_START, SIGNPIC_START, LOGOUT_START, CORRECT_START,CODE_START, CODE_SCAN_START, MENU_START } from '../actions/login';
import { INFO_START, RECORD_START, OCCARD_START, ONECARD_START, UPDATEINFO_START } from '../actions/home';
import { ALLOW_START,ALLOWUPDATE_START } from '../actions/allow';

import { KIND_START,KINDUPDATE_START} from '../actions/kind';
import { TEMPLE_START, TEMPLEUPDATE_START } from '../actions/temple';

import { DEVICE_START, DEVICEUPDATE_START } from '../actions/device';
import { TASK_START,TASKUPLOAD_START,TASKSUBMIT_START,TASKDETAIL_START,TASKOPEN_START,
  TASKEXPORT_START } from '../actions/task';

import { DETAIL_START, DETAILEXPORT_START } from '../actions/detail';//团购明细

import { ORDER_START, ORDEREXPORT_START } from '../actions/order';

import { CHANNEL_START, CHANNELADD_START, CHANNELUPDATE_START } from '../actions/channel';

import { USER_START,USERADD_START,USERUPDATE_START,USERDELETE_START,USERENABLE_START, USERDISABLE_START, USERRESET_START} from '../actions/user';
import { ROLE_START, ROLEADD_START,ROLEUPDATE_START,ROLEDELETE_START,
  ROLEENABLE_START,ROLEDISABLE_START,ROLEMENU_START,ROLESETMENU_START,
  ROLEUSER_START,ROLEDELUSER_START } from '../actions/role';


import { loginSaga, signpicSaga, logoutSaga, correctSaga, codeSaga, codescanSaga, menuSaga  } from './login'
import { kindSaga, kindupdateSaga} from './kind'
import { allowSaga, allowupdateSaga } from './allow'
import { homeinfoSaga,homeonecardSaga, homeoccardSaga,homeupdateinfoSaga, homerecordSaga } from './home'

import { templeSaga,templeupdateSaga } from './temple'
import { deviceSaga, deviceupdateSaga } from './device'
import { taskSaga,taskuploadSaga, tasksubmitSaga, taskdetailSaga,taskopenSaga,
  taskexportSaga} from './task'
import { detailSaga,detailexportSaga } from './detail'

import { orderSaga, orderexportSaga } from './order'
import { channelSaga, channeladdSaga, channelupdateSaga} from './channel'

import { userSaga,useraddSaga,userupdateSaga,userdeleteSaga,userenableSaga,userdisableSaga,userresetSaga } from './user'

import { roleSaga, roleaddSaga, roleupdateSaga,roledeleteSaga,
  roleenableSaga,roledisableSaga,rolemenuSaga,rolesetmenuSaga,
  roleuserSaga,roledeluserSaga } from './role'


// wacther saga
function* watchSaga() {
    /*login*/
    yield takeEvery(LOGIN_START, loginSaga);
    yield takeEvery(SIGNPIC_START, signpicSaga);
    yield takeEvery(LOGOUT_START, logoutSaga);
    yield takeEvery(CORRECT_START, correctSaga);
    yield takeEvery(CODE_START, codeSaga);
    yield takeEvery(CODE_SCAN_START, codescanSaga);

    yield takeEvery(MENU_START, menuSaga);
    /*home*/
    yield takeEvery(INFO_START, homeinfoSaga);
    yield takeEvery(ONECARD_START, homeonecardSaga);
    yield takeEvery(OCCARD_START, homeoccardSaga);
    yield takeEvery(UPDATEINFO_START, homeupdateinfoSaga);
    yield takeEvery(RECORD_START, homerecordSaga);

    /*allow*/
    yield takeEvery(ALLOW_START, allowSaga);
    yield takeEvery(ALLOWUPDATE_START, allowupdateSaga);

    /*kind*/
    yield takeEvery(KIND_START, kindSaga);
    yield takeEvery(KINDUPDATE_START, kindupdateSaga);

    /*temple*/
    yield takeEvery(TEMPLE_START, templeSaga);
    yield takeEvery(TEMPLEUPDATE_START, templeupdateSaga);

    yield takeEvery(DEVICE_START, deviceSaga);
    yield takeEvery(DEVICEUPDATE_START, deviceupdateSaga);

    /*task*/
    yield takeEvery(TASK_START, taskSaga);
    yield takeEvery(TASKUPLOAD_START, taskuploadSaga);
    yield takeEvery(TASKSUBMIT_START, tasksubmitSaga);
    yield takeEvery(TASKDETAIL_START, taskdetailSaga);
    yield takeEvery(TASKOPEN_START, taskopenSaga);
    yield takeEvery(TASKEXPORT_START, taskexportSaga);

    /*detail*/
    yield takeEvery(DETAIL_START, detailSaga);
    yield takeEvery(DETAILEXPORT_START, detailexportSaga);

    /*order*/
    yield takeEvery(ORDER_START, orderSaga);
    yield takeEvery(ORDEREXPORT_START, orderexportSaga);

    /*channel*/
    yield takeEvery(CHANNEL_START, channelSaga);
    yield takeEvery(CHANNELADD_START, channeladdSaga);
    yield takeEvery(CHANNELUPDATE_START, channelupdateSaga);

    /*user*/
    yield takeEvery(USER_START, userSaga);
    yield takeEvery(USERADD_START, useraddSaga);
    yield takeEvery(USERUPDATE_START, userupdateSaga);
    yield takeEvery(USERDELETE_START, userdeleteSaga);
    yield takeEvery(USERENABLE_START, userenableSaga);
    yield takeEvery(USERDISABLE_START, userdisableSaga);
    yield takeEvery(USERRESET_START, userresetSaga);

    /*role*/
    yield takeEvery(ROLE_START, roleSaga);
    yield takeEvery(ROLEADD_START, roleaddSaga);
    yield takeEvery(ROLEUPDATE_START, roleupdateSaga);
    yield takeEvery(ROLEDELETE_START, roledeleteSaga);
    yield takeEvery(ROLEENABLE_START, roleenableSaga);
    yield takeEvery(ROLEDISABLE_START, roledisableSaga);

    yield takeEvery(ROLEMENU_START, rolemenuSaga);
    yield takeEvery(ROLESETMENU_START, rolesetmenuSaga);
    yield takeEvery(ROLEUSER_START, roleuserSaga);
    yield takeEvery(ROLEDELUSER_START, roledeluserSaga);
}

// root saga
export default function* rootSaga() {
    yield watchSaga()
}
