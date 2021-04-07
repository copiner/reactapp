//高阶组件，权限控制
import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import Util from '../util';
//登陆或者权限校验控制实现方法...


const fakeAuth = {
  isAuthenticated: true
};

const PrivateRoute = ({ component: Component, routes, ...rest }) => (

  <Route {...rest} render = {props => {

    return fakeAuth.isAuthenticated ? (
              <Component routes={routes} {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  // state: { from: props.location }
                }}
              />
            )
  }} />
);

export default PrivateRoute;
