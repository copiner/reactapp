import React, { Component } from 'react';

import { Layout, Menu, Dropdown } from 'antd';

import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';

import la from './index.css'

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleMenuClick = e => {
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  linOut = e => {
    this.props.lAct.logoutSt()
  };

  correctOut = e => {
    //this.props.lAct.logoutSt()
    this.props.lAct.correctMid()
  };

  render() {

    let { toggle, collapsed } = this.props;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1" onClick={this.correctOut}>修改密码</Menu.Item>
        <Menu.Item key="2" onClick={this.linOut} >退出</Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header className={la.headerBg}>
         <span className={la.trigger} onClick={toggle}>
            { collapsed ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/> }
         </span>
         <Dropdown
           overlay={menu}
           onVisibleChange={this.handleVisibleChange}
           visible={this.state.visible}
           className={la.drop}
           arrow={true}
         >
           <a onClick={e => e.preventDefault()}>
             <UserOutlined />{this.props.info.name}<DownOutlined />
           </a>
       </Dropdown>
      </Layout.Header>
    );
  }
}

export default Head;
