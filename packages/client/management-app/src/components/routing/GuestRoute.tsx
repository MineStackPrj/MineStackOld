import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../utils/ReactHooksOrigin';

export default function GuestRoute(props: any): JSX.Element {
  const isAuth = useSelector(state => state.auth.user.isAuth);

  return isAuth ? <Redirect to="/dashboard" /> : <Route {...props} />;
}
