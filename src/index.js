import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import rootReducer from './store/root-reducer';
import { createApi } from './services/api';
import { requiredAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { checkAuth } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';
import { configureStore } from '@reduxjs/toolkit';

async function start() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }

  const api = createApi(
    () => store.dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH))
  );

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api
        },
      }).concat(redirect)
  });

  store.dispatch(checkAuth()).finally(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector('#root')
    );
  });
}

start();
