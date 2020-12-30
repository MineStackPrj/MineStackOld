import './App.scss';

// CSS
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import ResponsiveDrawer from '@components/Drawer';
import GuestRoute from '@components/routing/GuestRoute';
import PrivateRoute from '@components/routing/PrivateRoute';
import RoutingURIDefine from '@define/RoutingUri';
import CreateServer from '@pages/CreateServer';
import Login from '@pages/Login';

// React関連
// コンテンツ
// Route関連

const Dashboard = (): JSX.Element => {
  return <h2>This page is Dashboard</h2>;
};

export default class App extends Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <Switch>
          <GuestRoute path="/login" component={Login} />
          <ResponsiveDrawer>
            <Switch>
              <PrivateRoute path={`/${RoutingURIDefine.createServer}`} component={CreateServer} />
              <PrivateRoute path={`/${RoutingURIDefine.dashboard}`} component={Dashboard} />
            </Switch>
          </ResponsiveDrawer>
        </Switch>
      </div>
    );
  }
}
