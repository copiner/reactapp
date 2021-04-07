import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import CNF from '../../config'
import la from './index.css'

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:""
    }
  }

  handleMenuSelect = e =>{
    //TODO TAG
    let { url, title } = e.item.props
    //console.log(url, title)
    //this.props.history.go(url);
  }

  handleClick = e => {

    this.setState({
      current: e.key,
    });

  };

  render() {
    let { routesList, collapsed, leaf, hkey } = this.props;

    return (
      <>
        {
          leaf.length?
            (
              <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
               <div className={la.logo} >
                 {collapsed ? `${CNF.SITELOGO}`:`${CNF.SITENAME}`}
               </div>
               <Menu theme="dark" mode="inline"
                      defaultOpenKeys={['0','1','2','3']}
                      defaultSelectedKeys={hkey || this.state.current}
                      onSelect={this.handleMenuSelect}
                      onClick={this.handleClick} >
                  {
                     routesList.map((item, i) => {
                         return item.routes.length > 0 ? (
                             <Menu.SubMenu key={i} icon={item.icon} title={<span>{item.title}</span>}>
                               {
                                 item.routes.map((link,idx)=>{
                                   return link.status?(
                                     <Menu.Item key={ link.id } url={link.path} title={link.title}><Link to={link.path}>{link.title}</Link></Menu.Item>
                                   ):""
                                 })
                               }
                             </Menu.SubMenu>
                           ) : ""
                       })
                   }
               </Menu>
              </Layout.Sider>
            ) :
            (
              <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
                  <div className={la.logo} >
                      {collapsed ? `${CNF.SITELOGO}`:`${CNF.SITENAME}`}
                  </div>
                  <div className={la.sideTips}>操作员无权限</div>
              </Layout.Sider>
          )
        }
      </>
    )


  }

  componentDidUpdate() {

  }

  componentDidMount(){

  }
}


export default Side;
