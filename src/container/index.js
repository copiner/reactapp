import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect} from 'react-router-dom';
import { Layout, message } from 'antd';

// import "../util/proto";  //引入日期原型
// import "../util/corejs";  //corejs3 demo

import * as lAct from '../actions/login';

import App from './app';
import Login from '../component/login';
import Correct from '../component/login/correct';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    }
  }


  render() {

    let { status, correct, info, menu } = this.props.login;//state
    let { lAct } = this.props;//action

    return (
      <>
        {
          status ? <App menu={menu} info={info} lAct={lAct}/> : (correct ?  <Correct cort={lAct.correctSt} /> : <Login {...this.props}/>)
        }
      </>
    )
  }

}


const mapStateToProps  = (state) => ({
  login: state.login
});

const mapDispatchToProps = (dispatch) => ({
  lAct: bindActionCreators(lAct, dispatch),

    // loginSt: (lay) => dispatch(loginSt(lay)),
    // logoutSt: (lay) => dispatch(logoutSt(lay)),
    // correctSt: (lay) => dispatch(correctSt(lay)),
    // correctMid: (lay) => dispatch(correctMid(lay))
});

export default connect(mapStateToProps,mapDispatchToProps)(Index);

/*
// //将store.dispatch方法挂载到props上
 const mapDispatchToProps =(dispatch)=> {
   return {
     onPickerChange (date, dateString) {
         let obj={
           beginDate: dateString[0],
           endDate: dateString[1],
         }
         axios
         .post("safemgmt/api/queryDeviceInfos",
         {
           deviceType:"MOBILE",
           ...obj
         },
          .then(res=>{
           if(res.data.code==="0"){
             const data = res.data.result.list
             const action = {
               type: 'get_params',
               tableListdata: data
             }
             dispatch(action)
           }
         })

     }
   }
 }
*/
