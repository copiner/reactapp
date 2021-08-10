
console.log("Running App service " + process.env.BASE_API_SEV);

export default
{
  SITENAME: '管理系统',
  SITELOGO: "行",
  COPYRIGHT: 'abc',
  CHANNEL:"jingsi",
  IPTLIT:{//input limit
    username: { reg:/^[0-9A-Za-z]{1,20}$/, msg:"要求数字字母不能超过位20位" },
    password:{ reg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/, msg:"要求8-20位数字与字母组合" },
    namea: { reg:/^[\d\w]+$/, msg:"要求数字或字母" },
    nameb: { reg:/^[\d-a-zA-z\u4e00-\u9fa5]{2,30}$/, msg:"要求2-30位中文、数字、字母或者短横线" },
    namec: { reg:/^[\u4e00-\u9fa5]{1,30}$/, msg:"要求1-30位中文" },
    named: { reg:/^[0-9A-Za-z]{2,20}$/, msg:"要求数字字母不能超过位20位" },
    namee: { reg:/^[\d\w]{2,20}$/, msg:"要求2-20位数字或字母" },
    namef: { reg:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,30}$/, msg:"要求2-30位数字与字母组合" },
    nameg: { reg:/^[0-9A-Za-z]{2,30}$/, msg:"要求2-30位数字或字母" },
    certl: { reg:/^[\d-a-zA-z-\\(\\)]{1,30}$/, msg:"证件号码输入不合法" },
    cert: { reg:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, msg:"身份证输入不合法" },
    mobile: { reg:/^[\d]{11}$/, msg:"手机号输入不合法" },
    remark: { reg:/^[\u4e00-\u9fa5]{2,30}$/, msg:"要求2-30位汉字" },
    fee: { reg:/^[\d]{1,8}$/, msg:"输入值不合法" },
    digit: { reg:/^[\d]{4}$/, msg:"验证码输入不合法" },
  },
  DICT:{
    defaultCard:"1",//默认银行卡类型1
    defaultIdType:"01",//默认证件类型01
    orderType:"TS004",//订单类型
    orderStatus:"TS011",
    roleStatus:"C001",//角色状态
    roleList:"C002",// /com/queryRole通过角色查询接口
    cardKind:"C003",// 查询银行卡种类接口
    idType:"TS006",//证件类型
    equipType:"TS008", //设备类型
    equipStatus:"TS009",
    templeName:"C004", //接口查询名称
    useFlag:"C005", //设备启用标志

    taskOperCode:"group",//团购操作员角色ID
    cardKindOperCode:"cardkind",
    orderOperCode:"order",

    allOper:"C010",//查询所有操作员

    validYear:"TS010",//有效时长
    levName:"C008",//联想查询团购名称
    channelCode:"C009",//渠道查询数据字典
    entranceType:"TS012",//进入方式
    departType:"C011"//部门列表
  },
  //证件类型：01-居民身份证、02-香港护照/来往内地通行证、03-澳门护照/来往内地通行证、04-台湾居民来往大陆通行证、05-外国人永久居留证、06-外国人护照、07-港澳台居民居住证、08-其他
  IDTYPE:{"01":"居民身份证","02":"香港护照/来往内地通行证","03":"澳门护照/来往内地通行证","04":"台湾居民来往大陆通行证","05":"外国人永久居留证","06":"外国人护照","07":"港澳台居民居住证","08":"其他"},
  CODE:{
    suc:"0000"
  },
  BUSITYPE:{//业务类型
    open:"0001",//开通续费
  },
  MENU:{
    ownmenu:'01'//所属菜单
  },
  AUTHBTN:{
    oper:"m030301"
  },
  TASKTMP:"/template/TempleGroup.xlsx",//团购任务模板下载
  SOCKET:"ws://localhost:22225",
  LOCAL:"/api",
  //SYS:env==="development"?"http://192.168.23.213:9001/templegm":"http://12345.12345.com:9002/templegm"
}
