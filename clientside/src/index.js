import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import{createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {reducers} from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

window.React2 = React;
console.log(window.React1 === window.React2);
console.log(window.React1)

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root')
);

