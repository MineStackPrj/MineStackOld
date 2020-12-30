import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useSelector } from '@utils/ReactHooksOrigin';

export default function PrivateRoute(props: any): JSX.Element {
  const isAuth = useSelector(state => state.auth.user.isAuth);

  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}
