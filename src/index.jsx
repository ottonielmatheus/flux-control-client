import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import 'rsuite/dist/styles/rsuite-default.css'

import store from './store';
import Routes from './app/routes';


function App () {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    );
  }

ReactDOM.render(<App />, document.getElementById('root'));