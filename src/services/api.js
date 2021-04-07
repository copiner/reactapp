/*
服务接口
*/

const API = {
  /*
  用户登陆
  */
  LOGIN: {
    SIGNIN: '/login/nameAndPwdLogin',
    SIGNPIC:'/login/loginCaptchaCode',//验证码 图片
    CODE:'/login/loginBiCode',//获取登陆二维码
    CODESCAN:'/login/biCodeLogin',//扫码登陆，轮询查询
    CORRECT: '/usr/pwdChange',
    SIGNOUT:'/usr/logout',
    MENUIN:'/usr/getResource'
  },

  /*
  业务办理
  */
  BUSINESS: {
    INFO: '/bus/queryCustInfo',
    ONEINFO:"/com/queryOpenInfo",
    OCCARD:"/bus/cardOpen",
    UPDATEINFO:"/bus/modifyCustInfo",
    RECORD:"/bus/queryBusiRecords",
    PRINTCARD:"/bus/cardPrint",//打印银行卡片
    BINDCARD:"/bus/cardBind",//绑银行卡
    BACKCARD:"/bus/cardReturn",//退银行卡
    BACKCARDPRE:"/bus/queryReturnInfo",//退银行卡预先信息查询
  },

  ALLOW:{
    QUERY:"/com/queryWhiteList",
    MODIFY:"/com/modifyWhiteList"
  },

  TEMPLE:{
    QUERY:"/com/queryTemple",
    MODIFY:"/com/modifyTemple",
  },

  DEVICE:{
    QUERY:"/com/queryEquipment",
    MODIFY:"/com/modifyEquipment",
  },

  KIND:{
    QUERY:"/com/queryCardKind",
    MODIFY:"/com/modifyCardKind",
    ONEINFO:"/com/queryOpenInfo",//根据银行卡类别，查询有效期和单价
  },

  TASK:{//团购任务
    QUERY:"/group/queryGroupOrder",
    UPLOAD:"/group/groupOrderExcel",//上传文件结果解析
    DETAIL:"/group/groupOrderDetail",
    SUBMIT:"/group/groupOrderSubmit",
    OPEN:"/group/groupOrderOpen",
  },

  DETAIL:{//团购明细
    QUERY:"/group/groupDetailQuery",
    EXPORT:"/group/groupDetailExcel",
    LEVNAME:"/group/blurOrderName",
  },

  ORDER:{
    QUERY:"/com/orderQuery",
    EXPORT:"/com/orderQueryExcel",
  },

  RECORD:{
    QUERY:"/com/entranceQuery"//刷银行卡记录
  },

  SUMMARY:{
    QUERY:"/com/operatorOrderQuery",
    UPDATE:"/com/editPayWay",
    EXPORT:"/com/operatorOrderExcel"
  },

  CHANNEL:{
    QUERY:"/com/channelQuery",
    ADD:"/com/channelAdd",
    UPDATE:"/com/channelUpdate",
  },
  /*
  用户
  */
  USER: {
    QUERY: '/com/queryOperator',
    ADD:"/com/addOperator",
    UPDATE: '/com/updateOperator',
    DELETE:"/com/deleteOperator",
    ENABLE:"/com/activeOperator",
    DISABLE:"/com/freezeOperator",
    RESET:"/usr/pwdReset",
  },
  /*
  角色
  */
  ROLE:{
    QUERY:"/com/queryRole",
    ADD:"/com/addRole",
    UPDATE:"/com/updateRole",
    DELETE:"/com/deleteRole",
    ENABLE:"/com/activeRole",
    DISABLE:"/com/freezeRole",
    ROLEMENU:"/usr/getMenu",
    ROLEAUTHMENU:"/usr/getRoleResource",
    ROLESETMENU:"/usr/setRoleResource",
    ROLEDELUSER:"/com/deleteUserRole"
  },
  /*
  数据字典
  */
  DICT:"/com/queryDataDic",
  /*
  二维码
  */
  CODE:"/usr/vaildBiCode",
  CP:{
    READCSN:"http://127.0.0.1:1121/cardreader/getcsn",
    PRINTSTATUS:"http://127.0.0.1:1121/printer/getstatus",
    PRINTCARD:"http://127.0.0.1:1121/printer/printcard",
    PRINTRECEIPT:"http://127.0.0.1:1121/printer/printpaper"
  }
}

export default API
