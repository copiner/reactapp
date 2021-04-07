import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import la from './index.css'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { routesList, own, gpy, gpyDom } = this.props;

    //console.log(this.props)

    return (
      <Layout.Content className={la.layoutContent}>
       <Switch>
         {
           routesList.map((item, i) => {

               return item.routes.length > 0 ? (
                   item.routes.map((route,index)=>{
                     return (
                         route.status?(<Route
                           key={route.id}
                           path={route.path}
                           exact={route.exact}
                           render={props => (
                             <route.component {...props} routes={route.routes} />
                           )}
                         />):""
                       )

                   })
                 ) : ''

             })
           }
       </Switch>
      </Layout.Content>
    );
  }
}


export default Main;
