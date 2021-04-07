import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { withRouter } from "react-router";

import Side from '../component/layout/side';
import Head from '../component/layout/head';
import Main from '../component/layout/main';
import { CloseConnect } from "../component/common/socket"

import { routesList, routeEnum } from '../routes/index';

import Session from '../util/session'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      tags:[],
    }
  }

  dealTags = (tag) =>{ //标签

    // const t = () =>{
    //   if (this.state.tags.includes(tag)) {
    //     return state;
    //   } else {
    //     return {
    //       ...state,
    //       tags: [...this.state.tags, tag],
    //     };
    //   }
    // }

    if (!this.state.tags.includes(tag)) {
      this.setState({
        tags: [...this.state.tags, tag]
      });
    }

  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  dealapp = () => {
    Session.setItem("openId", this.props.info.openId);
    Session.setItem("info",  this.props.info);

    //加载菜单
    this.props.lAct.menuSt();
  }

  dealmenu = (data,arr)=>{

    let looped = (data) => {
     data.forEach(function (item,index) {

       if(arr && arr.includes(item.id)){
         item.status = true;
       }
       if(item.routes){
         looped(item.routes);
       }

     })
    }

    looped(data)
  }

  render() {

    let { lAct, info, menu } = this.props, arr = [],leaf=[];
    if(menu.length > 0){
      for(let i=0; i<menu.length; i++){
        let t = menu[i].resId;
        arr.push(t);
        if(t.substring(t.length-4) !== "0000"){
          leaf.push(t);
        }
      }
    }
    //arr = ["m000000", "m010000", "m010100", "m010200", "m010300", "m010400", "m010500", "m020000", "m020100", "m020200", "m030000", "m030100", "m030200", "m030300", "m030400", "m030500", "m040000", "m040100", "m040200"];
    //console.log(leaf)
    if(arr.length > 0){
      this.dealmenu(routesList,arr)
    }
    //console.log(arr)
    //console.log(routesList)

    const marr = Object.keys(routeEnum);
    let hkey = marr.find( (i)=> routeEnum[i] == this.props.location.pathname );

    //console.log(this.props.location.pathname)

    return (
      <>
        <Layout>
         <Side collapsed={this.state.collapsed} hkey={hkey} leaf={leaf} routesList={ routesList } />
         <Layout>
           <Head collapsed={this.state.collapsed} toggle={this.toggle} tag={this.state.tags} dealTags={this.dealTags} info={info}  lAct={lAct}/>
           <Main routesList={ routesList } />
         </Layout>
        </Layout>
      </>
    )
  }


  componentDidMount(){
    this.dealapp()
  }

   componentWillUnmount(){
     //CloseConnect()
   }


}


//export default connect()(App);
export default withRouter(App);
