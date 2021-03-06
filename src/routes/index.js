import React from 'react';
import loadable from "@loadable/component";

import { Spin } from 'antd';
import { UserOutlined,VideoCameraOutlined,UploadOutlined,MailOutlined } from '@ant-design/icons';

const Home = loadable((props) => import(/* webpackChunkName: "counter" */'../container/home'))
//import CNF from '../config'
export const routeEnum = {
  "m010100":"/sail",
  "m010200":"/allowed",
  "m010300":"/kind",
  "m010400":"/temple",
  "m010500":"/device",
  "m020100":"/task",
  "m020200":"/detail",
  "m030100":"/order",
  "m030200":"/record",
  "m030300":"/summary",
  "m030400":"/channel",
  "m040100":"/user",
  "m040200":"/role"
}

export const routesList = [
{
    id:'m010000',
    title:"业务管理",
    exact:true,
    icon: <UserOutlined />,
    status:false,
    routes:[
      {
        id:'m010100',
        title:"常用业务",
        path: '/sail',
        extra: {
          ant: true
        },
        status:false,
        component: Home
      },
      {
        id:'m010200',
        title:"白名单",
        path: '/allowed',
        exact: true,
        status:false,
        component: loadable(() => import(/* webpackChunkName: "allow" */"../container/allow"))
      },
      {
        id:'m010300',
        title:"银行卡类别",
        path: '/kind',
        exact: true,
        status:false,
        component: loadable(() => import(/* webpackChunkName: "kind" */'../container/kind'))
      },
      {
        id:'m010400',
        title:"园区管理",
        path: '/temple',
        exact: true,
        status:false,
        component: loadable(() => import(/* webpackChunkName: "temple" */'../container/temple'))
      },
      {
        id:'m010500',
        title:"设备管理",
        path: '/device',
        exact: true,
        status:false,
        component: loadable(() => import(/* webpackChunkName: "device" */'../container/device'))
      }
    ]
},
{
  id:'m020000',
  title:'团购管理',
  icon: <MailOutlined />,
  status:false,
  routes:[
    {
      id:'m020100',
      title:"团购任务",
      path: '/task',
      status:false,
      component: loadable(() => import(/* webpackChunkName: "task" */'../container/task'))
    },{
      id:'m020200',
      title:"团购明细",
      path: '/detail',
      status:false,
      component: loadable(() => import(/* webpackChunkName: "detail" */'../container/detail'))
    },
  ]
},
{
  id:'m030000',
  title:"数据管理",
  icon: <UploadOutlined />,
  status:false,
  routes:[
    {
      id:'m030100',
      title:"订单管理",
      path: '/order',
      exact: true,
      status:false,
      component: loadable(() => import(/* webpackChunkName: "order" */"../container/order"))
    },{
      id:'m030200',
      title:"园区记录",
      path: '/record',
      exact: true,
      status:false,
      component: loadable(() => import(/* webpackChunkName: "record" */"../component/record"))
    },{
      id:'m030300',
      title:"工作统计",
      path: '/summary',
      exact: true,
      status:false,
      component: loadable(() => import(/* webpackChunkName: "summary" */'../component/summary')),
      routes: [
        {
          id:'m030301',
          title:"操作员",
          status:false,
          disable:false,
          type: "input"
        },
        {
          id:'m030302',
          title:"其他",
          disable:true,
          status:false,
          type: "input"
        }
      ]
    },{
      id:'m030400',
      title:"渠道管理",
      path: '/channel',
      exact: true,
      status:false,
      component: loadable(() => import(/* webpackChunkName: "channel" */'../container/channel'))
    }
  ]
},
{
  id:'m040000',
  title:'权限管理',
  icon: <VideoCameraOutlined />,
  status:false,
  routes:[
    {
      id:'m040100',
      title:"用户管理",
      path: '/user',
      exact: true,
      status:false,
      component: loadable(() => import(/* webpackChunkName: "user" */'../container/user'))
    },{
      id:'m040200',
      title:"角色管理",
      path: '/role',
      exact: true,
      status:false,
      component: loadable(() => import(/* webpackChunkName: "role" */"../container/role"))
    }
  ]
}

];
