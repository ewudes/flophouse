import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {reducer} from './store/reducer';
import {createApi} from './services/api';
import {ActionCreator} from './store/action';
import {AuthorizationStatus} from './const';
import thunk from 'redux-thunk';
import {checkAuth} from './store/api-actions';

const api = createApi(
    () => store.dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);
const Settings = {
  USER_NAME: `Oliver.conner@gmail.com`
};

const {USER_NAME: userName} = Settings;


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App userName={userName}/>
    </Provider>,
    document.querySelector(`#root`)
);
