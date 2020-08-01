import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import { reducers } from './reducers';
import { rootSaga } from './reducers/root-saga';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [thunk, sagaMiddleware, logger];

const store = createStore(reducers, {}, applyMiddleware(...middlewares));

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
