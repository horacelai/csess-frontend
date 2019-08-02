import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { HashRouter } from 'react-router-dom';

import ReduxThunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

/*
let socket = io('//'+ window.location.hostname + ':8080',{
    secure: true,
    query: {
        sessionId: localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
    }
});
*/

let socket = io('//'+ '172.104.84.210' + ':8080',{
    secure: true,
    query: {
        sessionId: localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
    }
});

let socketIoMiddleware = createSocketIoMiddleware(socket, "IO:");

const persistedState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {}

const middleware = applyMiddleware(ReduxThunk, socketIoMiddleware);
const store = createStore(reducers, persistedState, compose(middleware));

store.subscribe(()=>{
  localStorage.setItem('state', JSON.stringify(store.getState()));
  localStorage.setItem('sessionId', store.getState().login.sessionId);
})

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
