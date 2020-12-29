import React from 'react';
import { Route } from 'react-router-dom';

export default function PublicRoute(props: any): JSX.Element {
  return <Route {...props} />;
}
