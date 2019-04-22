import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import todo from './mobx';
import DevTools from "mobx-react-devtools";

const store = {
  todo
}
ReactDOM.render((
  <div>
    <DevTools />
    <App {...store} />
  </div>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
