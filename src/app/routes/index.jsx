import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../login';
import LandingPage from '../landing-page';
import ProtectedRoute from "./protected-route";


function Routes () {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/:view?" component={LandingPage} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;