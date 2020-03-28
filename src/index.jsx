import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'rsuite/dist/styles/rsuite-default.css'

import Login from './app/login';
import LandingPage from './app/landing-page';
import ProtectedRoute from "./app/protected-route";
import store from './store';

function App () {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path="/flux-control-client/login" component={Login} />
            <ProtectedRoute exact path="/flux-control-client/" component={LandingPage} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </div>
      </Provider>
    );
  }

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
