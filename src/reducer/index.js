import { combineReducers } from 'redux'

import login from './login';
import allow from './allow';
import home from './home';
import kind from './kind';
import temple from './temple';
import device from './device';
import task from './task';
import detail from './detail';
import order from './order';
import channel from './channel';

import user from './user';
import role from './role';

const appReducer = combineReducers({ login, home, allow, kind, temple, device, task, detail, order, channel, user, role});

export default appReducer
