import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect} from 'react-router-dom';
import { Layout, message } from 'antd';

import "../util/proto";  //引入日期原型

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
  lAct: bindActionCreators(lAct, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Index);
